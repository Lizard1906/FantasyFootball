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
AVS="AVS"; ALV="FC Alverca"; FCA="Arouca"; SLB="Benfica"; BFC="Boavista"; CPI = "Casa Pia", GDEP = "Estoril"; FCEA="Estrela"; FCF="Famalicão"; SCF="Farense"; GVFC="Gil Vicente"; MFC="Moreirense"; CDN="Nacional"; FCP="Porto"; RAFC="Rio Ave"; GDSC="Santa Clara"; SCB="Braga"; SCP="Sporting"; CDT="Tondela"; VSC="Vitória SC"
// siglas equipas UCL
AJA="Ajax"; ARS="Arsenal"; ATA="Atalanta"; ATH="Athletic Club"; ATM="Atlético Madrid"; AVI="Aston Villa"; BAR="Barcelona"; BAY="Bayern München"; BRE="Brest"; BRU="Club Brugge"; BOD="Bodø / Glimt"; BOL="Bolonha"; CEL="Celtic"; CHE="Chelsea"; COP="Copenhagen"; CZV="Crvena Zvezda"; DOR="Borussia Dortmund"; DZG="D. Zagreb"; FEY="Feyenoord"; FRA="Eintracht Frankfurt"; GAL="Galatasaray"; GIR="Girona"; INT="Internazionale"; JUV="Juventus"; KAI="Kairat"; LEV="Bayer Leverkusen"; LIV="Liverpool"; LOSC="Lille"; LPZ="Leipzig"; MAR="Marselha"; MCI="Manchester City"; MIL="Milan"; MON="Monaco"; NAP="Napoli"; NEW="Newcastle United"; OLY="Olympiakos"; PAF="Pafos"; PSG="PSG"; PSV="PSV"; QAR="Qarabağ"; RMA="Real Madrid"; SHK="Shakhtar"; SLA="Slavia"; SLO="Slovan Bratislava"; SPA="Sparta Praha"; STT="Estugarda"; STU="Sturm Graz"; SZB="Salzburg"; TOT="Tottenham Hotspur"; USG="Union Saint-Gilloise"; VIL="Villarreal"; YB="Young Boys";

