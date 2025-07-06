# E-mail Classifier & Auto Responder

## Descrição do Projeto
Este projeto é uma aplicação web full-stack que permite aos usuários enviar e-mails (texto ou arquivo), classificá-los automaticamente como produtivos ou improdutivos e gerar respostas profissionais e personalizadas utilizando Inteligência Artificial.

O frontend é uma SPA (Single Page Application) em React com TypeScript, enquanto o backend é uma API RESTful construída com Python e FastAPI, integrando modelos de NLP e LLM via Hugging Face.

## Funcionalidades
Envio de e-mails: Usuário pode enviar e-mails digitando texto ou enviando arquivo.

Classificação automática: O backend processa o texto para classificar o e-mail como produtivo ou improdutivo, com base em modelo de zero-shot classification.

Geração de resposta inteligente: Para e-mails produtivos, uma resposta profissional é gerada usando um modelo LLM (Mistral-7B-Instruct) via Hugging Face.

Interface de chat: Usuário interage via interface estilo chat, com múltiplos chats simultâneos, renomeação e deleção de chats.

Persistência local: Chats e mensagens são salvos no localStorage para preservar histórico após recarregamento.

Upload de arquivos: Permite anexar arquivos que são processados junto com o texto do e-mail.

UX aprimorada: Campo de input com ajuste dinâmico de altura, suporte a múltiplas linhas, teclas Enter e Shift+Enter, preview de arquivo, e opções no sidebar para renomear e deletar chats.

Backend robusto: Estrutura organizada em módulos para leitura, pré-processamento, classificação e geração de resposta, com tratamento de CORS e validação de dados.

## Tecnologias Utilizadas

### Frontend
- React 18 + TypeScript
- react-hook-form para gerenciamento de formulários
- TailwindCSS para estilização responsiva
- React Icons para ícones
- LocalStorage para persistência local

### Backend
- Python 3.10+
- FastAPI para criação da API
- Uvicorn para servidor ASGI
- Transformers (Hugging Face) para classificação zero-shot e geração de texto com modelos LLM
- Modularização do código para separação clara de responsabilidades
- CORS configurado para comunicação segura com frontend