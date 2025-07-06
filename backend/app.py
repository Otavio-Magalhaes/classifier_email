from fastapi import FastAPI, UploadFile, File, Form, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from email_reader import ler_email
from text_preprocessor import preprocessar_texto
from auto_responder import gerar_resposta
from transformers import pipeline

classifier = pipeline("zero-shot-classification", model="facebook/bart-large-mnli")

app = FastAPI()


app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.post("/processar-email")
async def processar_email(
    email: str = Form(None),
    arquivo: UploadFile = File(None)
):
    try:
        if arquivo:
            conteudo = await arquivo.read()
            texto_email = ler_email(input_file=(arquivo.filename, conteudo))
        elif email:
            texto_email = ler_email(texto_manual=email)
        else:
            raise HTTPException(status_code=400, detail="Envie um arquivo ou texto.")

        # Aqui segue seu processamento:
        texto_processado, idioma = preprocessar_texto(texto_email)
        labels = ["Produtivo", "Improdutivo"] if idioma == "pt" else ["Productive", "Unproductive"]
        resultado = classifier(texto_processado, labels)
        categoria = resultado['labels'][0]
        score = resultado['scores'][0]
        resposta = gerar_resposta(texto_email, categoria, idioma)
        print(f'Gerou resposata: {resposta}')
        return {
            "idioma": idioma,
            "classificacao": categoria,
            "score": round(score, 2),
            "resposta": resposta
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
