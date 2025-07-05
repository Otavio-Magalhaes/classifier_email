from email_reader import ler_email
from text_preprocessor import preprocessar_texto
from email_classifier import classificar_email
from auto_responder import gerar_resposta
from huggingface_hub import login
from dotenv import load_dotenv
import os
def main():
    try:
        texto_email = ler_email(input_path="documento.pdf")
        texto_processado, idioma = preprocessar_texto(texto_email)

        print(f"\nIdioma detectado: {idioma}")
        print(f"Texto original: {texto_email}")
        print(f"Texto pré-processado: {texto_processado}")

        categoria, score = classificar_email(texto_processado, idioma)
        print(f"\nClassificação: {categoria} (confiança: {score:.2f})")

        resposta = gerar_resposta(texto_email, categoria, idioma)
        print("\nResposta automática gerada:")
        print(resposta)


    except Exception as e:
        print("Erro:", e)

if __name__ == "__main__":
    main()
