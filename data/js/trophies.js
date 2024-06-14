// trophies.js


document.addEventListener('DOMContentLoaded', function () {

    data = JSON.parse(localStorage.getItem('fantasy'))
    let players = data.players;
    console.log(players)

    let trophies = data.trophies;
    console.log(trophies)

    let seasons = [];
    trophies.forEach(trophy => {
        if (!seasons.includes(trophy.date)) {
            seasons.push(trophy.date);
        }
    })
    console.log(seasons)

    //adicionar anos
    const trophiesYearRow = document.getElementById('trophies-year-row');

    seasons.forEach(season => {
        const seasonDiv = document.createElement('div');
        seasonDiv.id = season;
        seasonDiv.className = 'info-trophies-year p-0 col-12';
        seasonDiv.innerHTML = `
            <div class="container">
                <div class="row">
                    <div class="year-label">${season - 1}/${season}</div>
                </div>
                <div class="row">
                    <div class="col trophies p-3">
                        <!-- Lista de troféus -->
                    </div>
                </div>
                <div class="row">
                </div>
            </div>
            `;

        trophiesYearRow.appendChild(seasonDiv);
    });


    //adicionar trofeus

    seasons.forEach(season => {
        const seasonDiv = document.getElementById(season);
        const trophiesDiv = seasonDiv.querySelector('.trophies');

        let html = '<div class="row">';
        trophies.forEach(trophy => {
            if (trophy.date === season) {
                html += `
              <div class="col-lg-2 col-md-3 col-sm-4 col-6 p-3">
                <a href="trophyDetails.html?id=${trophy.id}">
                    <img src="data/images/trophies/${trophy.code}.png" title="${trophy.name}" class="trophy-img">
                </a>
            </div>
            `;
            }
        });
        html += '</div>';
        trophiesDiv.innerHTML = html;

    });

});

