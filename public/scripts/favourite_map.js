async function saveFavorite(mapNumber) {
  try {
    const response = await fetch('/api/save-favorite', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ favoriteMap: mapNumber })  // <-- match backend key
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
