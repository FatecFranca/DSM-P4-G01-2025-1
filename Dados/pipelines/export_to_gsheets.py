import os
import gspread
import pandas as pd
from dotenv import load_dotenv
from pymongo import MongoClient
from gspread_dataframe import set_with_dataframe

from src.config import (
    MONGO_CONNECTION_STRING,
    MONGO_DB_NAME,
    MONGO_COLLECTION_NAME,
    GOOGLE_SHEET_NAME,
    GOOGLE_CREDENTIALS_PATH
)

METRICS_COLLECTION_NAME = MONGO_COLLECTION_NAME

def fetch_metrics_from_mongo() -> dict[str, pd.DataFrame]:
    """Busca as métricas da coleção no MongoDB e as converte em DataFrames."""
    print(f"Buscando dados da coleção '{METRICS_COLLECTION_NAME}' no MongoDB...")
    
    client = MongoClient(MONGO_CONNECTION_STRING)
    db = client[MONGO_DB_NAME]
    collection = db[METRICS_COLLECTION_NAME]
    
    # Busca todos os documentos (cada um representa um tipo de métrica)
    documents = list(collection.find({}))
    client.close()
    
    if not documents:
        print("Nenhum documento encontrado na coleção.")
        return {}
        
    # Converte cada documento em um DataFrame e armazena em um dicionário
    dataframes = {}
    for doc in documents:
        metric_type = doc.get("metric_type")
        data_list = doc.get("data")
        
        if metric_type and data_list:
            df = pd.DataFrame(data_list)
            # Remove a coluna _id se ela foi adicionada pelo MongoDB
            if '_id' in df.columns:
                df = df.drop(columns=['_id'])
            dataframes[metric_type] = df
            print(f"  - Métrica '{metric_type}' carregada com {len(df)} registros.")
            
    return dataframes


def update_google_sheet(dataframes: dict[str, pd.DataFrame]):
    """
    Autentica com a API do Google e atualiza uma planilha com os DataFrames.
    Cada DataFrame é salvo em uma aba separada.
    """
    if not dataframes:
        print("Nenhum dado para enviar ao Google Sheets.")
        return

    print("\nConectando ao Google Sheets...")
    try:
        # Autenticação usando o arquivo JSON da conta de serviço
        gc = gspread.service_account(filename=GOOGLE_CREDENTIALS_PATH)
        # Abre a planilha pelo nome
        spreadsheet = gc.open(GOOGLE_SHEET_NAME)
        print(f"Planilha '{GOOGLE_SHEET_NAME}' aberta com sucesso.")
    except FileNotFoundError:
        print(f"❌ ERRO: Arquivo de credenciais não encontrado em '{GOOGLE_CREDENTIALS_PATH}'.")
        print("Por favor, baixe o JSON da sua conta de serviço do Google Cloud e salve-o no local correto.")
        return
    except gspread.exceptions.SpreadsheetNotFound:
        print(f"❌ ERRO: Planilha '{GOOGLE_SHEET_NAME}' não encontrada.")
        print("Verifique se o nome está correto e se você a compartilhou com o email da conta de serviço.")
        return
    except Exception as e:
        print(f"❌ Ocorreu um erro inesperado ao conectar ao Google Sheets: {e}")
        return

    # Itera sobre cada DataFrame para atualizar/criar a aba correspondente
    for sheet_name, df in dataframes.items():
        try:
            # Tenta obter a aba. Se não existir, uma exceção é lançada.
            worksheet = spreadsheet.worksheet(sheet_name)
            print(f"  - Aba '{sheet_name}' encontrada. Limpando e atualizando dados...")
        except gspread.exceptions.WorksheetNotFound:
            # Se a aba não existe, ela é criada.
            print(f"  - Aba '{sheet_name}' não encontrada. Criando nova aba...")
            worksheet = spreadsheet.add_worksheet(title=sheet_name, rows="100", cols="20")
        
        # Limpa a aba e insere o DataFrame
        worksheet.clear()
        set_with_dataframe(worksheet, df)
        print(f"  - Dados inseridos com sucesso na aba '{sheet_name}'.")

def main():
    """Função principal para orquestrar o processo."""
    print("--- Iniciando processo de exportação de métricas para o Google Sheets ---")
    
    # Passo 1: Buscar dados do MongoDB
    metrics_dataframes = fetch_metrics_from_mongo()
    
    # Passo 2: Enviar os dados para o Google Sheets
    update_google_sheet(metrics_dataframes)
    
    print("\n✅ Processo de exportação concluído!")


if __name__ == "__main__":
    # Validação inicial das variáveis de ambiente
    if not all([MONGO_CONNECTION_STRING, MONGO_DB_NAME, GOOGLE_SHEET_NAME]):
        raise ValueError("Uma ou mais variáveis de ambiente (MONGO_CONNECTION_STRING, MONGO_DB_NAME, GOOGLE_SHEET_NAME) não foram definidas no arquivo .env")
    main()