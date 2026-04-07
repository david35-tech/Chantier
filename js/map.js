let map = null;
let marker = null;

function showMap(lat, lon) {
  const mapDiv = document.getElementById("map");
  mapDiv.style.display = "block";

  if (!map) {
    map = L.map('map').setView([lat, lon], 16);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '© OpenStreetMap'
    }).addTo(map);

    marker = L.marker([lat, lon]).addTo(map);

  } else {
    map.setView([lat, lon], 16);
    marker.setLatLng([lat, lon]);
  }
}
