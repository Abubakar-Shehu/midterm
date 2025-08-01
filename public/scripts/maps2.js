// Load Google Maps JavaScript API
(g => {
  var h, a, k, p = "The Google Maps JavaScript API", c = "google", l = "importLibrary", q = "__ib__", m = document, b = window;
  b = b[c] || (b[c] = {});
  var d = b.maps || (b.maps = {}), r = new Set, e = new URLSearchParams,
    u = () => h || (h = new Promise(async (f, n) => {
      await (a = m.createElement("script"));
      e.set("libraries", [...r] + "");
      for (k in g) e.set(k.replace(/[A-Z]/g, t => "_" + t[0].toLowerCase()), g[k]);
      e.set("callback", c + ".maps." + q);
      a.src = `https://maps.${c}apis.com/maps/api/js?` + e;
      d[q] = f;
      a.onerror = () => h = n(Error(p + " could not load."));
      a.nonce = m.querySelector("script[nonce]")?.nonce || "";
      m.head.append(a);
    }));
  d[l] ? console.warn(p + " only loads once. Ignoring:", g) : d[l] = (f, ...n) => r.add(f) && u().then(() => d[l](f, ...n));
})({
  key: window.apiKey, // your API key
  v: "weekly"
});

async function initMaps() {
  const { Map } = await google.maps.importLibrary("maps");

  const allCoords = {
    // Home page specific
    map1: { lat: 43.6532, lng: -79.3832 },  // Toronto
    map2: { lat: 40.7128, lng: -74.0060 },  // New York
    map3: { lat: 51.5074, lng: -0.1278 },  // London
    map4: { lat: 35.6895, lng: 139.6917 }  // Tokyo
  };

  for (const id in allCoords) {
    const el = document.getElementById(id);
    if (el) {
      new Map(el, {
        center: allCoords[id],
        zoom: 8
      });
    }
  }
}

function saveFavorite(mapNumber) {
  fetch('/api/save-favorite', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ favoriteMap: mapNumber })
  })
    .then(res => res.json())
    .then(data => {
      console.log('Saved favorite:', data);
      alert(`Map ${mapNumber} saved as your favorite!`);
    })
    .catch(err => {
      console.error('Error saving favorite map:', err);
    });
}
document.addEventListener('DOMContentLoaded', () => {
  for (let i = 1; i <= 4; i++) {
    const btn = document.querySelector(`#map-wrapper-${i} .favorite-btn`);
    if (btn) {
      btn.addEventListener('click', () => saveFavorite(i));
    }
  }
});


initMaps();


