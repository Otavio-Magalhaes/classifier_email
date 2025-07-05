from transformers import pipeline


# Carrega o pipeline de zero-shot classification (pode demorar um pouco na primeira vez)
classifier = pipeline("zero-shot-classification", model="facebook/bart-large-mnli")

def classificar_email(texto, idioma):

    classifier = pipeline("zero-shot-classification", model="facebook/xlm-roberta-large-xnli")
    print(classifier)
    labels = ["Produtivo", "Improdutivo"] if idioma == "pt" else ["Productive", "Unproductive"]
    
    resultado = classifier(texto, labels)
    print(resultado)
    categoria = resultado['labels'][0]  # Categoria mais provável
    score = resultado['scores'][0]      # Confiança
    
    return categoria, score
