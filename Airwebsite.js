document.addEventListener('DOMContentLoaded', function() {
    // Initialize the main display map
    var mainMap = L.map('map').setView([37.7749, -122.4194], 13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '© OpenStreetMap contributors'
    }).addTo(mainMap);

    // Initialize the form map
    var formMap = L.map('locationMap').setView([37.7749, -122.4194], 13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '© OpenStreetMap contributors'
    }).addTo(formMap);

    // Marker variable for the form map
    var formMarker;

    // Event listener for selecting location on the form map
    formMap.on('click', function(e) {
        var lat = e.latlng.lat;
        var lng = e.latlng.lng;

        if (formMarker) {
            formMarker.setLatLng(e.latlng);
        } else {
            formMarker = L.marker(e.latlng, {draggable: true}).addTo(formMap);
        }

        // Store the coordinates in hidden form fields
        document.getElementById('latitude').value = lat;
        document.getElementById('longitude').value = lng;
    });

    // Handling form submission
    document.getElementById('dataForm').addEventListener('submit', function(e) {
        e.preventDefault();

        var latitude = document.getElementById('latitude').value;
        var longitude = document.getElementById('longitude').value;
		var dataMeasured = document.getElementById('dataMeasured').value; // Get the data measured value
		
        if (!latitude || !longitude) {
            alert("Please select a location on the form map.");
            return; // Stop the function if no location is selected
        }

        // Create a marker on the main map using the coordinates
        L.marker([latitude, longitude], {draggable: true})
            .addTo(mainMap)
            .bindPopup(`<strong></strong> ${dataMeasured}`)
            .openPopup();

        alert('Data submitted! Thank you.');

        // Clear the form fields or reset the form
        document.getElementById('dataForm').reset(); // Optional: Reset the form
    });
});
