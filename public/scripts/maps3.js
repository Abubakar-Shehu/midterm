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
    mapLA: { lat: 34.0522, lng: -118.2437 }, // Los Angeles
    mapVan: { lat: 49.2827, lng: -123.1207 }, // Vancouver
    mapChicago: { lat: 41.8781, lng: -87.6298 }, // Chicago
    mapBuenosAires: { lat: -34.6037, lng: -58.3816 },
    mapSãoPaulo: { lat: -23.5505, lng: -46.6333 },
    mapLima: { lat: -12.0464, lng: -77.0428 },
    mapLondon: { lat: 51.5074, lng: -0.1278 },
    mapParis: { lat: 48.8566, lng: 2.3522 },
    mapBerlin: { lat: 52.5200, lng: 13.4050 },
    mapBeijing: { lat: 39.9042, lng: 116.4074 },     // Beijing, China
    mapSeoul: { lat: 37.5665, lng: 126.9780 },       // Seoul, South Korea
    mapBangkok: { lat: 13.7563, lng: 100.5018 },      // Bangkok, Thailand
    mapCairo: { lat: 30.0444, lng: 31.2357 },        // Cairo, Egypt
    mapNairobi: { lat: -1.2921, lng: 36.8219 },      // Nairobi, Kenya
    mapCapeTown: { lat: -33.9249, lng: 18.4241 },   // Cape Town, South Africa
    mapSydney: { lat: -33.8688, lng: 151.2093 },     // Sydney, Australia
    mapAuckland: { lat: -36.8485, lng: 174.7633 },   // Auckland, New Zealand
    mapSuva: { lat: -18.1248, lng: 178.4501 },        // Suva, Fiji
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

initMaps();

