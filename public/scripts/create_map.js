(g => {
  var h, a, k, p = "The Google Maps JavaScript API", c = "google", l = "importLibrary", q = "__ib__", m = document, b = window;
  b = b[c] || (b[c] = {});
  var d = b.maps || (b.maps = {}), r = new Set, e = new URLSearchParams,
    u = () => h || (h = new Promise(async (f, n) => {
      await (a = m.createElement("script"));
      e.set("libraries", [...r] + "");
      for (k in g)
        e.set(k.replace(/[A-Z]/g, t => "_" + t[0].toLowerCase()), g[k]);
      e.set("callback", c + ".maps." + q);
      a.src = `https://maps.${c}apis.com/maps/api/js?` + e;
      d[q] = f;
      a.onerror = () => h = n(Error(p + " could not load."));
      a.nonce = m.querySelector("script[nonce]")?.nonce || "";
      m.head.append(a);
    }));
  d[l]
    ? console.warn(p + " only loads once. Ignoring:", g)
    : d[l] = (f, ...n) => r.add(f) && u().then(() => d[l](f, ...n));
})({
  key: "AIzaSyDZP_5baVuXLOyz89W70mja_NN_L7RhwaU", // your API key
  v: "weekly",
});

async function initMaps() {
  try {
    const { Map } = await google.maps.importLibrary("maps");

    const response = await fetch('/api/maps');
    const { maps } = await response.json();

    maps.forEach((location) => {
      const { longitude, latitude, id } = location;

      const mapCoord = {
        lat: parseFloat(longitude),
        lng: parseFloat(latitude)
      };
      console.log(mapCoord)
      const mapDiv = document.getElementById(`map${id}`); // Assuming map divs have IDs like map1, map2, etc.
      if (mapDiv) {
        new Map(mapDiv, {
          center: mapCoord,
          zoom: 8
        });
      }
    });

  } catch (error) {
    console.error('Error fetching map data:', error);
  }
}


initMaps();