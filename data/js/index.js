// script.js


document.addEventListener('DOMContentLoaded', function () {

  data = JSON.parse(localStorage.getItem('fantasy'))
  let players = data.players;

  //adicionar jogadores
  const playerRow = document.getElementById('players-row');

  players.forEach(player => {
    if (player.trophies.length > 0) {
      const playerDiv = document.createElement('div');
      playerDiv.id = player.name;
      playerDiv.className = 'info-player p-4 col-lg-6 col-md-12 col-sm-12';
      playerDiv.innerHTML = `
      <div class="container">
          <div class="row">
              <div class="player-name">${player.name}</div>
              <div class="player-desc"><i>${player.description}</i></div>
          </div>
          <div class="row">
              <div class="col-12 col-lg-6 player p-0">
                  <img src="data/images/players/${player.name}.jpg" class="foto-jogador" alt="Jogador ${player.name}">
              </div>
              <div class="col-12 col-lg-6 trophies p-0">
              </div>
          </div>
      </div>
      `;

      playerRow.appendChild(playerDiv);
    }
  }
  );


  //adicionar trofeus

  players.forEach(player => {
    if (player.trophies.length > 0) {
      const playerDiv = document.getElementById(player.name);
      const trophiesDiv = playerDiv.querySelector('.trophies');

      let html = '';
      player.trophies.forEach(trophy => {
        html += `
              <div style="margin: 5px 0px 0px 5px">
                <span class="category-details">${trophy.count}</span>
                <img src="data/images/trophies/categ/${trophy.category}.jpg" alt="${trophy.name}" class="category-img">
                <span class="category-details">${trophy.name}</span>
              </div>
            `;
      });
      trophiesDiv.innerHTML = html;
    }
  });
});
