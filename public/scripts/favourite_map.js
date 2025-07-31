async function saveFavorite(mapNumber) {
  try {
    // Send favorite to backend API
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

// make a then catch file
// make a try catch file
