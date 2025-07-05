import os
from huggingface_hub import InferenceClient

def gerar_resposta(texto_email, categoria, idioma):
    if categoria != 'Produtivo':
       return gerar_resposta_nao_produtiva(idioma)

    client = InferenceClient(
        provider="novita",
        api_key=os.getenv("HF_TOKEN")
    )
    prompt =  f"""
            Gere uma resposta curta, profissional em {'português' if idioma == 'pt' else 'inglês'} para o e-mail abaixo.
            Não inclua o texto original, apenas a resposta.
            
            E-mail: {texto_email}
            
            Resposta: 
        """
    completion = client.chat.completions.create(
        model="mistralai/Mistral-7B-Instruct-v0.3",
        messages=[
            {
                "role": "user",
                "content": f"{prompt}"
            }
        ],
    )
    resposta = completion.choices[0].message



    return resposta if resposta else "Agradecemos seu contato. Entraremos em breve."

def gerar_resposta_nao_produtiva(idioma):
    return (
        "Olá! Este canal é para assuntos comerciais. Para outras questões, visite nosso site." 
        if idioma == 'pt' else 
        "Hello! This channel is for business inquiries only. Please visit our website."
    )