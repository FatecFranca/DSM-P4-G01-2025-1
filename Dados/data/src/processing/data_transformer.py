import pandas as pd
from typing import Dict, Any

def transform_daily_data(api_data: Dict[str, Any]) -> pd.DataFrame | None:
    """Transforma a resposta JSON da API em um DataFrame Pandas limpo."""
    if not api_data or 'daily' not in api_data:
        print("Dados da API inválidos ou não contêm a chave 'daily'.")
        return None
    
    print("Montando e transformando a tabela de dados...")
    df = pd.DataFrame(api_data['daily'])

    df.rename(columns={
        'time': 'dia',
        'weathercode': 'codigo_clima',
        'temperature_2m_max': 'temperatura_max_c',
        'temperature_2m_min': 'temperatura_min_c',
        'relative_humidity_2m_mean': 'umidade_media_percent',
        'uv_index_max': 'indice_uv_max'
    }, inplace=True)
    
    df['dia'] = pd.to_datetime(df['dia'])
    df.dropna(how='all', subset=df.columns[1:], inplace=True)

    print(f"Tabela montada com {len(df)} registros.")
    return df