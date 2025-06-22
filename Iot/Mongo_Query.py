from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
from pymongo import DESCENDING

# Conecte ao MongoDB Atlas
uri = "mongodb+srv://PI-user-admin:samuelgostoso123@cluster0.dzi1v.mongodb.net/iot"

try:
    client = MongoClient(uri, server_api=ServerApi('1'))
    client.admin.command('ping')
    print("Conexão bem-sucedida com o MongoDB Atlas!")
    
    db = client['arduino']
    collection = db['medidas']
except Exception as e:
    print(f"Erro ao conectar ao MongoDB: {e}")
    collection = None  # Define como None se a conexão falhar

# Função para listar o último registro
def consulta_ultimo_registro():
    if collection is not None:
        registro = collection.find_one(sort=[("_id", DESCENDING)])
        if registro:
            print("Último registro:")
            print(registro)
        else:
            print("Nenhum registro encontrado.")
    else:
        print("Erro: Conexão com a coleção não estabelecida.")

# Função para listar os últimos 2 registros
def consulta_2_ultimos_registros():
    if collection is not None:
        registros = collection.find().sort("_id", DESCENDING).limit(2)
        print("Últimos 2 registros:")
        for registro in registros:
            print(registro)
    else:
        print("Erro: Conexão com a coleção não estabelecida.")

# Função para listar todos os registros de 4 em 4 com pausa
def listar_todos_registros():
    pagina = 1
    while True:
        registros = listar_registros_paginados(pagina)
        if not registros:
            print("Fim dos registros.")
            break
        
        for registro in registros:
            print(registro)
        
        cont = input("<Enter> para continuar, 'q' para sair: ")
        if cont.lower() == 'q':
            break
        pagina += 1

# Função para listar registros paginados
def listar_registros_paginados(page_number):
    registros_por_pagina = 4
    skip = (page_number - 1) * registros_por_pagina

    try:
        if collection is not None:
            registros = collection.find().sort("_id", DESCENDING).skip(skip).limit(registros_por_pagina)
            return list(registros)
        else:
            print("Erro: Coleção não está disponível.")
            return []
    except Exception as e:
        print(f"Erro ao buscar registros: {e}")
        return []

# Menu de opções
def menu():
    while True:
        print("\nMenu:")
        print("1. Consulta último registro")
        print("2. Consulta 2 últimos registros")
        print("3. Consulta todos os registros (de 4 em 4)")
        print("4. Sair")
        escolha = input("Escolha uma opção: ")

        if escolha == '1':
            consulta_ultimo_registro()
        elif escolha == '2':
            consulta_2_ultimos_registros()
        elif escolha == '3':
            listar_todos_registros()
        elif escolha == '4':
            print("Saindo...")
            break
        else:
            print("Opção inválida. Tente novamente.")

# Iniciar o menu
if __name__ == "__main__":
    menu()
