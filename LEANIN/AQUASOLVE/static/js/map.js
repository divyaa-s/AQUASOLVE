document.addEventListener('DOMContentLoaded', function () {
    var map = L.map('map').setView([51.505, -0.09], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    function addMarkerWithGeoTag(location) {
        var marker = L.marker([location.latitude, location.longitude]).addTo(map);
        marker.bindPopup(`Lat: ${location.latitude}, Lon: ${location.longitude}`);
    }

    function updateLocationInfo() {
        navigator.geolocation.getCurrentPosition(function (position) {
            var locationInfo = {
                "latitude": position.coords.latitude,
                "longitude": position.coords.longitude
            };

            document.getElementById("location-info").innerHTML = `Latitude: ${locationInfo.latitude}, Longitude: ${locationInfo.longitude}`;

            // Add a marker with the geotagged location
            addMarkerWithGeoTag(locationInfo);
        });
    }

    // Update location information every second
    setInterval(updateLocationInfo, 1000);
});


document.addEventListener('DOMContentLoaded', function () {
    var map = L.map('map').setView([51.505, -0.09], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    function addMarkerWithGeoTag(location, imageUrl) {
        var marker = L.marker([location.latitude, location.longitude]).addTo(map);
        marker.bindPopup(`<img src="${imageUrl}" alt="Captured Image" width="100">`);
    }

    function updateLocationInfo() {
        navigator.geolocation.getCurrentPosition(function (position) {
            var locationInfo = {
                "latitude": position.coords.latitude,
                "longitude": position.coords.longitude
            };

            document.getElementById("location-info").innerHTML = `Latitude: ${locationInfo.latitude}, Longitude: ${locationInfo.longitude}`;

            // Capture picture and display it as a marker
            capturePicture(function(imageUrl) {
                addMarkerWithGeoTag(locationInfo, imageUrl);
            });
        });
    }

    function capturePicture(callback) {
        // Use navigator.mediaDevices.getUserMedia to access the camera
        navigator.mediaDevices.getUserMedia({ video: true })
            .then(function (stream) {
                var video = document.createElement('video');
                video.srcObject = stream;
                video.onloadedmetadata = function (e) {
                    // Capture a frame from the video and convert it to an image
                    var canvas = document.createElement('canvas');
                    canvas.width = video.videoWidth;
                    canvas.height = video.videoHeight;
                    var ctx = canvas.getContext('2d');
                    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
                    var imageUrl = canvas.toDataURL('image/jpeg');
                    callback(imageUrl);
                    stream.getTracks().forEach(track => track.stop()); // Stop the video stream
                };
            })
            .catch(function (err) {
                console.error("Error accessing the camera: ", err);
            });
    }

    // Update location information and add markers every 10 seconds
    setInterval(updateLocationInfo, 10000);
});
