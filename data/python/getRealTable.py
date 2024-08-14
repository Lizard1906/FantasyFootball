import requests
from bs4 import BeautifulSoup

url = 'https://www.ligaportugal.pt/pt/liga/classificacao/20242025/ligaportugalbetclic'

response = requests.get(url)

if response.status_code == 200:
    soup = BeautifulSoup(response.text, 'html.parser')
    
    tabela = soup.find('table', {'id': 'primeiraLiga'})
    linhas = tabela.find_all('tr')

    equipas=[]
    for linha in linhas:
        colunas = linha.find_all('td')
        dados = [coluna.text.strip() for coluna in colunas]
        if len(dados)>0:
            if dados[2]!='':
                equipas.append(dados[2])

    with open("ligaPTtable.txt", "w", encoding="utf-8") as classificacao_file:
        classificacao_file.write(str(equipas))


else:
    print(f"Erro ao acessar a página: {response.status_code}")
