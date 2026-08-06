import requests

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

print(useApiSapo("173"))

