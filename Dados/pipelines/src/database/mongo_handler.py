from pymongo import MongoClient
from pymongo.errors import ConnectionFailure, OperationFailure
import pandas as pd
from typing import Dict, Any, List


class MongoHandler:
    """Gerenciador de conexão e operações com MongoDB."""
    def __init__(self, connection_string, db_name):
        self._connection_string = connection_string
        self._db_name = db_name
        self.client = None
        self.db = None

    def __enter__(self):
        """Método para entrar no contexto 'with', estabelecendo a conexão."""
        try:
            self.client = MongoClient(self._connection_string)
            self.db = self.client[self._db_name]
            print("Conexão com MongoDB estabelecida com sucesso!")
            return self
        except ConnectionFailure as e:
            print(f"Erro de conexão com o MongoDB: {e}")
            raise

    def __exit__(self, exc_type, exc_val, exc_tb):
        """Método para sair do contexto 'with', garantindo o fechamento da conexão."""
        if self.client:
            self.client.close()
            print("Conexão com MongoDB fechada.")

    def overwrite_collection(self, collection_name: str, df: pd.DataFrame):
        """Apaga todos os dados de uma coleção e insere os novos de um DataFrame."""
        if df is None or df.empty:
            print("DataFrame vazio. Nenhuma operação será realizada no MongoDB.")
            return

        try:
            collection = self.db[collection_name]
            
            delete_result = collection.delete_many({})
            print(f"{delete_result.deleted_count} documentos antigos removidos da coleção '{collection_name}'.")

            records = df.to_dict('records')
            insert_result = collection.insert_many(records)
            print(f"{len(insert_result.inserted_ids)} novos documentos inseridos com sucesso!")

        except OperationFailure as e:
            print(f"Erro de operação no MongoDB: {e}")
            raise
        
    def find_all(self, collection_name: str, query: Dict[str, Any] = None) -> pd.DataFrame:
        """
        Executa uma query em uma coleção e retorna todos os documentos encontrados.

        Args:
            collection_name (str): O nome da coleção para consultar.
            query (dict, optional): O filtro da query do MongoDB. 
                                    Se for None ou omitido, retorna todos os documentos. 
                                    Defaults to None.

        Returns:
            list[dict]: Uma lista de documentos encontrados. Retorna uma lista vazia se nada for encontrado.
        """
        if query is None:
            query = {}  # Um dicionário vazio em find() retorna todos os documentos

        try:
            collection = self.db[collection_name]
            documents = list(collection.find(query))
            print(f"Encontrados {len(documents)} documentos na coleção '{collection_name}' com a query: {query}")
            
            if documents:
                df = pd.DataFrame(documents)
                return df
            else:
                print("Nenhum documento encontrado para a query.")
    
        except OperationFailure as e:
            print(f"Erro ao executar a query no MongoDB: {e}")
            raise
        return []
