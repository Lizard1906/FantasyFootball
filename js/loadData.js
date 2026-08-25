async function loadData() {

    let trophies;
    let players;

    try {
        const [trophiesResponse, playersResponse] = await Promise.all([
            fetch('data/trophies.json'),
            fetch('data/players.json')
        ]);

        [trophies, players] = await Promise.all([
            trophiesResponse.json(),
            playersResponse.json()
        ]);


    } catch (error) {
        console.error(error);
    }

    players.forEach(player => {
        player.trophies = [];
    });

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

            /*
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
                            check: (real, predict, t) => predict > 5 && real > 5 && ["Benfica", "Sporting", "Porto", "Braga", "Vitória SC"].includes(t),
                            points: 10,
                            description: 'Big 5 miss the Top 5'
                        },
                        {
                            check: (real, predict, t) => predict > 3 && real > 3 && ["Benfica", "Sporting", "Porto"].includes(t),
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

            */


            // SAME SCORING RULES FOR ALL BATTLES
            /*
                N = number of teams in the tournament
                For each team:
                - points = N - abs(realPlace - predictPlace)
            */
            let realTable = trophy.standings[0];
            let new_standings = [];
            let numberOfTeams = realTable.predict.length;

            let realPlace, predictPlace, points_scored;

            for (let i = 1; i < trophy.standings.length; i++) {
                new_predict = [];
                trophy.standings[i].predict.forEach((t, index) => {

                    realPlace = realTable.predict.indexOf(t) + 1;
                    predictPlace = index + 1;

                    points_scored = numberOfTeams - Math.abs(realPlace - predictPlace);

                    new_predict.push({ team: t, realPlace: realPlace, points: points_scored });
                });
                new_standings.push({ player: i, predict: new_predict });
            }
            trophy.standings = new_standings;

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
                let newCat = { category: trophy.category, name: trophy.name, count: 1, level: trophy.level }
                player.trophies.push(newCat);
            }
        }
    });


    // sort trophies by importance
    const categoryOrder = ['pt', 'en', 'ucl', 'uel', 'world', 'euro', 'africa'];

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
        if (a.includes('Battle') && !b.includes('Battle')) return 1;
        if (!a.includes('Battle') && b.includes('Battle')) return -1;
        if (a.includes('League') && !b.includes('League')) return -1;
        if (!a.includes('League') && b.includes('League')) return 1;
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
    console.log('Data:', data);
    localStorage.setItem('fantasy', JSON.stringify(data));

}

loadData();
