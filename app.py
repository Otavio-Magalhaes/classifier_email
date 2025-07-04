from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from email_reader import ler_email
from text_preprocessor import preprocessar_texto
from email_classifier import classificar_email
from auto_responder import load_responder_model, gerar_resposta
from transformers import pipeline

# Carrega os modelos apenas 1 vez (startup)
classifier = pipeline("zero-shot-classification", model="facebook/bart-large-mnli")
tokenizer, model = load_responder_model()

app = FastAPI()

class EmailRequest(BaseModel):
    email: str

@app.post("/processar-email")
def processar_email(request: EmailRequest):
    try:
        texto_email = ler_email(texto_manual=request.email)
        texto_processado, idioma = preprocessar_texto(texto_email)
        
        labels = ["Produtivo", "Improdutivo"] if idioma == "pt" else ["Productive", "Unproductive"]
        resultado = classifier(texto_processado, labels)
        categoria = resultado['labels'][0]
        score = resultado['scores'][0]
        
        resposta = gerar_resposta(
            texto_email, categoria, idioma, tokenizer, model
        )
        
        return {
            "idioma": idioma,
            "classificacao": categoria,
            "score": round(score, 2),
            "resposta": resposta
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))