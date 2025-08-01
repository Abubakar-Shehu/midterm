async function saveFavorite(mapNumber) {
  try {
    const response = await fetch('/api/save-favorite', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ favoriteMap: mapNumber })
    });

    if (!response.ok) throw new Error('Failed to save favorite');

    alert(`Map ${mapNumber} saved as your favorite!`);
    highlightFavorite(mapNumber);
  } catch (err) {
    console.error(err);
    alert('Error saving favorite map.');
  }
}

function highlightFavorite(mapId) {
  const button = document.getElementById(`favorite-btn-${mapId}`);
  if (button) {
    button.textContent = 'Saved!';
    button.disabled = true;
    button.classList.add('saved');
  }
}

// ✅ NEW: Load and display favourite maps on page load
async function loadFavouriteMaps() {
  try {
    const response = await fetch('/api/user/favorites');
    if (!response.ok) throw new Error('Failed to load favourites');

    const maps = await response.json();
    const container = document.getElementById('maps-container');

    if (!maps.length) {
      container.innerHTML = `<p>You haven't favourited any maps yet.</p>`;
      return;
    }

    // Clear container and add new maps
    container.innerHTML = '';
    maps.forEach((map, index) => {
      const mapDiv = document.createElement('div');
      mapDiv.className = 'map';
      mapDiv.id = `map-wrapper-${index + 1}`;
      mapDiv.innerHTML = `
        <div class="map-overlay" title="Map ${index + 1}">${map.title}</div>
        <div id="map${index + 1}" class="map-inner"></div>
      `;
      container.appendChild(mapDiv);
    });

    // Optional: Call initMap or equivalent to render the actual map tiles
    // if you have a Google Maps init function
    if (typeof initMaps === 'function') initMaps();

  } catch (err) {
    console.error(err);
  }
}

// Run on page load
document.addEventListener('DOMContentLoaded', loadFavouriteMaps);
