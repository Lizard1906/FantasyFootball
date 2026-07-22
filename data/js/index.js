// script.js


document.addEventListener('DOMContentLoaded', function () {

  const data = JSON.parse(localStorage.getItem('fantasy'));
  const players = data.players;

  const playerRow = document.getElementById('players-row');

  const championsWithTrophies = players.filter(player => player.trophies.length > 0);

  const trophyLevels = [
    { id: "all", label: "All" },
    { id: "major", label: "Major" },
    { id: "cup", label: "Cup" },
    { id: "predict", label: "Predict" },
    { id: "bracket", label: "Bracket" },
    { id: "battle", label: "Battle" },
    { id: "challenge", label: "Challenge" },
    { id: "draft", label: "Draft" },
    { id: "chips", label: "Chips" }
  ];

  let currentFilters = ["all"];

  const filterContainer = document.getElementById("trophy-filter");

  trophyLevels.forEach(type => {
    filterContainer.insertAdjacentHTML("beforeend", `
    <label class="filter-chip">
      <input type="checkbox" value="${type.id}" ${type.id === "all" ? "checked" : ""}>
      <span>${type.label}</span>
    </label>
  `);
  });

  filterContainer.addEventListener("change", e => {

    const selected = [...filterContainer.querySelectorAll("input:checked")]
      .map(input => input.value);

    // Se escolher All, limpa os outros
    if (e.target.value === "all") {

      filterContainer.querySelectorAll("input").forEach(input => {
        input.checked = input.value === "all";
      });

      currentFilters = ["all"];
    }
    else {

      // Desmarca All quando escolhe outra coisa
      filterContainer.querySelector('input[value="all"]').checked = false;

      currentFilters = selected.filter(f => f !== "all");

      // Se não há nenhum selecionado, volta ao All
      if (currentFilters.length === 0) {
        filterContainer.querySelector('input[value="all"]').checked = true;
        currentFilters = ["all"];
      }
    }

    renderPlayers();
  });

  function renderPlayers() {
    playerRow.innerHTML = "";

    championsWithTrophies.forEach(player => {

      const trophiesToShow = currentFilters.includes("all")
        ? player.trophies
        : player.trophies.filter(t => currentFilters.includes(t.level));

      if (trophiesToShow.length === 0) return;

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

      trophiesToShow.forEach(trophy => {
        const trophyItem = document.createElement('div');
        trophyItem.className = 'trophy-item';

        const trophies = `<img src="data/images/trophies/${trophy.name}.png" class="mini-trophy">`.repeat(trophy.count);

        trophyItem.innerHTML = `
        <img src="data/images/competitions/categ/${trophy.category}.jpg" alt="${trophy.name}" class="category-img">
        <span class="category-details">${trophy.name}</span>
        <div class="trophy-icons">
          ${trophies}
        </div>
      `;

        trophyList.appendChild(trophyItem);
      });
    });

    // animação
    document.querySelectorAll('.info-player').forEach((card, index) => {
      setTimeout(() => {
        card.style.opacity = 1;
        card.style.transform = 'translateY(0)';
        card.style.display = 'block';
      }, 100 * index);
    });
  }

  renderPlayers();
});
