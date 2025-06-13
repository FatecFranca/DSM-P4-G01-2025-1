# 📊 Scripts de Dados (`Dados/`)

Esta parte do projeto é responsável por coletar, processar e analisar dados meteorológicos históricos. É dividida em dois subprojetos principais, localizados nas pastas `data` e `pipelines`.

---

## 1. Coleta de Dados (`Dados/data`)

Este script realiza um processo de ETL (Extração, Transformação e Carga) para obter dados climáticos históricos da API Open-Meteo e armazená-los no MongoDB. O objetivo é criar uma base de dados robusta para análises futuras.

### ✨ Processo

1.  **Extração**: O script busca os dados meteorológicos dos últimos 90 dias para a cidade de Franca-SP, utilizando a API da Open-Meteo.
2.  **Transformação**: Os dados brutos são limpos e estruturados em um formato tabular utilizando a biblioteca Pandas.
3.  **Carga**: Os dados transformados são carregados em uma coleção no MongoDB. O processo é configurado para apagar a coleção existente antes de inserir os novos dados, garantindo que a base esteja sempre atualizada com a última extração.

### 🛠️ Tecnologias Utilizadas

* **Python**
* **Pandas**: Para manipulação e transformação dos dados.
* **Pymongo**: Para interação com o banco de dados MongoDB.
* **python-dotenv**: Para gerenciamento de variáveis de ambiente.
* **Requests**: Para realizar as chamadas HTTP à API.

### 🚀 Como Rodar

1.  Navegue até a pasta do projeto:
    ```bash
    cd Dados/data
    ```
2.  Instale as dependências necessárias:
    ```bash
    pip install -r requirements.txt
    ```
3.  Crie um arquivo `.env` na raiz da pasta `Dados/data` e configure as variáveis de ambiente necessárias (como a string de conexão do MongoDB).
4.  Execute o script principal para iniciar o processo de ETL:
    ```bash
    python main.py
    ```

---

## 2. Pipeline de Análise (`Dados/pipelines`)

Este pipeline consome os dados brutos coletados pelo script anterior, realiza análises estatísticas e de previsão, e salva os resultados em uma nova coleção no MongoDB. Adicionalmente, as métricas podem ser exportadas para o Google Sheets.

### ✨ Processo e Análises

1.  **Carga dos Dados**: O pipeline carrega os dados da coleção de dados brutos do MongoDB.
2.  **Análise de Dados**:
    * **Estatísticas Descritivas**: Calcula métricas como média, desvio padrão, mínimo e máximo para as variáveis numéricas.
    * **Matriz de Correlação**: Analisa a correlação entre as diferentes variáveis meteorológicas.
    * **Probabilidade de Clima**: Calcula a probabilidade de ocorrência de cada código de clima (WMO).
    * **Previsão de Temperatura**: Utiliza um modelo de Regressão Linear para prever a temperatura média para os próximos 7 dias.
3.  **Armazenamento**: Salva todas as métricas e previsões calculadas em uma coleção MongoDB chamada `climate_metrics`.
4.  **Exportação (Opcional)**: Um script separado permite exportar as métricas da coleção `climate_metrics` para uma planilha no Google Sheets para fácil visualização e compartilhamento.

### 🛠️ Tecnologias Utilizadas

* **Python**
* **Pandas**: Para manipulação dos dados.
* **Scikit-learn**: Para treinar o modelo de regressão linear.
* **Pymongo**: Para ler e escrever no MongoDB.
* **Gspread** e **Oauth2client**: Para autenticar e exportar dados para o Google Sheets.

### 🚀 Como Rodar

1.  Navegue até a pasta do projeto:
    ```bash
    cd Dados/pipelines
    ```
2.  Instale as dependências:
    ```bash
    pip install -r requirements.txt
    ```
3.  Configure as variáveis de ambiente em um arquivo `.env` (incluindo as credenciais do MongoDB e do Google Cloud).
4.  Execute o script principal para rodar o pipeline de análise:
    ```bash
    python main.py
    ```
5.  Para exportar os resultados para o Google Sheets, execute o script de exportação:
    ```bash
    python export_to_gsheets.py
    ```
