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
        headers = Object.keys(trophyData[0])
        html += `
            <tr class="${rowClass}">
                <th style="width:20%">Pos</th>
                <th>Player</th>
                ${headers.includes('points') ? '<th style="width:25%">Points</th>' : ''}
                ${headers.includes('V') ? '<th style="width:20%">V</th>' : ''}
                ${headers.includes('score') ? '<th>Score</th>' : ''}
            </tr>
        `;

        trophyData.forEach((dado, index) => {
            const rowClass = index % 2 === 0 ? 'even' : 'odd';
            html += `
                <tr class="${rowClass}">
                    <td>${dado.pos}</td>
                    <td>${fantasy.players[dado.player - 1].name}</td>
                    ${headers.includes('points') ? `<td>${dado.points}</td>` : ''}
                    ${headers.includes('V') ? `<td>${dado.V}</td>` : ''}
                    ${headers.includes('score') ? `<td>${dado.score}</td>` : ''}
                </tr>
            `;
        });
    }

    return html;
}



console.log(foundTrophy)
document.getElementById('trophy-winner').setAttribute('src', "data/images/players/" + foundTrophy.winner + ".jpg")
document.getElementById('trophy-winner').setAttribute('alt', foundTrophy.winner)

const description = document.getElementById('description-winner');
description.innerHTML = `
    <div style="font-size:1.1em;font-weight:1000;margin-bottom:20px;">
        ${foundTrophy.winner ? foundTrophy.winner : ''}
    </div>
    <div>
        ${getNumberTrophiesPast(foundTrophy.id, foundTrophy.name, foundTrophy.winner)}
    </div>
`;


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
    drawChart(playerData);

}

