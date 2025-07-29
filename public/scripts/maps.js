// // Loading the google map javascript library
// (g => { var h, a, k, p = "The Google Maps JavaScript API", c = "google", l = "importLibrary", q = "__ib__", m = document, b = window; b = b[c] || (b[c] = {}); var d = b.maps || (b.maps = {}), r = new Set, e = new URLSearchParams, u = () => h || (h = new Promise(async (f, n) => { await (a = m.createElement("script")); e.set("libraries", [...r] + ""); for (k in g) e.set(k.replace(/[A-Z]/g, t => "_" + t[0].toLowerCase()), g[k]); e.set("callback", c + ".maps." + q); a.src = `https://maps.${c}apis.com/maps/api/js?` + e; d[q] = f; a.onerror = () => h = n(Error(p + " could not load.")); a.nonce = m.querySelector("script[nonce]")?.nonce || ""; m.head.append(a) })); d[l] ? console.warn(p + " only loads once. Ignoring:", g) : d[l] = (f, ...n) => r.add(f) && u().then(() => d[l](f, ...n)) })({
//   key: process.env.API_KEY, //My API KEY
//   v: "weekly",
//   // Use the 'v' parameter to indicate the version to use (weekly, beta, alpha, etc.).
//   // Add other bootstrap parameters as needed, using camel case.
// });

// // Variable where map is stored
// let map;

// async function initMap() {
//   // object containing the map library
//   const { Map } = await google.maps.importLibrary("maps");

//   map = new Map(document.getElementById("map"), {
//     // Random longitude latitude, would need to be dynamic for multiple users
//     center: { lat: -34.397, lng: 150.644 },
//     zoom: 8,
//   });
// }

// // Calling of the initialising the map
// module.exports = initMap;


$(() => {
  fetch('/api/maps')
  .then(response => response.text())
  .then(script => {
    const scriptElement = document.createElement('script');
    scriptElement.innerHTML = script;
    document.body.appendChild(scriptElement);
  });
});