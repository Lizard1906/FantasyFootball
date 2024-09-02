const players = [
    {
        name: 'FlyingEagle36',
        description: 'The Impossible Comeback',
        trophies: []
    },
    {
        name: 'Lizard1906',
        description: 'The True Special One',
        trophies: []
    },
    {
        name: 'WhiskeyDrinkers',
        description: 'The One Who Drinks Whiskey',
        trophies: []
    },
    {
        name: 'U.D.V.',
        description: 'The One Who Gave Up Early',
        trophies: []
    }
];

// siglas equipas PT
AVS="AVS"; FCA="FC Arouca"; SLB="SL Benfica"; BFC="Boavista FC"; CPI = "Casa Pia AC", GDEP = "Estoril Praia"; FCEA="Estrela Amadora"; FCF="FC Famalicão"; SCF="SC Farense"; GVFC="Gil Vicente FC"; MFC="Moreirense FC"; CDN="CD Nacional"; FCP="FC Porto"; RAFC="Rio Ave FC"; GDSC="Santa Clara"; SCB="SC Braga"; SCP="Sporting CP"; VSC="Vitória SC"

const trophies = [
    // 2022-23
    { id: 'wc22', code: 'wc22', date: 2023, name: 'World Cup', category: 'world', data: [{ pos: 1, player: 1, points: null }, { pos: 2, player: 2, points: null }], finished: true },
    { id: 'pt23', code: 'ptbwin', date: 2023, name: 'Liga Portugal', category: 'pt', data: [{ pos: 1, player: 1, points: 2207 }, { pos: 2, player: 2, points: 2201 }], finished: true },
    { id: 'en23', code: 'premier', date: 2023, name: 'Premier League', category: 'en', data: [{ pos: 1, player: 2, points: 2581 }, { pos: 2, player: 1, points: 2552 }], finished: true },
    { id: 'ucl23', code: 'champions', date: 2023, name: 'Champions League', category: 'champ', data: [{ pos: 1, player: 2, points: 903 }, { pos: 2, player: 1, points: 880 }, { pos: 3, player: 3, points: 165 }], finished: true },
    // 2023-24
    {
        id: 'pt24', code: 'ptbetclic', date: 2024, name: 'Liga Portugal', category: 'pt',
        graph: [
            { player: 1, color: 'red', evolution: [55, 118, 190, 259, 312, 364, 432, 486, 549, 621, 673, 737, 810, 859, 928, 988, 1057, 1135, 1187, 1265, 1330, 1392, 1476, 1543, 1595, 1659, 1748, 1805, 1858, 1895, 1949, 1988, 2042, 2094] },
            { player: 2, color: 'green', evolution: [41, 83, 138, 197, 265, 330, 384, 448, 488, 551, 616, 694, 766, 829, 903, 991, 1063, 1134, 1213, 1281, 1352, 1415, 1507, 1563, 1613, 1702, 1763, 1793, 1847, 1921, 1974, 2048, 2106, 2171] },
            { player: 4, color: 'blue', evolution: [0, 41, 97, 139, 218, 265, 313, 355, 406, 458, 511, 568, 603, 647, 718, 775, 823, 907, 957, 1007, 1047, 1080, 1119, 1169, 1233, 1303, 1340, 1372, 1410, 1460, 1515, 1597, 1652, 1702] }
        ],
        finished: true
    },
    {
        id: 'ptpredict24', code: 'ptpredict', date: 2024, name: 'Portugal Predict', category: 'pt',
        graph: [
            { player: 1, color: 'red', evolution: [70, 180, 260, 340, 420, 490, 570, 610, 640, 700, 750, 850, 890, 920, 990, 1100, 1160, 1220, 1250, 1380, 1400, 1440, 1550, 1600, 1690, 1780, 1920, 1940, 2020, 2070, 2150, 2210, 2330, 2390] },
            { player: 2, color: 'green', evolution: [50, 130, 210, 260, 350, 440, 500, 550, 600, 680, 700, 740, 810, 890, 980, 1030, 1100, 1180, 1250, 1320, 1390, 1510, 1570, 1640, 1720, 1800, 1880, 1940, 2010, 2090, 2140, 2200, 2250, 2260] },
        ],
        finished: true
    },
    {
        id: 'en24', code: 'premier', date: 2024, name: 'Premier League', category: 'en',
        graph: [
            { player: 1, color: 'red', evolution: [77, 136, 183, 245, 287, 372, 441, 498, 599, 648, 692, 754, 800, 879, 926, 981, 1046, 1118, 1173, 1236, 1308, 1367, 1425, 1505, 1584, 1645, 1722, 1780, 1806, 1875, 1943, 2004, 2046, 2107, 2176, 2254, 2317, 2425] },
            { player: 2, color: 'green', evolution: [61, 139, 189, 261, 317, 396, 441, 498, 576, 643, 676, 758, 832, 897, 951, 990, 1072, 1106, 1159, 1210, 1267, 1337, 1412, 1473, 1530, 1600, 1675, 1734, 1767, 1822, 1858, 1928, 2029, 2090, 2164, 2236, 2303, 2351] },
        ],
        finished: true
    },
    {
        id: 'ucl24', code: 'champions', date: 2024, name: 'Champions League', category: 'champ',
        graph: [
            { player: 1, color: 'red', evolution: [66, 104, 156, 247, 307, 340, 397, 474, 515, 568, 614, 660, 730] },
            { player: 2, color: 'green', evolution: [62, 106, 171, 244, 328, 390, 439, 509, 552, 602, 644, 683, 752] },
        ],
        finished: true
    },
    {
        id: 'uclpredict24', code: 'uclpredictor', date: 2024, name: 'Champions Predict', category: 'champ',
        graph: [
            { player: 1, color: 'red', evolution: [54, 93, 155, 202, 231, 272, 314, 347, 364, 371, 376, 382, 392] },
            { player: 2, color: 'green', evolution: [52, 94, 159, 205, 243, 284, 310, 356, 375, 384, 387, 391, 409] },
        ],
        finished: true
    },
    {
        id: 'euro24', code: 'euro24', date: 2024, name: 'Euro Cup', category: 'euro',
        graph: [
            { player: 1, color: 'red', evolution: [56, 146, 192, 260, 305, 344, 385] },
            { player: 2, color: 'green', evolution: [56, 114, 148, 222, 270, 315, 360] },
        ],
        finished: true
    },
    {
        id: 'euro24predictor', code: 'euro24predictor', date: 2024, name: 'Euro Cup Predict', category: 'euro',
        graph: [
            { player: 1, color: 'red', evolution: [69, 150, 207, 254, 281, 331, 331] },
            { player: 2, color: 'green', evolution: [74, 180, 250, 310, 336, 360, 395] },
        ],
        finished: true
    },
    {
        id: 'euro24bracket', code: 'euro24bracket', date: 2024, name: 'Euro Cup Bracket', category: 'euro',
        data: [
            { pos: 1, player: 2, points: 90 },
            { pos: 2, player: 1, points: 53 },
        ],
        finished: true
    },
    // 2024-25
    {
        id: 'pt25bracket', code: 'ptbracket', date: 2025, name: 'Portugal Bracket', category: 'pt',
        standings: [
            { player: 0, predict: ["Sporting CP", "FC Famalicão", "FC Porto", "Santa Clara", "Vitória SC", "SC Braga", "SL Benfica", "Moreirense FC", "Rio Ave FC", "Gil Vicente FC", "Boavista FC", "AVS", "CD Nacional", "FC Arouca", "Casa Pia AC", "Estoril Praia", "Estrela Amadora", "SC Farense"]},
            { player: 1, predict: [SLB, SCP, FCP, SCB, VSC, FCF, MFC, RAFC, FCA, BFC, FCEA, SCF, GDEP, CPI, AVS, GVFC, CDN, GDSC]},
            { player: 2, predict: [SLB, SCP, FCP, SCB, VSC, FCF, RAFC, SCF, FCA, GDEP, GDSC, CPI, MFC, FCEA, CDN, GVFC, AVS, BFC]},
        ],
        source: {name: 'Liga Portugal', url: 'https://www.ligaportugal.pt/pt/liga/classificacao/20242025/ligaportugalbetclic', update: '2024-09-02 22:37:04.042847'},
        finished: false
    },
    {
        id: 'en25', code: 'premier', date: 2025, name: 'Premier League', category: 'en',
        graph: [
            { player: 1, color: 'red', evolution: [68, 126, 181] },
            { player: 2, color: 'green', evolution: [54, 122, 173] },
        ],
        finished: false
    },
    {
        id: 'en25draft', code: 'endraft', date: 2025, name: 'English Draft', category: 'en',
        graph: [
            { player: 1, color: 'red', evolution: [88, 155, 224] },
            { player: 2, color: 'green', evolution: [55, 124, 168] },
        ],
        finished: false
    },
    {
        id: 'en25cup', code: 'emirates', date: 2025, name: 'Emirates Cup', category: 'en',
        data: [
            { pos: 1, player: 2, points: 0 },
            { pos: 2, player: 1, points: 0 },
        ],
        finished: false
    },
];

