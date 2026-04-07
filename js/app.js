const state = {
  chantiers: []
};

document.getElementById("formChantier").addEventListener("submit", e => {
  e.preventDefault();

  const chantier = {
    nom: chantierNom.value,
    client: chantierClient.value,
    adresse: chantierAdresse.value,
    gps: chantierGPS.value,
    montant: Number(chantierMontant.value)
  };

  state.chantiers.push(chantier);
  renderChantiers();
  e.target.reset();
  document.getElementById("map").style.display = "none";
});

function renderChantiers() {
  const tbody = document.querySelector("#tableChantiers tbody");
  tbody.innerHTML = "";

  state.chantiers.forEach(c => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${c.nom}</td>
      <td>${c.client}</td>
      <td>${c.adresse}</td>
      <td>${c.gps}</td>
      <td>${c.montant} €</td>
    `;
    tbody.appendChild(tr);
  });
}
