// trophies.js


document.addEventListener('DOMContentLoaded', function () {
    const data = JSON.parse(localStorage.getItem('fantasy'));
    const players = data.players;
    const trophies = data.trophies;
    
    const seasons = [...new Set(trophies.map(trophy => trophy.date))];
    
    const container = document.querySelector('.container');
    const timelineDiv = document.createElement('div');
    timelineDiv.className = 'season-timeline';
    
    seasons.forEach((season, index) => {
        const seasonNav = document.createElement('div');
        seasonNav.className = 'season-nav-item' + (index === 0 ? ' active' : '');
        seasonNav.textContent = `${season-1}/${season}`;
        seasonNav.dataset.season = season;
        seasonNav.addEventListener('click', function() {
            document.querySelectorAll('.season-nav-item').forEach(item => item.classList.remove('active'));
            this.classList.add('active');
            
            // Scroll to the selected season
            const targetSeason = document.getElementById(`season-${season}`);
            if (targetSeason) {
                targetSeason.scrollIntoView({ behavior: 'smooth' });
            }
        });
        
        timelineDiv.appendChild(seasonNav);
    });
    
    container.insertBefore(timelineDiv, document.getElementById('trophies-year-row'));
    
    const trophiesYearRow = document.getElementById('trophies-year-row');
    trophiesYearRow.innerHTML = '';
    
    seasons.forEach(season => {
        const seasonTrophies = trophies.filter(trophy => trophy.date === season);
        
        const seasonDiv = document.createElement('div');
        seasonDiv.id = `season-${season}`;
        seasonDiv.className = 'col-12 mb-5';
        
        seasonDiv.innerHTML = `
            <div class="info-trophies-year">
                <div class="season-header p-4">
                    <h2 class="year-label">${season-1}/${season}</h2>
                </div>
                <div class="trophies-container">
                    <div class="row trophy-grid"></div>
                </div>
            </div>
        `;
        
        trophiesYearRow.appendChild(seasonDiv);
        
        const trophyGrid = seasonDiv.querySelector('.trophy-grid');
        
        seasonTrophies.forEach(trophy => {
            const trophyCol = document.createElement('div');
            trophyCol.className = 'col-lg-2 col-md-3 col-sm-4 col-6';
            
            trophyCol.innerHTML = `
                <a href="trophyDetails?${trophy.id}" class="text-decoration-none">
                    <div class="trophy-card">
                        <img src="data/images/trophies/${trophy.code}.png" alt="${trophy.name}" class="trophy-img">
                        <div class="trophy-overlay">${trophy.name}</div>
                    </div>
                </a>
            `;
            
            trophyGrid.appendChild(trophyCol);
        });
    });

});

