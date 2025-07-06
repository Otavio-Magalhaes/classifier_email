export async function processarEmail(message: string, file?: File) {
  try {
    const formData = new FormData();
    formData.append("email", message);
    if (file) {
      formData.append("arquivo", file);
    }

    const response = await fetch('http://127.0.0.1:8000/api/v1/processar-email', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Erro ao processar o email');
    }
    const result = await response.json();
    console.log("Resposta da API:", result);
    return result;
  } catch (err) {
    console.error("Falha na requisição:", err);
  }
}

