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

    equipas_str = ', '.join([f'"{e}"' for e in equipas])
    nova_linha_js = f"{{ player: 0, predict: [{equipas_str}]}},\n"

    with open("data.js", "r", encoding="utf-8") as file:
        lines = file.readlines()

    # Localizar e substituir a linha específica no arquivo JS
    with open("data.js", "w", encoding="utf-8") as file:
        for line in lines:
            if line.strip().startswith("{ player: 0, predict: ["):
                file.write(f"            {nova_linha_js}")
            else:
                file.write(line)


else:
    print(f"Erro ao acessar a página: {response.status_code}")