trophies.forEach(trophy => {
    if (trophy.graph) {
        let playersData = trophy.graph.map((player, index) => ({
            pos: 0,
            player: player.player,
            points: player.evolution[player.evolution.length - 1]
        }));

        playersData.sort((a, b) => b.points - a.points);

        playersData.forEach((player, index) => {
            player.pos = index + 1;
        });

        trophy.data = playersData;
    }

    if (trophy.standings) {
        let realTable = trophy.standings[0];
        let new_standings = [];
        for (let i=1; i<trophy.standings.length; i++) {
            new_predict = [];
            trophy.standings[i].predict.forEach((t, index) => {
                points_scored = 0;
                realPlace = realTable.predict.indexOf(t) + 1
                predictPlace = index + 1

                // pontuação por lugares
                if (1 <= realPlace && realPlace <= 2 && 1 <= predictPlace && predictPlace <= 2 ) {
                    points_scored += 3
                    if (realPlace === predictPlace) {
                        points_scored += 4
                    }
                } else if (3 <= realPlace && realPlace <= 4 && 3 <= predictPlace && predictPlace <= 4 ) {
                    points_scored += 3
                    if (realPlace === predictPlace) {
                        points_scored += 1
                    }
                } else if (realPlace == predictPlace && realPlace == 5 ) {
                    points_scored += 2
                } else if (6 <= realPlace && realPlace <= 10 && 6 <= predictPlace && predictPlace <= 10 ) {
                    points_scored += 2
                    if (realPlace === predictPlace) {
                        points_scored += 3
                    }
                } else if (11 <= realPlace && realPlace <= 15 && 11 <= predictPlace && predictPlace <= 15 ) {
                    points_scored += 2
                    if (realPlace === predictPlace) {
                        points_scored += 3
                    }
                } else if (16 <= realPlace && realPlace <= 18 && 16 <= predictPlace && predictPlace <= 18 ) {
                    points_scored += 4
                    if (realPlace === predictPlace) {
                        points_scored += 4
                    }
                }

                if (Math.abs(predictPlace-realPlace)>=5) {
                    points_scored -= 2
                    points_scored -= (Math.abs(predictPlace-realPlace)-5)
                }

                new_predict.push({team:t, realPlace: realPlace, points: points_scored})
            });
            new_standings.push({player: i, predict: new_predict})
        }
        trophy.standings = new_standings;
        // 1º-2ºlugar: 4 pontos
        // 3º-5º: 1
        // 6º-15º: 3
        // 16º-18º: 4
        
        // equipa apurada para champions (1º e 2º): 3 pontos
        // equipa apurada para liga europa (3º e 4º): 3 pontos
        // equipa apurada para liga conference (5º): 1 ponto
        // equipa na 1 metade da tabela (exceto top 5): 2 pontos
        // equipa na 2 metade da tabela (exceto despromocao): 2 pontos
        // equipa em zona de despromocao: 4 pontos});

        // Se errarmos a posição por 5 ou mais lugares, menos (abs(real-predict)-5+2 ) pontos


        // tabela data
        let playersData = trophy.standings.map((player, index) => ({
            pos: 0,
            player: player.player,
            points: player.predict.reduce((acc, curr) => acc + curr.points, 0)
        }));

        playersData.sort((a, b) => b.points - a.points);

        playersData.forEach((player, index) => {
            player.pos = index + 1;
        });

        trophy.data = playersData;
    }

});

