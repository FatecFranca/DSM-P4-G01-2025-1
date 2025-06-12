from src.config import (
    MONGO_CONNECTION_STRING, MONGO_DB_NAME, MONGO_COLLECTION_NAME, FRANCA_LATITUDE, FRANCA_LONGITUDE
)
from src.services.open_meteo_client import OpenMeteoClient
from src.database.mongo_handler import MongoHandler
from src.processing.data_transformer import transform_daily_data

def run_weather_etl():
    """
    Executa o processo completo de ETL:
    1. Extrai dados da API de clima.
    2. Transforma os dados em uma tabela limpa.
    3. Carrega (sobrescrevendo) os dados no MongoDB.
    """
    print("--- Iniciando processo de ETL de dados climáticos ---")
    
    # 1. Extração (Extract)
    meteo_client = OpenMeteoClient(latitude=FRANCA_LATITUDE, longitude=FRANCA_LONGITUDE)
    weather_data = meteo_client.get_daily_forecast()

    if not weather_data:
        print("Processo interrompido: não foi possível obter dados da API.")
        return

    # 2. Transformação (Transform)
    weather_df = transform_daily_data(weather_data)

    if weather_df is None or weather_df.empty:
        print("Processo interrompido: falha na transformação dos dados.")
        return

    # 3. Carregamento (Load)
    try:
        with MongoHandler(MONGO_CONNECTION_STRING, MONGO_DB_NAME) as mongo:
            mongo.overwrite_collection(MONGO_COLLECTION_NAME, weather_df)
    except Exception as e:
        print(f"Processo interrompido: falha ao carregar dados no MongoDB. Erro: {e}")
        return
        
    print("\n--- Processo de ETL concluído com sucesso! ---")


if __name__ == "__main__":
    run_weather_etl()