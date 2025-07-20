// script.js


document.addEventListener('DOMContentLoaded', function () {

  const data = JSON.parse(localStorage.getItem('fantasy'));
  const players = data.players;

  const playerRow = document.getElementById('players-row');
  
  const championsWithTrophies = players.filter(player => player.trophies.length > 0);

  championsWithTrophies.forEach(player => {
    const playerDiv = document.createElement('div');
    playerDiv.id = player.name;
    playerDiv.className = 'col-lg-6 col-md-12 info-player';
    
    playerDiv.innerHTML = `
      <div class="player-card">
        <div class="player-image-container">
          <img src="data/images/players/${player.name}.jpg" class="player-photo" alt="${player.name}" loading="lazy">
        </div>
        <div class="player-name">${player.name}</div>
        <div class="player-desc">${player.description}</div>
        <div class="trophies">
          <div class="trophy-list"></div>
        </div>
      </div>
    `;

    playerRow.appendChild(playerDiv);
    
    const trophyList = playerDiv.querySelector('.trophy-list');
    
    player.trophies.forEach(trophy => {
      const trophyItem = document.createElement('div');
      trophyItem.className = 'trophy-item';
      trophyItem.innerHTML = `
        <span class="category-details">${trophy.count}</span>
        <img src="data/images/trophies/categ/${trophy.category}.jpg" alt="${trophy.name}" class="category-img">
        <span class="category-details">${trophy.name}</span>
      `;
      
      trophyList.appendChild(trophyItem);
    });
  });

  const playerCards = document.querySelectorAll('.info-player');
  playerCards.forEach((card, index) => {
    setTimeout(() => {
      card.style.opacity = 1;
      card.style.transform = 'translateY(50)';
      card.style.display = 'block';
    }, 100 * index);
  });
});