trophies.forEach(trophy => {
    if (trophy.finished) {
        trophy.winner = players[trophy.data[0].player - 1].name
    } else {
        trophy.winner = null;
    }
})


trophies.forEach(trophy => {
    if (trophy.winner !== null) {

        const player = players.find((player) => player.name === trophy.winner);
        const existingTrophy = player.trophies.find(existingTrophy => existingTrophy.name === trophy.name);
        if (existingTrophy) {
            existingTrophy.count++;
        } else {
            let newCat = { category: trophy.category, name: trophy.name, count: 1 }
            player.trophies.push(newCat);
        }
    }
});


// sort trophies by importance
const categoryOrder = ['pt', 'en', 'champ', 'world', 'euro'];

function compareCategories(a, b) {
    return categoryOrder.indexOf(a) - categoryOrder.indexOf(b);
}

function compareNames(a, b) {
    if (a.includes('Bracket') && !b.includes('Bracket')) return 1;
    if (!a.includes('Bracket') && b.includes('Bracket')) return -1;
    if (a.includes('Predict') && !b.includes('Predict')) return 1;
    if (!a.includes('Predict') && b.includes('Predict')) return -1;
    return a.localeCompare(b);
}

players.forEach(player => {
    player.trophies.sort((a, b) => {
        const categoryComparison = compareCategories(a.category, b.category);
        if (categoryComparison !== 0) return categoryComparison;
        return compareNames(a.name, b.name);
    });
});






data = {}
data.players = players;
data.trophies = trophies;
localStorage.setItem('fantasy', JSON.stringify(data));
