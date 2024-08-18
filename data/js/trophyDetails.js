fantasy = JSON.parse(localStorage.getItem('fantasy'))

var url = window.location.href;
var id = url.split('?')[1];
console.log(id)

document.body.style.backgroundImage = "url('data/images/background/" + id + ".png')";

fantasy.trophies.forEach(trophy => {
    if (trophy.id == id) {
        foundTrophy = trophy;
        trophyIndex = fantasy.trophies.findIndex(trophy => trophy.id === id);

        if (trophyIndex === 0) {
            prevTrophy = null;
        } else {
            prevTrophy = fantasy.trophies[trophyIndex - 1].id;
        }
        if (trophyIndex === fantasy.trophies.length - 1) {
            nextTrophy = null;
        } else {
            nextTrophy = fantasy.trophies[trophyIndex + 1].id;
        }
    }
});


if (prevTrophy != null) {
    document.getElementById('prev-arrow').setAttribute('href', 'trophyDetails?' + prevTrophy);
    document.getElementById('prev-arrow').classList.remove('d-none');
    document.getElementById('prev-arrow').classList.add(foundTrophy.code);
}
if (nextTrophy != null) {
    document.getElementById('next-arrow').setAttribute('href', 'trophyDetails?' + nextTrophy);
    document.getElementById('next-arrow').classList.remove('d-none');
    document.getElementById('next-arrow').classList.add(foundTrophy.code);
}


initSeason = foundTrophy.date - 1;
document.getElementById('trophy-title').innerHTML = `${foundTrophy.name} <span class="trophy-year">[${initSeason}/${foundTrophy.date}]</span>`;
document.getElementById('trophy-title').classList.add(foundTrophy.code);

const table = document.getElementById('points-table');
const tableRows = getTrophyDataRows(id, foundTrophy.data);
table.innerHTML = tableRows;


function getTrophyDataRows(id, trophyData) {
    let html = '';

    const trophy = trophies.find((trophy) => trophy.id === id);
    if (trophy) {
        const rowClass = trophy.code;
        html += `
            <tr class="${rowClass}">
                <th style="width:20%">Pos</th>
                <th>Player</th>
                <th style="width:25%">Points</th>
            </tr>
        `;

        trophyData.forEach((dado, index) => {
            const rowClass = index % 2 === 0 ? 'even' : 'odd';
            html += `
                <tr class="${rowClass}">
                    <td>${dado.pos}</td>
                    <td>${fantasy.players[dado.player-1].name}</td>
                    <td>${dado.points}</td>
                </tr>
            `;
        });
    }

    return html;
}




document.getElementById('trophy-winner').setAttribute('src', "data/images/players/" + foundTrophy.winner + ".jpg")
document.getElementById('trophy-winner').setAttribute('alt', foundTrophy.winner)

const description = document.getElementById('description-winner')
description.classList.add(foundTrophy.code)
description.innerHTML = `
    <div style="text-align:center">
        ${getNumberTrophiesPast(foundTrophy.id, foundTrophy.name, foundTrophy.winner)}
    </div>
    `


function getNumberTrophiesPast(id, name, winner) {
    let html = name + ' ongoing';

    if (winner !== null) {
        let countText = '';
        let numTrophiesPast = 0;

        const index = trophies.findIndex(item => item.id === id);

        for (let i = index; i >= 0; i--) {
            if (trophies[i].name === name && trophies[i].winner === winner) {
                numTrophiesPast++;
            }
        }

        switch (numTrophiesPast) {
            case 1: countText = "1st"; break;
            case 2: countText = "2nd"; break;
            case 3: countText = "3rd"; break;
            default: countText = numTrophiesPast + "th";
                break;
        }

        html = `${countText} ${name} won`
    }


    return html;
}



if (foundTrophy.graph) {
    const playerData = foundTrophy.graph;

    google.charts.load('current', { 'packages': ['corechart'] });
    google.charts.setOnLoadCallback(() => drawChart(playerData));
}

