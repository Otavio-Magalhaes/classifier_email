import os
from PyPDF2 import PdfReader

def ler_email(input_path=None, texto_manual=None):
    """
    Lê o conteúdo de um email a partir de um arquivo .txt, .pdf ou de um texto inserido diretamente.
    """
    if texto_manual:
        return texto_manual.strip()
    
    if not input_path:
        raise ValueError("Você deve fornecer input_path ou texto_manual.")

    _, ext = os.path.splitext(input_path)

    if ext.lower() == '.txt':
        with open(input_path, 'r', encoding='utf-8') as file:
            return file.read().strip()
        
    elif ext.lower() == '.pdf':
        reader = PdfReader(input_path)
        text = ''
        for page in reader.pages:
            text += page.extract_text()
        return text.strip()
    
    else:
        raise ValueError("Formato de arquivo não suportado. Use .txt, .pdf ou texto direto.")
