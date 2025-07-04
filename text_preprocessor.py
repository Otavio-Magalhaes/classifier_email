import spacy
from langdetect import detect

# Carrega modelos do spaCy para português e inglês
MODELOS = {
    'pt': spacy.load('pt_core_news_sm'),
    'en': spacy.load('en_core_web_sm')
}

def detectar_idioma(texto):
    """Detecta o idioma do texto (português ou inglês)."""
    try:
        idioma = detect(texto)
        if idioma in MODELOS:
            return idioma
        else:
            raise ValueError(f"Idioma não suportado: {idioma}")
    except Exception:
        raise ValueError("Não foi possível detectar o idioma do email.")

def preprocessar_texto(texto):
    """Pré-processa o texto removendo stopwords e aplicando lematização."""
    idioma = detectar_idioma(texto)
    nlp = MODELOS[idioma]

    doc = nlp(texto)

    tokens_processados = [
        token.lemma_.lower()
        for token in doc
        if not token.is_stop and not token.is_punct
    ]

    texto_processado = ' '.join(tokens_processados)
    return texto_processado, idioma