if (foundTrophy.standings) {
    console.log(foundTrophy)
    document.getElementById('table-predicts').classList.remove('d-none')
    let tables = document.getElementById('table-predicts')

    foundTrophy.standings.forEach(player => {

        let tableCol = document.createElement('div');
        tableCol.classList.add('col-12', 'p-4', 'pb-0')    
        if (foundTrophy.standings.length == 2) {
            tableCol.classList.add('col-md-6')
        }    

        let table = document.createElement('table')
        table.classList.add('table', 'table-striped', 'table-bordered', 'table-sm')
        table.style.width = '100%'
        table.style.fontSize = 'large'
        table.innerHTML = `
            <thead>
                <tr>
                    <th colspan="3" class="text-center">${fantasy.players[player.player-1].name}</th>
                </tr>
            </thead>
        `
        let tbody = document.createElement('tbody')
        player.predict.forEach((team, index) => {
            let tr = document.createElement('tr')
            tr.innerHTML = `
                <td>${index + 1}</td>
                <td>${team.team} <span style="font-size: 0.75rem; color: #aaa">(${team.realPlace})</span> </td>
                <td style="color: ${team.points > 0 ? 'green' : team.points < 0 ? 'red' : ''};">
                    ${team.points > 0 ? '+' : ''}${team.points}
                </td>
            `;
        tbody.appendChild(tr)
        })
        table.appendChild(tbody)
        tableCol.appendChild(table)
        tables.appendChild(tableCol)
        console.log(tables)
              

    })

    let text = document.createElement('div')
    text.classList.add('text-center', 'text-muted', 'pb-2');
    text.style.fontSize = '0.75rem'; // Tamanho de fonte menor
    text.innerHTML = `
        Source: <a href="${foundTrophy.source.url}" style="color: inherit" target="_blank">${foundTrophy.source.name}</a> - Last Updated: ${foundTrophy.source.update.split('.')[0]}
    `
    tables.appendChild(text)


}


function drawChart(playerData) {
    const lineChartData = [['X', ...playerData.map(player => fantasy.players[player.player-1].name)]];
    const columnChartData = [['X', ...playerData.map(player => fantasy.players[player.player-1].name)]];

    let maxRound=0;
    let maxPoints=0;
    let maxPlayer="";

    for (let i = 0; i < playerData[0].evolution.length; i++) {
        lineChartData.push([i + 1, ...playerData.map(player => player.evolution[i])]);
        if (i === 0) {
            columnChartData.push([i + 1, ...playerData.map(player => player.evolution[i])]);
        } else {
            columnChartData.push([i + 1, ...playerData.map(player => player.evolution[i] - player.evolution[i - 1])]);
        }
        for (let j = 0; j < playerData.length; j++) {
            if (columnChartData[i+1][j+1] > maxPoints) {
                maxPoints = columnChartData[i+1][j+1]
                maxRound = i+1
                maxPlayer = columnChartData[0][j+1]
            }
        }
    }

    const lineData = google.visualization.arrayToDataTable(lineChartData);
    const columnData = google.visualization.arrayToDataTable(columnChartData);

    
    const optionsLineChart = {
        title: 'Evolution Graph',
        curveType: 'function',
        legend: { position: 'bottom' },
        hAxis: {
            title: 'GameWeek',
            ticks: Array.from({ length: playerData[0].evolution.length }, (_, i) => i + 1), // Gera números inteiros de 1 até o comprimento do array
        },
        vAxis: {
            title: 'Points',
        },
        colors: playerData.map(player => player.color),
    };

    const optionsColumnChart = {
        title: 'Game by Game Graph',
        curveType: 'function',
        legend: { position: 'bottom' },
        hAxis: {
            title: 'GameWeek',
            ticks: Array.from({ length: playerData[0].evolution.length }, (_, i) => i + 1), // Gera números inteiros de 1 até o comprimento do array
        },
        vAxis: {
            title: 'Points',
        },
        colors: playerData.map(player => player.color),
    };



    let max = 0;
    for (let i = 0; i < playerData.length; i++) {
        let maxPerPlayer = playerData[i].evolution[playerData[i].evolution.length - 1]
        if (maxPerPlayer > max) {
            max = maxPerPlayer
        }
    }
    document.getElementById("lineChart").style.height = `${max / 40 + 50}vh`
    document.getElementById("lineChart").classList.add('p-0')
    document.getElementById("columnChart").style.height = `${max / 40 + 50}vh`
    document.getElementById("columnChart").classList.add('p-0')
    const lineChart = new google.visualization.LineChart(document.getElementById('lineChart'));
    lineChart.draw(lineData, optionsLineChart);
    const columnChart = new google.visualization.ColumnChart(document.getElementById('columnChart'))
    columnChart.draw(columnData, optionsColumnChart)
    document.getElementById('best-round').classList.remove('d-none')
    document.getElementById('best-round-winner').innerText = maxPlayer
    document.getElementById('best-round-result').innerText = maxPoints + " points - Game Week "+maxRound
}





