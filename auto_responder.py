from transformers import AutoTokenizer, AutoModelForCausalLM
import torch
from huggingface_hub import login

# Token da Hugging Face (já está no seu código)
login(token="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")
model_name = 'mistralai/Mistral-7B-Instruct-v0.3'

def load_responder_model():
    """Carrega e retorna tokenizer e modelo (1 vez)"""
    tokenizer = AutoTokenizer.from_pretrained(model_name)
    model = AutoModelForCausalLM.from_pretrained(
        model_name,
        torch_dtype=torch.float16,
        device_map="auto",
        low_cpu_mem_usage=True,
        load_in_8bit=True,
    )
    return tokenizer, model

def gerar_resposta(texto_email, categoria, idioma, tokenizer, model):
    if categoria != 'Produtivo':
        return gerar_resposta_nao_produtiva(idioma)
    
    prompt =  f"""
            Gere uma resposta curta, profissional em {'português' if idioma == 'pt' else 'inglês'} para o e-mail abaixo.
            Não inclua o texto original, apenas a resposta.
            
            E-mail: {texto_email}
            
            Resposta: 
          """
    
    # Configurações de geração para economizar memória
    inputs = tokenizer(prompt, return_tensors="pt").to("cuda")
    
    with torch.no_grad():
        outputs = model.generate(
            **inputs,
            max_new_tokens=150,  # Limita o tamanho da resposta
            do_sample=True,
            temperature=0.7,
            top_k=50,
            top_p=0.95,
            early_stopping=True
        )
    
    # Decodifica e limpa a resposta
    resposta = tokenizer.decode(outputs[0])
    resposta = resposta.split("Resposta:")[-1].strip()
   
    return resposta if resposta else "Agradecemos seu contato. Entraremos em breve."

def gerar_resposta_nao_produtiva(idioma):
    return (
        "Olá! Este canal é para assuntos comerciais. Para outras questões, visite nosso site." 
        if idioma == 'pt' else 
        "Hello! This channel is for business inquiries only. Please visit our website."
    )