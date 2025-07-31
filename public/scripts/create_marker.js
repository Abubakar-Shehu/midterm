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
  key: window.apiKey, // your API key
  v: "weekly",
});

async function initMap() {
  const { Map } = await google.maps.importLibrary("maps");
  const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");

  const response = await fetch('/api/maps');
  const { maps } = await response.json();

  const mapCoord = {};
  maps.forEach((location) => {
  const { longitude, latitude, id } = location;
    mapCoord[id] = {
      lat: parseFloat(latitude),
      lng: parseFloat(longitude)
    };
  })

  const center = mapCoord[window.mapId];

  const mapDiv = document.getElementById('map');

  const contentMap = new Map(mapDiv, {
    center: center,
    zoom: 14,
    mapId: "DEMO_MAP_ID"
  });

  contentMap.addListener('click', function(event) {
    const marker = new google.maps.Marker({
      position: event.latLng,
      map: contentMap
    });

    // Create an InfoWindow with a form
    const infoWindow = new google.maps.InfoWindow({
      content: `
        <div>
          <label for="marker-info">Marker Info:</label>
          <input id="marker-title" type="text" placeholder="Title" />
          <input id="marker-description" type="text" placeholder="Description" />
          <input id="marker-image" type="text" placeholder="Image Link" />
          <button id="save-marker-info">Save</button>
        </div>
      `
    });

    infoWindow.open(contentMap, marker);

    google.maps.event.addListenerOnce(infoWindow, 'domready', function() {
      document.getElementById('save-marker-info').onclick = function() {
        const description = document.getElementById('marker-description').value;
        const title = document.getElementById('marker-title').value;
        const image = document.getElementById('marker-image').value;
        const latitude = marker.getPosition().lat();
        const longitude = marker.getPosition().lng();

        fetch('/api/markers', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            mapId: window.mapId,
            latitude,
            longitude,
            description,
            title,
            image
          })
        })
        .then(res => res.json())
        .then(data => {
          infoWindow.setContent(`<div><strong>Info:</strong> ${description}</div>`);

        })
        .catch(err => {
          infoWindow.setContent('<div style="color:red;">Error saving marker!</div>');
        });

      };
    });
  });
}

initMap();
