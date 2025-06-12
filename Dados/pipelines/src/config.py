import os
from dotenv import load_dotenv

load_dotenv()

# --- Configuração do MongoDB ---
MONGO_CONNECTION_STRING = os.getenv("MONGO_CONNECTION_STRING")
MONGO_DB_NAME = os.getenv("MONGO_DB_NAME")
MONGO_COLLECTION_NAME = os.getenv("MONGO_COLLECTION_NAME")
MONGO_COLLECTION_INPUT = os.getenv("MONGO_COLLECTION_INPUT")  # Valor padrão se não estiver definido

GOOGLE_SHEET_NAME = os.getenv("GOOGLE_SHEET_NAME")
GOOGLE_CREDENTIALS_PATH = os.getenv("GOOGLE_CREDENTIALS_PATH")

# --- Configuração da API Open-Meteo ---
FRANCA_LATITUDE = -20.53
FRANCA_LONGITUDE = -47.40

# Verificação para garantir que as variáveis essenciais foram carregadas
if not MONGO_CONNECTION_STRING:
    raise ValueError("A variável de ambiente MONGO_CONNECTION_STRING não foi definida. Crie um arquivo .env.")