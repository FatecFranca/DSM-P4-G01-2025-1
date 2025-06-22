import serial
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
import time

# Configurações do MongoDB Atlas
uri = "mongodb+srv://PI-user-admin:samuelgostoso123@cluster0.dzi1v.mongodb.net/iot"

try:
    client = MongoClient(uri, server_api=ServerApi('1'))
    client.admin.command('ping')
    print("Conexão bem-sucedida com o MongoDB Atlas!")
    db = client['arduino']
    collection = db['medidas']
except Exception as e:
    print(f"Erro ao conectar ao MongoDB: {e}")
    collection = None

# Configuração da porta serial (ajuste conforme necessário)
PORTA_SERIAL = 'COM6'
BAUDRATE = 9600

def gravar_dados_arduino():
    if collection is None:
        print("Não foi possível conectar ao MongoDB. Encerrando...")
        return
    try:
        with serial.Serial(PORTA_SERIAL, BAUDRATE, timeout=1) as ser:
            print(f"Lendo dados da porta {PORTA_SERIAL}...")
            while True:
                linha = ser.readline().decode('utf-8').strip()
                if linha:
                    print(f"Dado recebido: {linha}")
                    # Supondo que os dados venham em formato JSON ou CSV simples
                    # Aqui, vamos gravar como string, mas pode ser adaptado
                    doc = {"dado": linha, "timestamp": time.time()}
                    try:
                        collection.insert_one(doc)
                        print("Dado gravado no MongoDB!")
                    except Exception as e:
                        print(f"Erro ao gravar no MongoDB: {e}")
    except serial.SerialException as e:
        print(f"Erro ao acessar a porta serial: {e}")
    except KeyboardInterrupt:
        print("Leitura interrompida pelo usuário.")

if __name__ == "__main__":
    gravar_dados_arduino()
