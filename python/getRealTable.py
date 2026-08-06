import datetime
import json
import requests

def getTable(trophy):
    url = trophies[trophy]
    # equipas = useParserSapo(url)
    equipas = useApiSapo(api_ids[trophy])

    # read from trophies.json
    trophies_loaded = {}
    with open("data/trophies.json", "r", encoding="utf-8") as file:
        trophies_loaded = json.load(file)

    current_trophy = next((t for t in trophies_loaded if t["id"] == trophy), None)
    if current_trophy is None:
        print(f"Trophy {trophy} not found in trophies.json")
        return

    # update standings[0]
    if "standings" in current_trophy and len(current_trophy["standings"]) > 0:
        current_trophy["standings"][0]["predict"] = equipas
    else:
        print(f"No standings found for trophy {trophy}")
        return

    # update datetime updated
    if "source" in current_trophy:
        current_trophy["source"]["update"] = str(datetime.datetime.now())


    # write back to trophies.json
    with open("data/trophies.json", "w", encoding="utf-8") as file:
        json.dump(trophies_loaded, file, ensure_ascii=False, indent=4)
        print(f"Updated standings for trophy {trophy} in trophies.json")

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


def useApiSapo(competicao_id):

    url = f"https://flex.sapo.pt/api/sports/tournament/{competicao_id}"

    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2228.0 Safari/537.3'
    }

    response = requests.get(url, headers=headers)
    data = response.json()

    teams = data['teams']
    rankings = data['tournaments'][competicao_id]['rankings']

    table = {}

    for team_id in teams:
        if team_id not in rankings:
            continue
        team_name = teams[team_id]['name']
        team_rank = rankings[team_id]['position']
        table[team_rank] = team_name

    return [table[rank] for rank in sorted(table.keys())]

trophies = {
    # "ucl25battle": "https://desporto.sapo.pt/futebol/competicao/uefa-champions-league-6/classificacao",
    # "pt25battle": "https://www.ligaportugal.pt/pt/liga/classificacao/20242025/ligaportugalbetclic",
    # "pt25battle": "https://desporto.sapo.pt/futebol/competicao/primeira-liga-2/classificacao",
    "ucl26battle": "https://desporto.sapo.pt/futebol/competicao/uefa-champions-league-6/classificacao",
    "pt26battle": "https://desporto.sapo.pt/futebol/competicao/primeira-liga-2/classificacao"
}

api_ids = {
    "ucl26battle": "173",
    "pt26battle": "192"
}

# getTable("ucl26battle")
getTable("pt26battle")