function saveFavorite(mapNumber) {
  localStorage.setItem('favoriteMap', mapNumber);
  alert(`Map ${mapNumber} saved as your favorite!`);
}

async function initMaps() {
  const { Map } = await google.maps.importLibrary("maps");

  const coords = [
    { lat: 43.6532, lng: -79.3832 }, // Toronto
    { lat: 40.7128, lng: -74.0060 }, // New York
    { lat: 51.5074, lng: -0.1278 },  // London
    { lat: 35.6895, lng: 139.6917 }  // Tokyo
  ];
// this is the favorite map number from localStorage
  const favoriteMap = localStorage.getItem('favoriteMap');

  for (let i = 1; i <= 4; i++) {
    const mapDiv = document.getElementById(`map${i}`);
    if (mapDiv) {
      const map = new Map(mapDiv, {
        center: coords[i - 1],
        zoom: favoriteMap == i ? 12 : 8,  // Zoom more for favorite
      });

      mapDiv.style.border = favoriteMap == i ? '3px solid red' : 'none';
    }
  }
}

document.addEventListener('DOMContentLoaded', initMaps);
