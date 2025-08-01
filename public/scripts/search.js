$(document).ready(() => {
  $('#featured-maps').show();
  $('#search-result-container').hide();
  $('#create-map-btn').hide();

  $('#city-search-form').on('submit', function (e) {
    e.preventDefault();
    const city = $('#city-input').val().trim().toLowerCase();
    const coords = window.cityCoords[city];

    if (!coords) {
      alert("City not found.");
      return;
    }

    $('#featured-maps').hide();
    $('#search-result-container').show();
    $('#create-map-btn').show().data('city', city);

    if (!window.map) {
      window.map = new google.maps.Map(document.getElementById("searched-map"), {
        center: coords,
        zoom: 10
      });

      window.marker = new google.maps.Marker({
        position: coords,
        map: window.map,
        title: city
      });
    } else {
      window.map.setCenter(coords);
      window.marker.setPosition(coords);
      window.marker.setTitle(city);
    }
  });

  $('#back-button').on('click', function () {
    $('#search-result-container').hide();
    $('#featured-maps').show();
    $('#city-input').val('');
    $('#create-map-btn').hide();
  });

  $(document).on('click', '#create-map-btn', function () {
    const city = $(this).data('city');
    const coords = window.cityCoords[city];

    if (!coords || !window.currentUserId) {
      alert('Missing data to create map.');
      return;
    }

    fetch('/api/maps', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userId: window.currentUserId,
        name: city,
        latitude: coords.lat,
        longitude: coords.lng
      })
    })
    .then(res => res.json())
    .then(data => {
      if (data.mapId) {
        window.location.href = `/create/${data.mapId}`;
      } else {
        alert('Failed to create map.');
      }
    })
    .catch(err => {
      console.error(err);
      alert('Error creating map.');
    });
  });
});
