import serial
import pandas as pd
import numpy as np
import statistics as st
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
from datetime import datetime
from scipy import stats
from sklearn.linear_model import LinearRegression
from sklearn.model_selection import train_test_split
from scipy.stats import norm

# Configura a porta serial
try:
    ser = serial.Serial('COM6', 9600)
except Exception as e:
    print(f"Erro ao conectar na porta serial: {e}")

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
    collection = None

# Vetores para armazenar temperatura e umidade
temperaturas = []
umidades = []

# Loop para ler 90 registros da porta serial
for i in range(30):
    try:
        # Ler a linha de dados da serial
        data = ser.readline().decode('utf-8').strip()
        print(f"Dados recebidos: {data}")
        
        # Separar temperatura e umidade
        if ',' in data:
            temperatura, umidade = data.split(',')
            temperatura = float(temperatura)
            umidade = float(umidade)
            
            # Armazenar nos vetores
            temperaturas.append(temperatura)
            umidades.append(umidade)
        else:
            print("Formato de dados incorreto.")
    except Exception as e:
        print(f"Erro ao ler dados da serial: {e}")

print("--------------------------------------------------------------")
print("Leitura concluída. Estatísticas:")

# Variáveis globais para armazenar coeficientes e interceptos
coefRegrTemp = None
intercTemp = None
coefRegrUmid = None
intercUmid = None
prevFutTemp = None
prevFutUmid = None

# Função para gerar as estatísticas e projeções para um vetor
def calcular_estatisticas_projecao(vetor, tipo="Temperatura"):
    global coefTemp, intercTemp, coefUmid, intercUmid  # Tornar as variáveis globais

    media = round(np.mean(vetor).item(), 2)
    mediana = round(np.median(vetor).item(), 2)
    moda = round(float(st.mode(vetor)), 2)
    desvio_padrao = round(np.std(vetor, ddof=1).item(), 2)
    coeficiente_variacao = round((desvio_padrao / media) * 100, 2)
    assimetria = round(stats.skew(vetor).item(), 2)
    curtose = round(stats.kurtosis(vetor).item(), 2)

    # Imprimir as estatísticas
    print(f"Média {tipo}: {media:.2f}")
    print(f"Mediana {tipo}: {mediana:.2f}")
    print(f"Moda {tipo}: {moda}")
    print(f"Desvio padrão {tipo}: {desvio_padrao:.2f}")
    print(f"Coeficiente de variação {tipo}: {coeficiente_variacao:.2f}%")
    print(f"Assimetria {tipo}: {assimetria:.2f}")
    print(f"Curtose {tipo}: {curtose:.2f}")

    # Calcular regressão linear para previsão futura
    def regressao_linear(vetor, tipo):
        global coefRegrTemp, intercTemp, coefRegrUmid, intercUmid, prevFutTemp, prevFutUmid  # Usar as variáveis globais

        X = np.array(range(len(vetor))).reshape(-1, 1)
        y = np.array(vetor)

        modelo = LinearRegression()
        modelo.fit(X, y)

        # Coeficiente e intercepto
        coeficiente = modelo.coef_
        intercepto = modelo.intercept_

        print(f"Coeficiente de regressão {tipo}: {coeficiente[0]:.5f}")
        print(f"Intercepto {tipo}: {intercepto:.2f}")

        # Previsão para o próximo valor
        futuro_x = np.array([len(vetor)]).reshape(-1, 1)
        previsao_futura = modelo.predict(futuro_x)

        print(f"Previsão futura de {tipo} para o próximo valor: {previsao_futura[0]:.2f}")
        
        # Atualizar as variáveis globais com coeficiente e intercepto
        if tipo == "Temperatura":
            coefRegrTemp = coeficiente[0]
            intercTemp = intercepto
            prevFutTemp = previsao_futura
        elif tipo == "Umidade":
            coefRegrUmid = coeficiente[0]
            intercUmid = intercepto
            prevFutUmid = previsao_futura
        
        return modelo

    # Executar a regressão linear para o vetor
    regressao_linear(vetor, tipo)
    
    print("--------------------------------------------------------------")

# Calcular estatísticas e previsões para a temperatura
calcular_estatisticas_projecao(temperaturas, "Temperatura")

# Calcular estatísticas e previsões para a umidade
calcular_estatisticas_projecao(umidades, "Umidade")

# Verificar se a coleção está disponível e salvar no MongoDB
if collection is not None:
    try:
        # Buscar o maior valor de id na coleção e incrementar
        ultimo_documento = collection.find_one(sort=[("id", -1)])  # Busca o documento com o maior id
        if ultimo_documento:
            novo_id = ultimo_documento['id'] + 1
        else:
            novo_id = 1  # Se a coleção estiver vazia, começa do id 1
                    
        # Criar um documento com as leituras e salvar no MongoDB
        documento = {
            "id": novo_id,
            "mediaTemp": round(float(np.mean(temperaturas).item()), 2),  
            "medianaTemp": round(float(np.median(temperaturas).item()), 2),  
            "modaTemp": round(float(st.mode(temperaturas)), 2),  
            "desvioPTemp": round(float(np.std(temperaturas, ddof=1).item()), 2),  
            "coefDesvioPTemp": round(float((np.std(temperaturas, ddof=1) / np.mean(temperaturas)) * 100), 2),  
            "assimetriaTemp": round(float(stats.skew(temperaturas).item()), 2),  
            "curtoseTemp": round(float(stats.kurtosis(temperaturas).item()), 2),  
            "prevFutTemp": round(float(prevFutTemp[0]), 2),  # Acessando o primeiro elemento do array
            "coefRegrTemp": round(float(coefRegrTemp), 5),  
            "intercTemp": round(float(intercTemp), 2),  
            "mediaUmid": round(float(np.mean(umidades).item()), 2),  
            "medianaUmid": round(float(np.median(umidades).item()), 2),  
            "modaUmid": round(float(st.mode(umidades)), 2),  
            "desvioPUmid": round(float(np.std(umidades, ddof=1).item()), 2),  
            "coefDEsvioPUmid": round(float((np.std(umidades, ddof=1) / np.mean(umidades)) * 100), 2),  
            "assimetriaUmid": round(float(stats.skew(umidades).item()), 2),  
            "curtoseUmid": round(float(stats.kurtosis(umidades).item()), 2),  
            "prevFutUmid": round(float(prevFutUmid[0]), 2),  # Acessando o primeiro elemento do array
            "coefRegrUmid": round(float(coefRegrUmid), 5),  
            "intercUmid": round(float(intercUmid), 2),  
            "temperaturas": temperaturas,
            "umidades": umidades,
            "timestamp": datetime.now()
        }

        collection.insert_one(documento)
        print(f"Dados inseridos no MongoDB: {documento}")
    except Exception as e:
        print(f"Erro ao inserir dados no MongoDB: {e}")
else:
    print("Conexão com o MongoDB não foi estabelecida.")
