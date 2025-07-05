export async function processarEmail(email: string, file?: File) {
  try {
    const formData = new FormData();
    formData.append("email", email);
    if (file) {
      formData.append("arquivo", file);
    }

    const response = await fetch('http://127.0.0.1:8000/processar-email', {
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

export async function buscarEmailsSalvos() {
  const response = await fetch('http://127.0.0.1:8000/emails');
  if (!response.ok) {
    throw new Error('Erro ao buscar emails salvos');
  }
  return await response.json();
}
