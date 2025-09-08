import datetime

def getTable(trophy):
    url = trophies[trophy]
    equipas = useParserSapo(url)

    equipas_str = ', '.join([f'"{e}"' for e in equipas])
    nova_linha_js = f"            {{ player: 0, predict: [{equipas_str}]}},\n"
    update_info = f"        source: {{name: 'SAPO Desporto', url: '{url}', update: '{datetime.datetime.now()}'}},\n"

    # abrir o js original
    with open("data.js", "r", encoding="utf-8") as file:
        lines = file.readlines()

    # Localizar e substituir a linha específica no arquivo JS
    with open("data.js", "w", encoding="utf-8") as file:
        is_this_trophy = False
        for line in lines:
            if (is_this_trophy):
                if line.strip().startswith("{ player: 0, predict: ["):
                    file.write(f"{nova_linha_js}")
                elif line.strip().startswith("source"):
                    file.write(update_info)
                    is_this_trophy = False
                else:
                    file.write(line)
            else:
                if trophy in line.strip():
                    is_this_trophy = True
                file.write(line)

def useParserSapo(url):
    from urllib.request import urlopen, Request
    headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2228.0 Safari/537.3'}
    from bs4 import BeautifulSoup
    import datetime


    req = Request(url=url, headers=headers) 
    html = urlopen(req).read() 

    soup = BeautifulSoup(html, 'html.parser')
    table = soup.find('table', {'class': '[ ink-table medium bottom-space ] rankings-table'})
    rows = soup.find('tbody').find_all('tr')

    equipas = []

    for row in rows:
        team_cell = row.find('td', class_='[ align-left ] team')
        team_link = team_cell.find('a', class_='[ ellipsis ]')
        team_name = team_link.get_text(strip=True)
        equipas.append(team_name)

    return equipas

def useParserLigaPortugal(url):
    # este parser era para o site da liga, mas tiveram um update portanto usa-se o parser do sapo
    import requests
    from bs4 import BeautifulSoup

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

        return equipas



trophies = {
    # "ucl25battle": "https://desporto.sapo.pt/futebol/competicao/uefa-champions-league-6/classificacao",
    # "pt25battle": "https://www.ligaportugal.pt/pt/liga/classificacao/20242025/ligaportugalbetclic",
    # "pt25battle": "https://desporto.sapo.pt/futebol/competicao/primeira-liga-2/classificacao",
    "ucl26battle": "https://desporto.sapo.pt/futebol/competicao/uefa-champions-league-6/classificacao",
    "pt26battle": "https://desporto.sapo.pt/futebol/competicao/primeira-liga-2/classificacao"
}

getTable("ucl26battle")
getTable("pt26battle")