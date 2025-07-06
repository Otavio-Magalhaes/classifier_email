from fastapi import APIRouter, UploadFile, File, Form, HTTPException
from app.services.auto_responder import gerar_resposta
from app.services.email_reader import ler_email
from app.services.email_classifier import classificar_email
from app.services.text_preprocessor import preprocessar_texto
from app.schemas.email import EmailResponse

router = APIRouter()

@router.post("/processar-email", response_model=EmailResponse)
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
        print("aceitou opost, e recebeu o email ou arquivo")
        # Aqui segue seu processamento:
        texto_processado, idioma = preprocessar_texto(texto_email)
        print("Processou o email")
        categoria, score = classificar_email(texto_processado, idioma)
        print("caregorizou o email")
        resposta = gerar_resposta(texto_email, categoria, idioma)
        return {
            "idioma": idioma,
            "classificacao": categoria,
            "score": round(score, 2),
            "resposta": resposta
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
        print(detail)
