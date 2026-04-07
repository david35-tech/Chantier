const adresseInput = document.getElementById("chantierAdresse");
const gpsInput = document.getElementById("chantierGPS");
const suggestionsBox = document.getElementById("adresseSuggestions");

let debounceTimer = null;

adresseInput.addEventListener("input", () => {
  const query = adresseInput.value.trim();

  clearTimeout(debounceTimer);

  if (query.length < 3) {
    suggestionsBox.innerHTML = "";
    return;
  }

  debounceTimer = setTimeout(() => {
    fetch(`https://api-adresse.data.gouv.fr/search/?q=${encodeURIComponent(query)}&limit=5`)
      .then(res => res.json())
      .then(data => {
        suggestionsBox.innerHTML = "";

        data.features.forEach(feature => {
          const item = document.createElement("button");
          item.className = "list-group-item list-group-item-action";
          item.textContent = feature.properties.label;

          item.addEventListener("click", () => {
            const label = feature.properties.label;
            const lat = feature.geometry.coordinates[1];
            const lon = feature.geometry.coordinates[0];

            adresseInput.value = label;
            gpsInput.value = `${lat}, ${lon}`;
            suggestionsBox.innerHTML = "";

            showMap(lat, lon);
          });

          suggestionsBox.appendChild(item);
        });
      })
      .catch(err => {
        console.error("Erreur API Adresse :", err);
      });
  }, 300);
});

// Fermer suggestions si clic ailleurs
document.addEventListener("click", (e) => {
  if (!adresseInput.contains(e.target)) {
    suggestionsBox.innerHTML = "";
  }
});
