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
                    const winnerImage = trophy.winner ? `data/images/players/${trophy.winner}.jpg` : '';

                    // try to derive player's color from any trophy.graph entry where that player appears
                    function getPlayerColorByName(name) {
                        if (!name) return '';
                        const pIdx = players.findIndex(p => p.name === name);
                        if (pIdx === -1) return '';
                        const playerNumber = pIdx + 1; // graph uses 1-based player numbers
                        for (let t of trophies) {
                            if (t.graph && Array.isArray(t.graph)) {
                                const entry = t.graph.find(g => g.player === playerNumber && g.color);
                                if (entry && entry.color) return entry.color;
                            }
                        }
                        return '';
                    }

                    const playerColor = trophy.winner ? getPlayerColorByName(trophy.winner) : '';

                    // fallback: compute border color from trophy CSS class (if player color not found)
                    let borderColor = '';
                    if (!playerColor && trophy.code) {
                        const probe = document.createElement('div');
                        probe.className = trophy.code;
                        probe.style.position = 'absolute';
                        probe.style.left = '-9999px';
                        document.body.appendChild(probe);
                        const cs = getComputedStyle(probe);
                        borderColor = cs.borderColor || cs.borderBottomColor || cs.backgroundColor || '';
                        document.body.removeChild(probe);
                    }

                    const finalBorder = playerColor || borderColor || 'rgba(255,255,255,0.9)';
                    const badgeStyle = `style="border:2px solid ${finalBorder};"`;
                    const badgeHtml = winnerImage ? `<img src="${winnerImage}" alt="${trophy.winner}" class="trophy-badge" ${badgeStyle}>` : '';

                    trophyCol.innerHTML = `
                        <a href="trophyDetails.html?${trophy.id}" class="text-decoration-none">
                            <div class="trophy-card ${trophy.code}">
                                <img src="data/images/trophies/${trophy.code}.png" alt="${trophy.name}" class="trophy-img">
                                <div class="trophy-overlay">${trophy.name}</div>
                                ${badgeHtml}
                            </div>
                        </a>
                    `;
            
            trophyGrid.appendChild(trophyCol);
        });
    });

});