const trophies = [
    // 2022-23
    { id: 'wc22', code: 'wc22', date: 2023, name: 'World Cup', category: 'world', data: [{ pos: 1, player: 1, points: null }, { pos: 2, player: 2, points: null }], finished: true },
    { id: 'pt23', code: 'ptbwin', date: 2023, name: 'Liga Portugal', category: 'pt', data: [{ pos: 1, player: 1, points: 2207 }, { pos: 2, player: 2, points: 2201 }], finished: true },
    { id: 'en23', code: 'premier', date: 2023, name: 'Premier League', category: 'en', data: [{ pos: 1, player: 2, points: 2581 }, { pos: 2, player: 1, points: 2552 }], finished: true },
    { id: 'ucl23', code: 'champions', date: 2023, name: 'Champions League', category: 'ucl', data: [{ pos: 1, player: 2, points: 903 }, { pos: 2, player: 1, points: 880 }, { pos: 3, player: 3, points: 165 }], finished: true },
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
        id: 'ucl24', code: 'champions', date: 2024, name: 'Champions League', category: 'ucl',
        graph: [
            { player: 1, color: 'red', evolution: [66, 104, 156, 247, 307, 340, 397, 474, 515, 568, 614, 660, 730] },
            { player: 2, color: 'green', evolution: [62, 106, 171, 244, 328, 390, 439, 509, 552, 602, 644, 683, 752] },
        ],
        finished: true
    },
    {
        id: 'ucl24predict', code: 'uclpredictor', date: 2024, name: 'Champions Predict', category: 'ucl',
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
        id: 'pt25battle', code: 'ptbattle', date: 2025, name: 'Portugal Battle', category: 'pt',
        standings: [
            { player: 0, predict: ["Sporting", "Benfica", "Porto", "Braga", "Santa Clara", "Vitória SC", "Famalicão", "Estoril", "Casa Pia", "Moreirense", "Rio Ave", "Arouca", "Gil Vicente", "Nacional", "Estrela", "AVS", "Farense", "Boavista"]},
            { player: 1, predict: [SLB, SCP, FCP, SCB, VSC, FCF, MFC, RAFC, FCA, BFC, FCEA, SCF, GDEP, CPI, AVS, GVFC, CDN, GDSC]},
            { player: 2, predict: [SLB, SCP, FCP, SCB, VSC, FCF, RAFC, SCF, FCA, GDEP, GDSC, CPI, MFC, FCEA, CDN, GVFC, AVS, BFC]},
        ],
        source: {name: 'SAPO Desporto', url: 'https://desporto.sapo.pt/futebol/competicao/primeira-liga-2/classificacao', update: '2025-05-20 10:20:26.639904'},
        finished: true
    },
    {
        id: 'en25', code: 'premier', date: 2025, name: 'Premier League', category: 'en',
        graph: [
            { player: 1, color: 'red', evolution: [68, 126, 181, 214, 267, 343, 409, 451, 515, 561, 617, 693, 781, 833, 881, 925, 1013, 1069, 1131, 1196, 1254, 1293, 1367, 1482, 1574, 1645, 1702, 1765, 1828, 1898, 1942, 2032, 2094, 2150, 2199, 2236, 2278, 2336] },
            { player: 2, color: 'green', evolution: [54, 122, 173, 242, 296, 352, 391, 436, 479, 517, 584, 629, 665, 710, 757, 809, 844, 895, 976, 1041, 1120, 1158, 1234, 1362, 1470, 1539, 1596, 1658, 1730, 1789, 1854, 1935, 1989, 2045, 2103, 2138, 2176, 2241] },
        ],
        finished: true
    },
    {
        id: 'en25draft', code: 'endraft', date: 2025, name: 'English Draft', category: 'en',
        data: [{ pos: 1, player: 1, V: 21, score: 2006 }, { pos: 2, player: 2, V: 16, score: 1779 }], 
        finished: true
    },
    {
        id: 'en25cup', code: 'emirates', date: 2025, name: 'Emirates Cup', category: 'en',
        data: [
            { pos: 1, player: 2, points: 65 },
            { pos: 2, player: 1, points: 58 },
        ],
        finished: true
    },
    {
        id: 'ucl25', code: 'champions', date: 2025, name: 'Champions League', category: 'ucl',
        graph: [
            { player: 1, color: 'red', evolution: [95, 182, 259, 319, 391, 457, 540, 628, 727, 795, 852, 917, 1004, 1065, 1120, 1181, 1262] },
            { player: 2, color: 'green', evolution: [86, 149, 218, 311, 404, 463, 542, 637, 709, 794, 862, 940, 1044, 1107, 1163, 1220, 1303] },
        ],
        finished: true
    },
    {
        id: 'ucl25predict', code: 'uclpredictor', date: 2025, name: 'Champions Predict', category: 'ucl',
        graph: [
            { player: 1, color: 'red', evolution: [22, 50, 87, 102, 143, 169, 185, 215, 252, 267, 292, 315, 373, 426, 454, 497, 515] },
            { player: 2, color: 'green', evolution: [28, 51, 99, 122, 152, 177, 179, 212, 256, 266, 299, 349, 458, 501, 531, 589, 613] },
        ],
        finished: true
    },
    {
        id: 'ucl25bracket', code: 'uclbracket', date: 2025, name: 'Champions Bracket', category: 'ucl',
        data: [
            { pos: 1, player: 2, points: 56 },
            { pos: 2, player: 1, points: 48 },
        ],
        finished: true
    },
    {
        id: 'ucl25battle', code: 'uclbattle', date: 2025, name: 'Champions Battle', category: 'ucl',
        standings: [
            { player: 0, predict: ["Liverpool", "Barcelona", "Arsenal", "Internazionale", "Atlético Madrid", "Bayer Leverkusen", "Lille", "Aston Villa", "Atalanta", "Borussia Dortmund", "Real Madrid", "Bayern München", "Milan", "PSV", "PSG", "Benfica", "Monaco", "Brest", "Feyenoord", "Juventus", "Celtic", "Manchester City", "Sporting", "Club Brugge", "D. Zagreb", "Estugarda", "Shakhtar", "Bolonha", "Crvena Zvezda", "Sturm Graz", "Sparta Praha", "Leipzig", "Girona", "Salzburg", "Slovan Bratislava", "Young Boys"]},
            { player: 1, predict: [BAR, MCI, RMA, BAY, PSG, ARS, LIV, SLB, SCP, MIL, INT, DOR, ATM, LPZ, JUV, ATA, AVI, LEV, FEY, STT, PSV, CEL, SHK, SZB, GIR, STU, BOL, CZV, DZG, YB, MON, LOSC, BRE, BRU, SPA, SLO]},
            { player: 2, predict: [BAR, RMA, MCI, BAY, LIV, JUV, PSG, SCP, ATA, INT, AVI, DOR, MIL, LEV, ATM, ARS, SLB, CEL, STT, GIR, FEY, LPZ, SZB, PSV, MON, BOL, LOSC, SHK, BRE, STU, YB, CZV, DZG, BRU, SPA, SLO]},
        ],
        source: {name: 'SAPO Desporto', url: 'https://desporto.sapo.pt/futebol/competicao/uefa-champions-league-6/classificacao', update: '2025-02-16 23:11:21.989854'},
        finished: true
    },
    {
        id: 'uel25predict', code: 'uelpredictor', date: 2025, name: 'Europa Predict', category: 'uel',
        graph: [    // vamos fingir que os playoffs so tiveram 1 jogo
            { player: 1, color: 'red', evolution: [37, 37, 72, 109, 139, 165, 202, 233, 257, 295, 356, 470, 528, 534] },
            { player: 2, color: 'green', evolution: [47, 73, 108, 145, 194, 215, 253, 297, 322, 360, 439, 546, 588, 618] },
        ],
        finished: true
    },
    {
        id: 'uel25bracket', code: 'uelbracket', date: 2025, name: 'Europa Bracket', category: 'uel',
        data: [
            { pos: 1, player: 2, points: 33 },
            { pos: 2, player: 1, points: 30 },
        ],
        finished: true
    },
    {
        id: 'cwc25', code: 'cwc', date: 2025, name: 'Club World Cup', category: 'world',
        graph: [
            { player: 1, color: 'red', evolution: [55, 105, 185, 272, 349, 417, 473] },
            { player: 2, color: 'green', evolution: [50, 112, 183, 248, 321, 393, 448] },
        ],
        finished: true
    },
    {
        id: 'cwc25bracket', code: 'cwcbracket', date: 2025, name: 'Club World Cup Bracket', category: 'world',
        data: [
            { pos: 1, player: 1, points: 1285 },
            { pos: 2, player: 2, points: 1055 },
        ],
        finished: true
    },
    // 2025-26
    {
        id: 'pt26', code: 'ptbetclic', date: 2026, name: 'Liga Portugal', category: 'pt',
        graph: [
            { player: 1, color: 'red', evolution:   [41, 113, 178, 231, 269, 375, 424, 476, 553, 599, 656] },
            { player: 2, color: 'green', evolution: [57, 140, 204, 271, 321, 378, 431, 471, 527, 573, 614] },
        ],
        finished: false
    },
    {
        id: 'pt26battle', code: 'ptbattle', date: 2026, name: 'Portugal Battle', category: 'pt',
        standings: [
            { player: 0, predict: ["Porto", "Sporting", "Benfica", "Gil Vicente", "Famalicão", "Moreirense", "Braga", "Vitória SC", "Estoril", "Nacional", "Rio Ave", "Santa Clara", "Estrela", "FC Alverca", "Casa Pia", "Arouca", "Tondela", "AVS"]},
            { player: 1, predict: [SLB, FCP, SCP, SCB, VSC, FCF, MFC, GDSC, FCA, RAFC, GDEP, ALV, GVFC, CPI, CDT, FCEA, CDN, AVS]},
            { player: 2, predict: [SCP, SLB, FCP, VSC, SCB, GDEP, FCF, MFC, CPI, GDSC, FCA, GVFC, CDN, CDT, ALV, RAFC, FCEA, AVS]},
        ],
        source: {name: 'SAPO Desporto', url: 'https://desporto.sapo.pt/futebol/competicao/primeira-liga-2/classificacao', update: '2025-11-10 19:22:34.064139'},
        finished: false
    },
    {
        id: 'pt26cup', code: 'ptcup', date: 2026, name: 'Taça de Portugal', category: 'pt',
        data: [
            { pos: 1, player: 1, points: 0 },
            { pos: 2, player: 2, points: 0 },
        ],
        finished: false
    },
    {
        id: 'en26', code: 'premier', date: 2026, name: 'Premier League', category: 'en',
        graph: [
            { player: 1, color: 'red',  evolution: [56, 119, 155, 232, 259, 289, 347, 389, 455, 522, 576] },
            { player: 2, color: 'green', evolution: [43, 94, 146, 211, 255, 282, 361, 404, 444, 498, 530] },
        ],
        finished: false
    },
    {
        id: 'en26challenge', code: 'enchallenge', date: 2026, name: 'English Challenge', category: 'en',
        graph: [
            { player: 1, color: 'red', evolution:   [37, 70, 111, 197, 245, 245, 307, 364, 394, 458, 458] },
            { player: 2, color: 'green', evolution: [52, 92, 132, 132, 187, 237, 300, 359, 411, 477, 497] },
        ],
        finished: false
    },
    {
        id: 'en26cup', code: 'emirates', date: 2026, name: 'Emirates Cup', category: 'en',
        data: [
            { pos: 1, player: 1, points: 0 },
            { pos: 2, player: 2, points: 0 },
        ],
        finished: false
    },
    {
        id: 'ucl26', code: 'champions', date: 2026, name: 'Champions League', category: 'ucl',
        graph: [
            { player: 1, color: 'red', evolution:  [118, 205, 271, 322] },
            { player: 2, color: 'green', evolution: [94, 181, 282, 327] },
        ],
        finished: false
    },
    {
        id: 'ucl26predict', code: 'uclpredictor', date: 2026, name: 'Champions Predict', category: 'ucl',
        graph: [
            { player: 1, color: 'red', evolution:   [73, 153, 207, 269] },
            { player: 2, color: 'green', evolution: [55, 137, 199, 265] },
        ],
        finished: false
    },
    {
        id: 'ucl26bracket', code: 'uclbracket', date: 2026, name: 'Champions Bracket', category: 'ucl',
        data: [
            { pos: 1, player: 2, points: 0 },
            { pos: 2, player: 1, points: 0 },
        ],
        finished: false
    },
    {
        id: 'ucl26battle', code: 'uclbattle', date: 2026, name: 'Champions Battle', category: 'ucl',
        standings: [
            { player: 0, predict: ["Bayern München", "Arsenal", "Internazionale", "Manchester City", "PSG", "Newcastle United", "Real Madrid", "Liverpool", "Galatasaray", "Tottenham Hotspur", "Barcelona", "Chelsea", "Sporting", "Borussia Dortmund", "Qarabağ", "Atalanta", "Atlético Madrid", "PSV", "Monaco", "Pafos", "Bayer Leverkusen", "Club Brugge", "Eintracht Frankfurt", "Napoli", "Olympique Marseille", "Juventus", "Athletic Club", "Union Saint-Gilloise", "Bodø / Glimt", "Slavia", "Olympiakos", "Villarreal", "Copenhagen", "Kairat", "Benfica", "Ajax"]},
            { player: 1, predict: [BAR, LIV, BAY, PSG, INT, ARS, MCI, RMA, TOT, NAP, CHE, NEW, SLB, GAL, JUV, VIL, SCP, ATM, OLY, ATH, ATA, DOR, BOD, PSV, FRA, AJA, COP, LEV, MAR, PAF, BRU, USG, MON, QAR, KAI, SLA]},
            { player: 2, predict: [PSG, BAR, ARS, NAP, RMA, BAY, CHE, LIV, NEW, INT, TOT, MCI, DOR, SLB, ATA, JUV, FRA, ATM, AJA, SCP, BRU, BOD, PSV, ATH, PAF, GAL, COP, MAR, OLY, MON, LEV, VIL, USG, KAI, QAR, SLA]},
        ],
        source: {name: 'SAPO Desporto', url: 'https://desporto.sapo.pt/futebol/competicao/uefa-champions-league-6/classificacao', update: '2025-11-10 19:34:38.407152'},
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

        if (trophy.code === 'ptbattle') {

            const ptbattleScoringRules = {
                accuracy: [
                    {
                        check: (real, predict) => real <= 5 && real === predict,
                        points: 5,
                        description: 'Get the exact position of a team in the Top 5'
                    },
                    {
                        check: (real, predict) => real >= 6 && predict >= 6 && real === predict,
                        points: 10,
                        description: 'Get the exact position of a team outside the Top 5'
                    },
                    {
                        check: (real, predict) => real >= 6 && predict >= 6 && Math.abs(real - predict) === 1,
                        points: 5,
                        description: 'Miss by 1 outside the Top 5'
                    },
                    {
                        check: (real, predict) => real >= 6 && predict >= 6 && Math.abs(real - predict) === 2,
                        points: 3,
                        description: 'Miss by 2 outside the Top 5'
                    },
                    {
                        check: (real, predict) => real >= 6 && predict >= 6 && Math.abs(real - predict) === 3,
                        points: 1,
                        description: 'Miss by 3 outside the Top 5'
                    },
                ],
                bonus: [
                    {
                        check: (real, predict) => real <= 5 && ((1 <= real && real <= 2 && 1 <= predict && predict <= 2) || (3 <= real && real <= 4 && 3 <= predict && predict <= 4) || (real === 5 && predict === 5)),
                        points: 1,
                        description: 'Europen qualification'
                    },
                    {
                        check: (real, predict) => real >= 6 && predict >= 6 && 6 <= real && real <= 10 && 6 <= predict && predict <= 10,
                        points: 3,
                        description: 'First half of the table (6th-10th)'
                    },
                    {
                        check: (real, predict) => real >= 6 && predict >= 6 && 11 <= real && real <= 15 && 11 <= predict && predict <= 15,
                        points: 3,
                        description: 'Second half of the table (11th-15th)'
                    },
                    {
                        check: (real, predict) => real >= 6 && predict >= 6 && 16 <= real && real <= 18 && 16 <= predict && predict <= 18,
                        points: 5,
                        description: 'Relegation zone (16th-18th)'
                    },
                ],
                penalties: [
                    {
                        check: (real, predict) => Math.abs(predict - real) > 5,
                        points: (real, predict) => -(Math.abs(predict - real) - 5),
                        description: 'Miss by 5 or more places'
                    },
                ],
                unlikely: [
                    {
                        check: (real, predict, t) => predict > 5 && real > 5 && [SLB, SCP, FCP, SCB, VSC].includes(t),
                        points: 10,
                        description: 'Big 5 miss the Top 5'
                    },
                    {
                        check: (real, predict, t) => predict > 3 && real > 3 && [SLB, SCP, FCP].includes(t),
                        points: 10,
                        description: 'Big 3 miss the Top 3'
                    },
                ]
            };

            let realTable = trophy.standings[0];
            let new_standings = [];
            for (let i = 1; i < trophy.standings.length; i++) {
                new_predict = [];
                trophy.standings[i].predict.forEach((t, index) => {
                    let points_scored = 0;
                    let realPlace = realTable.predict.indexOf(t) + 1;
                    let predictPlace = index + 1;

                    // Accuracy rules
                    ptbattleScoringRules.accuracy.forEach(rule => {
                        if (rule.check(realPlace, predictPlace)) {
                            points_scored += typeof rule.points === 'function' ? rule.points(realPlace, predictPlace) : rule.points;
                        }
                    });
                    // Bonus
                    ptbattleScoringRules.bonus.forEach(rule => {
                        if (rule.check(realPlace, predictPlace)) {
                            points_scored += typeof rule.points === 'function' ? rule.points(realPlace, predictPlace) : rule.points;
                        }
                    });
                    // Penalties
                    ptbattleScoringRules.penalties.forEach(rule => {
                        if (rule.check(realPlace, predictPlace)) {
                            points_scored += typeof rule.points === 'function' ? rule.points(realPlace, predictPlace) : rule.points;
                        }
                    });
                    // Unlikely
                    ptbattleScoringRules.unlikely.forEach(rule => {
                        if (rule.check(realPlace, predictPlace, t)) {
                            points_scored += typeof rule.points === 'function' ? rule.points(realPlace, predictPlace, t) : rule.points;
                        }
                    });

                    new_predict.push({ team: t, realPlace: realPlace, points: points_scored });
                });
                new_standings.push({ player: i, predict: new_predict });
            }
            trophy.standings = new_standings;

            // REGRAS DE PONTUAÇÃO
            trophy.rules = [
                {
                    category: "Accuracy",
                    rules: ptbattleScoringRules.accuracy.map(r => ({ description: r.description, points: typeof r.points === 'function' ? 'variable' : r.points.toString() }))
                },
                {
                    category: "Bonus",
                    rules: ptbattleScoringRules.bonus.map(r => ({ description: r.description, points: typeof r.points === 'function' ? 'variable' : r.points.toString() }))
                },
                {
                    category: "Penalties",
                    rules: ptbattleScoringRules.penalties.map(r => ({ description: r.description, points: typeof r.points === 'function' ? 'variable' : r.points.toString() }))
                },
                {
                    category: "Unlikely",
                    rules: ptbattleScoringRules.unlikely.map(r => ({ description: r.description, points: typeof r.points === 'function' ? 'variable' : r.points.toString() }))
                }
            ];
        }

        if (trophy.code === 'uclbattle') {
            const uclbattleScoringRules = {
                accuracy: [
                    {
                        check: (real, predict) => real === predict,
                        points: 10,
                        description: 'Get the exact position'
                    },
                    {
                        check: (real, predict) => Math.abs(real - predict) === 1,
                        points: 5,
                        description: 'Miss by 1'
                    },
                    {
                        check: (real, predict) => Math.abs(real - predict) === 2,
                        points: 3,
                        description: 'Miss by 2'
                    },
                    {
                        check: (real, predict) => Math.abs(real - predict) === 3,
                        points: 1,
                        description: 'Miss by 3'
                    }
                ],
                bonus: [
                    {
                        check: (real, predict) => 1 <= real && real <= 8 && 1 <= predict && predict <= 8,
                        points: 10,
                        description: 'Champions League zone (1st-8th)'
                    },
                    {
                        check: (real, predict) => 9 <= real && real <= 16 && 9 <= predict && predict <= 16,
                        points: 5,
                        description: 'Play-offs Top (9th-16th)'
                    },
                    {
                        check: (real, predict) => 17 <= real && real <= 24 && 17 <= predict && predict <= 24,
                        points: 5,
                        description: 'Play-offs Bottom (17th-24th)'
                    },
                    {
                        check: (real, predict) => 25 <= real && real <= 36 && 25 <= predict && predict <= 36,
                        points: 10,
                        description: 'Not qualified (25th-36th)'
                    }
                ],
                penalties: [
                    {
                        check: (real, predict) => Math.abs(predict - real) >= 5,
                        points: (real, predict) => -(Math.abs(predict - real) - 5),
                        description: 'Miss by 5 or more places'
                    }
                ]
            };

            let realTable = trophy.standings[0];
            let new_standings = [];
            for (let i = 1; i < trophy.standings.length; i++) {
                new_predict = [];
                trophy.standings[i].predict.forEach((t, index) => {
                    let points_scored = 0;
                    let realPlace = realTable.predict.indexOf(t) + 1;
                    let predictPlace = index + 1;

                    // Accuracy rules
                    uclbattleScoringRules.accuracy.forEach(rule => {
                        if (rule.check(realPlace, predictPlace)) {
                            points_scored += typeof rule.points === 'function' ? rule.points(realPlace, predictPlace) : rule.points;
                        }
                    });
                    // Bonus
                    uclbattleScoringRules.bonus.forEach(rule => {
                        if (rule.check(realPlace, predictPlace)) {
                            points_scored += typeof rule.points === 'function' ? rule.points(realPlace, predictPlace) : rule.points;
                        }
                    });
                    // Penalties
                    uclbattleScoringRules.penalties.forEach(rule => {
                        if (rule.check(realPlace, predictPlace)) {
                            points_scored += typeof rule.points === 'function' ? rule.points(realPlace, predictPlace) : rule.points;
                        }
                    });

                    new_predict.push({ team: t, realPlace: realPlace, points: points_scored });
                });
                new_standings.push({ player: i, predict: new_predict });
            }
            trophy.standings = new_standings;

            trophy.rules = [
                {
                    category: "Accuracy",
                    rules: uclbattleScoringRules.accuracy.map(r => ({ description: r.description, points: typeof r.points === 'function' ? 'variable' : r.points.toString() }))
                },
                {
                    category: "Bonus",
                    rules: uclbattleScoringRules.bonus.map(r => ({ description: r.description, points: typeof r.points === 'function' ? 'variable' : r.points.toString() }))
                },
                {
                    category: "Penalties",
                    rules: uclbattleScoringRules.penalties.map(r => ({ description: r.description, points: typeof r.points === 'function' ? 'variable' : r.points.toString() }))
                }
            ];
        }

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
const categoryOrder = ['pt', 'en', 'ucl', 'uel', 'world', 'euro'];

function compareCategories(a, b) {
    return categoryOrder.indexOf(a) - categoryOrder.indexOf(b);
}

function compareNames(a, b) {
    if (a.startsWith('World Cup') && b.startsWith('Club World Cup')) return -1;
    if (a.startsWith('Club World Cup') && b.startsWith('World Cup')) return 1;
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
