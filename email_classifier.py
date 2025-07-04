from transformers import pipeline

# Carrega o pipeline de zero-shot classification (pode demorar um pouco na primeira vez)
classifier = pipeline("zero-shot-classification", model="facebook/bart-large-mnli")

def classificar_email(texto, idioma):
    """
    Classifica o email como 'Produtivo' ou 'Improdutivo', com base no texto.
    """
    # Labels em inglês (modelo foi treinado nisso, mas funciona para PT também)
    labels = ["Produtivo", "Improdutivo"] if idioma == "pt" else ["Productive", "Unproductive"]
    
    resultado = classifier(texto, labels)
    
    categoria = resultado['labels'][0]  # Categoria mais provável
    score = resultado['scores'][0]      # Confiança
    
    return categoria, score
