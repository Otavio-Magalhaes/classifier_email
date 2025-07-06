from pydantic import BaseModel

class EmailResponse(BaseModel):
    idioma: str
    classificacao: str
    score: float
    resposta: str