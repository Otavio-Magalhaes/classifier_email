import os
from huggingface_hub import InferenceClient
from dotenv import load_dotenv

load_dotenv()
client = InferenceClient(
    provider="novita",
    api_key=os.getenv("HF_TOKEN")
)
email = "Olá, gostaria de solicitar um orçamento para 5 produtos. Aguardo seu retorno."
completion = client.chat.completions.create(
    model="mistralai/Mistral-7B-Instruct-v0.3",
    messages=[
        {
            "role": "user",
            "content": f"Responda esse email em português: {email}"
        }
    ],
)

print(completion.choices[0].message)