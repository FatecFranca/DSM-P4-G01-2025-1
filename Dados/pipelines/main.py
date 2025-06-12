import pandas as pd
from src.config import MONGO_CONNECTION_STRING, MONGO_DB_NAME, MONGO_COLLECTION_INPUT
from src.database.mongo_handler import MongoHandler
from src.processing.data_materialize import (
    calculate_descriptive_stats,
    calculate_weather_code_probabilities,
    forecast_temperature,
    calculate_correlation_matrix # Importa a nova função
)

def main():
    """
    Função principal para executar o pipeline de análise de dados climáticos.
    1. Carrega dados do MongoDB.
    2. Realiza análises (estatísticas, probabilidade, correlação, previsão).
    3. Salva todas as métricas calculadas em uma nova coleção no MongoDB.
    """
    print("--- Iniciando pipeline de análise de dados climáticos ---")
    
    # Define o nome da coleção de destino para as métricas
    METRICS_COLLECTION_NAME = "climate_metrics"

    try:
        # 1. CARREGAR DADOS DE ENTRADA
        with MongoHandler(MONGO_CONNECTION_STRING, MONGO_DB_NAME) as mongo:
            df_original = mongo.find_all(MONGO_COLLECTION_INPUT)
        
        if df_original.empty:
            print(f"❌ Processo interrompido: Nenhum dado encontrado na coleção de origem '{MONGO_COLLECTION_INPUT}'.")
            return

        # Garante que a coluna 'dia' seja do tipo datetime
        df_original['dia'] = pd.to_datetime(df_original['dia'])

        # 2. REALIZAR ANÁLISES
        stats_df = calculate_descriptive_stats(df_original.copy())
        correlation_df = calculate_correlation_matrix(df_original.copy())
        probs_df = calculate_weather_code_probabilities(df_original.copy())
        forecast_df = forecast_temperature(df_original.copy(), days_to_predict=7)
        
        # 3. ESTRUTURAR E SALVAR MÉTRICAS NO MONGODB
        # Cria uma lista de dicionários, onde cada um representa um tipo de métrica.
        # Esses serão inseridos como documentos separados na coleção de métricas.
        metrics_to_store = [
            {
                "metric_type": "descriptive_statistics",
                "data": stats_df.to_dict('records')
            },
            {
                "metric_type": "correlation_matrix",
                "data": correlation_df.to_dict('records')
            },
            {
                "metric_type": "weather_code_probability",
                "data": probs_df.to_dict('records')
            },
            {
                "metric_type": "temperature_forecast",
                "data": forecast_df.to_dict('records')
            }
        ]
        
        # Converte a lista de métricas para um DataFrame para usar o método de inserção.
        # Cada item na lista se tornará um documento na coleção.
        final_df_to_mongo = pd.DataFrame(metrics_to_store)

        # Carrega os dados processados no MongoDB, sobrescrevendo a coleção de métricas
        with MongoHandler(MONGO_CONNECTION_STRING, MONGO_DB_NAME) as mongo:
            mongo.overwrite_collection(METRICS_COLLECTION_NAME, final_df_to_mongo)
            
        print(f"\n✅ Pipeline concluído! Métricas salvas na coleção '{METRICS_COLLECTION_NAME}'.")

    except Exception as e:
        print(f"❌ Ocorreu um erro fatal durante a execução do pipeline: {e}")

if __name__ == "__main__":
    main()