if (foundTrophy.standings) {
    document.getElementById('table-predicts').classList.remove('d-none')
    let tables = document.getElementById('table-predicts')

    foundTrophy.standings.forEach(player => {

        let tableCol = document.createElement('div');
        tableCol.classList.add('col-12', 'p-4', 'pb-0')
        if (foundTrophy.standings.length == 2) {
            tableCol.classList.add('col-md-6')
        }

        let table = document.createElement('table')
        table.classList.add('table', 'table-sm')
        table.style.width = '100%'
        table.style.fontSize = 'large'
        table.innerHTML = `
            <thead class="${foundTrophy.code}">
                <tr>
                    <th colspan="3" class="text-center">${fantasy.players[player.player - 1].name}</th>
                </tr>
            </thead>
        `
        let tbody = document.createElement('tbody')
        player.predict.forEach((team, index) => {
            const rowClass = index % 2 === 0 ? 'even' : 'odd';
            let tr = document.createElement('tr')
            tr.classList.add(rowClass)
            tr.innerHTML = `
                <td>${index + 1}</td>
                <td>${team.team} <span style="font-size: 0.75rem">(${team.realPlace})</span> </td>
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
    const ctxLine = document.getElementById('lineChart').getContext('2d');
    const ctxColumn = document.getElementById('columnChart').getContext('2d');

    const labels = playerData[0].evolution.map((_, i) => "GW " + (i + 1));
    
    const isMobile = window.innerWidth <= 768;

    const mobileLabels = isMobile ? 
        playerData[0].evolution.map((_, i) => (i % 2 === 0 || i === playerData[0].evolution.length - 1) ? "GW " + (i + 1) : '') : 
        labels;

    const datasetsLine = playerData.map(player => ({
        label: fantasy.players[player.player - 1].name,
        data: player.evolution,
        borderColor: player.color,
        backgroundColor: player.color,
        fill: false,
        tension: 0.2,
        pointRadius: isMobile ? 2 : 3,
        borderWidth: isMobile ? 2 : 3
    }));

    const datasetsColumn = playerData.map(player => {
        const gameByGame = player.evolution.map((val, i, arr) => i === 0 ? val : val - arr[i - 1]);
        return {
            label: fantasy.players[player.player - 1].name,
            data: gameByGame,
            backgroundColor: player.color,
            barThickness: isMobile ? 'flex' : undefined
        };
    });

    const commonOptions = {
        responsive: true,
        maintainAspectRatio: !isMobile,
        plugins: {
            title: {
                display: true,
                font: { size: isMobile ? 18 : 24 },
                color: "#fff"
            },
            legend: {
                position: isMobile ? 'top' : 'bottom',
                labels: {
                    color: "#fff",
                    boxWidth: isMobile ? 12 : 40,
                    font: {
                        size: isMobile ? 10 : 12
                    }
                }
            },
            tooltip: {
                enabled: true,
                mode: isMobile ? 'nearest' : 'index',
                intersect: isMobile
            }
        },
        scales: {
            x: {
                title: {
                    display: !isMobile,
                    text: 'GameWeek',
                    color: '#fff'
                },
                ticks: {
                    color: '#fff',
                    maxRotation: isMobile ? 90 : 0,
                    autoSkip: isMobile,
                    font: {
                        size: isMobile ? 8 : 12
                    }
                }
            },
            y: {
                title: {
                    display: !isMobile,
                    text: 'Points',
                    color: '#fff'
                },
                ticks: {
                    color: '#fff',
                    font: {
                        size: isMobile ? 8 : 12
                    }
                }
            }
        }
    };

    const lineOptions = JSON.parse(JSON.stringify(commonOptions));
    lineOptions.plugins.title.text = 'Evolution Graph';

    const columnOptions = JSON.parse(JSON.stringify(commonOptions));
    columnOptions.plugins.title.text = 'Game by Game Graph';
    
    new Chart(ctxLine, {
        type: 'line',
        data: {
            labels: mobileLabels,
            datasets: datasetsLine
        },
        options: lineOptions
    });

    new Chart(ctxColumn, {
        type: 'bar',
        data: {
            labels: mobileLabels,
            datasets: datasetsColumn
        },
        options: columnOptions
    });

    let max = Math.max(...playerData.map(p => p.evolution[p.evolution.length - 1]));
    if (!isMobile) {
        document.getElementById("lineChart").style.height = `${max / 40 + 100}vh`;
        document.getElementById("columnChart").style.height = `${max / 40 + 100}vh`;
    }

    let best = { player: '', points: 0, round: 0 };
    datasetsColumn.forEach(dataset => {
        dataset.data.forEach((points, i) => {
            if (points > best.points) {
                best = {
                    player: dataset.label,
                    points: points,
                    round: i + 1
                };
            }
        });
    });

    document.getElementById('best-round').classList.remove('d-none');
    document.getElementById('best-round-winner').innerText = best.player;
    document.getElementById('best-round-result').innerText = `${best.points} points - Game Week ${best.round}`;
}


function getTrophyColorsFromTitle() {
    const el = document.getElementById('trophy-title');
    if (!el) return { bg: '#222', color: '#fff', border: '#222' };
    const style = getComputedStyle(el);
    return {
        bg: style.backgroundColor || '#222',
        color: style.color || '#fff',
        border: style.borderBottomColor || '#222'
    };
}

function applyTrophyColorsToNavbar(colors) {
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        navbar.style.backgroundColor = colors.bg;
        navbar.style.color = colors.color;

        const navLinks = navbar.querySelectorAll('.nav-link, .navbar-brand');
        navLinks.forEach(link => {
            link.style.setProperty("color", colors.color, "important");
        });

        const togglers = navbar.querySelectorAll('.navbar-toggler, .navbar-toggler-icon');
        togglers.forEach(toggler => {
            toggler.style.setProperty("color", colors.color, "important");
            toggler.style.setProperty("border-color", colors.color, "important");
        });

        const style = document.createElement('style');
        style.textContent = `
            .navbar-toggler-icon::before {
                color: ${colors.color} !important;
            }
        `;
        document.head.appendChild(style);

        const navbarLogos = document.querySelectorAll('.logo-light, .logo-dark');
        navbarLogos.forEach(logo => {
            logo.style.setProperty("display", "none", "important");
        });

    }
}

window.addEventListener('DOMContentLoaded', function () {
    const colors = getTrophyColorsFromTitle();

    const btnGroup = document.getElementById('btn-group-container');
    if (btnGroup) {
        btnGroup.style.setProperty('--trophy-bg', colors.bg);
        btnGroup.style.setProperty('--trophy-color', colors.color);
        btnGroup.style.setProperty('--trophy-border', colors.border);
    }

    if (document.querySelector('.navbar')) {
        applyTrophyColorsToNavbar(colors);
    } else {
        document.addEventListener('navbarLoaded', function() {
            applyTrophyColorsToNavbar(colors);
        });
    }

    let buttons = [
        { id: 'btn-table', label: 'Table', active: true },
    ];

    if (foundTrophy.graph) {
        buttons.push({ id: 'btn-line', label: 'Evolution', active: false });
        buttons.push({ id: 'btn-column', label: 'Game by Game', active: false });
    }
    if (foundTrophy.standings) {        
        buttons.push({ id: 'btn-standings', label: 'Standings', active: false });
    }


    buttons.forEach(btn => {
        const button = document.createElement('button');
        button.type = 'button';
        button.className = 'btn btn-trophy-visual' + (btn.active ? ' active' : '');
        button.id = btn.id;
        button.textContent = btn.label;
        button.style.minWidth = '120px';
        btnGroup.appendChild(button);
    });


    function setVisualization(view) {
        buttons.forEach(btn => {
            btnID = btn.id;
            visualID = btnID.replace('btn-', 'visualization-');
            document.getElementById(visualID).classList.add('d-none');
            document.getElementById(btnID).classList.remove('trophy-active');
        });

        if (view === 'table') {
            document.getElementById('visualization-table').classList.remove('d-none');
            document.getElementById('btn-table').classList.add('trophy-active');
        } else if (view === 'line') {
            document.getElementById('visualization-line').classList.remove('d-none');
            document.getElementById('btn-line').classList.add('trophy-active');
        } else if (view === 'column') {
            document.getElementById('visualization-column').classList.remove('d-none');
            document.getElementById('btn-column').classList.add('trophy-active');
        } else if (view === 'standings') {
            document.getElementById('visualization-standings').classList.remove('d-none');
            document.getElementById('btn-standings').classList.add('trophy-active');
        }
    }

    document.getElementById('btn-table').addEventListener('click', function () { setVisualization('table'); });
    if (foundTrophy.graph) {
        document.getElementById('btn-line').addEventListener('click', function () { setVisualization('line'); });
        document.getElementById('btn-column').addEventListener('click', function () { setVisualization('column'); });
    }
    if (foundTrophy.standings) {
        document.getElementById('btn-standings').addEventListener('click', function () { setVisualization('standings'); });
    }

    setVisualization('table');
});





