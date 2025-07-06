from transformers import pipeline

def classificar_email(texto, idioma):
    classifier = pipeline("zero-shot-classification", model="facebook/bart-large-mnli")
    labels = ["Produtivo", "Improdutivo"] if idioma == "pt" else ["Productive", "Unproductive"]
    resultado = classifier(texto, labels)
    categoria = resultado['labels'][0]  # Categoria mais provável
    score = resultado['scores'][0]      # Confiança
    
    return categoria, score
