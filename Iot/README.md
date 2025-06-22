# 📡 Projeto IoT: Arduino, Python e MongoDB Atlas

Este projeto integra um Arduino para coleta de dados via porta serial, scripts Python para gravação e consulta, e um banco de dados MongoDB Atlas para armazenamento e análise dos dados. Ideal para aplicações de IoT, monitoramento ambiental e prototipagem rápida.

---

## 📦 Estrutura do Projeto
```
iot-pi/
  iotpi/
    mongo_gravar.py        # Script para ler dados do Arduino e gravar no MongoDB
    Mongo_Query.py         # Script para consultar registros do MongoDB
    Rodar_comandos.txt     # Dicas de comandos para rodar os scripts
    Arduino_DHT11/         # Exemplo de código Arduino
    ...
```

---

## 1️⃣ Coleta e Gravação de Dados (mongo_gravar.py)

Este script realiza a leitura contínua dos dados enviados pelo Arduino na porta serial e grava cada linha como um documento na coleção `medidas` do MongoDB Atlas.

### ✨ Processo
- **Leitura Serial:** Recebe dados do Arduino (ex: sensores) pela porta serial (ex: COM6).
- **Gravação:** Cada linha recebida é armazenada no MongoDB com timestamp.

### 🛠️ Tecnologias Utilizadas
- Python
- PySerial: Comunicação serial com Arduino
- Pymongo: Integração com MongoDB Atlas

### 🚀 Como Rodar
1. Conecte o Arduino na porta correta (ajuste `PORTA_SERIAL` em `mongo_gravar.py` se necessário).
2. Instale as dependências:
   ```bash
   pip install pymongo pyserial
   ```
3. Execute o script:
   ```bash
   python mongo_gravar.py
   ```
4. Para parar a gravação, pressione `Ctrl + C` no terminal.

---

## 2️⃣ Consulta Interativa de Dados (Mongo_Query.py)

Este script oferece um menu interativo para consultar os dados gravados no MongoDB. Permite visualizar o último registro, os dois últimos ou todos os registros paginados.

### ✨ Processo
- **Consulta:** Busca registros na coleção `medidas` do MongoDB.
- **Menu:** Interface de texto para seleção da consulta desejada.

### 🛠️ Tecnologias Utilizadas
- Python
- Pymongo

### 🚀 Como Rodar
1. Execute o script de consulta:
   ```bash
   python Mongo_Query.py
   ```
2. Escolha a opção desejada no menu:
   - 1: Último registro
   - 2: Dois últimos registros
   - 3: Todos os registros (paginado)
   - 4: Sair

---

## 🔒 Observações Importantes
- Altere a porta serial (`PORTA_SERIAL`) conforme o seu sistema.
- O URI do MongoDB está exposto apenas para exemplo. **Nunca compartilhe sua senha real em repositórios públicos!**
- Para adaptar o formato dos dados gravados, edite a função `gravar_dados_arduino`.

---

## 💡 Exemplo de Código: Gravação
```python
import serial
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
import time

# Configurações do MongoDB Atlas
uri = "mongodb+srv://PI-user-admin:***@cluster0.dzi1v.mongodb.net/iot"

try:
    client = MongoClient(uri, server_api=ServerApi('1'))
    client.admin.command('ping')
    print("Conexão bem-sucedida com o MongoDB Atlas!")
    db = client['arduino']
    collection = db['medidas']
except Exception as e:
    print(f"Erro ao conectar ao MongoDB: {e}")
    collection = None

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
```

---

## 💡 Exemplo de Código: Consulta
```python
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
from pymongo import DESCENDING

uri = "mongodb+srv://PI-user-admin:***@cluster0.dzi1v.mongodb.net/iot"

try:
    client = MongoClient(uri, server_api=ServerApi('1'))
    client.admin.command('ping')
    print("Conexão bem-sucedida com o MongoDB Atlas!")
    db = client['arduino']
    collection = db['medidas']
except Exception as e:
    print(f"Erro ao conectar ao MongoDB: {e}")
    collection = None

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
# ...demais funções do menu...
```

---

Feito com ❤️ para projetos de IoT, prototipagem e aprendizado!