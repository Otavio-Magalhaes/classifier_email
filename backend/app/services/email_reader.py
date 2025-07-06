import pdfplumber
import os
import io

def ler_email(input_file=None, texto_manual=None):
    """
    Lê o conteúdo de um email a partir de um arquivo (em bytes) ou de um texto inserido diretamente.
    """
    if texto_manual:
        return texto_manual.strip()
    
    if not input_file:
        raise ValueError("Você deve fornecer input_file ou texto_manual.")
    
    filename, file_bytes = input_file
    _, ext = os.path.splitext(filename)
    
    if ext.lower() == '.txt':
        return file_bytes.decode("utf-8").strip()
    
    elif ext.lower() == '.pdf':
        with pdfplumber.open(io.BytesIO(file_bytes)) as pdf:
            text = ''
        for page in pdf.pages:
            text += page.extract_text()
        return text.strip()
    
    else:
        raise ValueError("Formato de arquivo não suportado. Use .txt, .pdf ou texto direto.")

