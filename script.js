document.addEventListener('DOMContentLoaded', function () {

    // Common Icons
    function createIcon(color, isMajor = false) {
        const size = isMajor ? 18 : 12;
        const outerSize = isMajor ? 24 : 16;
        return L.divIcon({
            className: 'custom-div-icon',
            html: `<div style='background-color:${color}; width:${size}px; height:${size}px; border-radius:50%; border:3px solid white; box-shadow:0 3px 6px rgba(0,0,0,0.3);'></div>`,
            iconSize: [outerSize, outerSize],
            iconAnchor: [outerSize / 2, outerSize / 2]
        });
    }

    const parkIcon = L.divIcon({
        className: 'custom-div-icon',
        html: "<div style='background-color:#e74c3c; width:24px; height:24px; border-radius:50%; border:3px solid white; display:flex; justify-content:center; align-items:center; color:white; font-size:12px; box-shadow:0 3px 6px rgba(0,0,0,0.4);'><i class='fa-solid fa-star'></i></div>",
        iconSize: [30, 30],
        iconAnchor: [15, 15]
    });

    const fallsIcon = L.divIcon({
        className: 'custom-div-icon',
        html: "<div style='background-color:#1abc9c; width:24px; height:24px; border-radius:50%; border:3px solid white; display:flex; justify-content:center; align-items:center; color:white; font-size:12px; box-shadow:0 3px 6px rgba(0,0,0,0.4);'><i class='fa-solid fa-water'></i></div>",
        iconSize: [30, 30],
        iconAnchor: [15, 15]
    });

    // 1. Logic for Overview Map (index.html)
    const mapContainer = document.getElementById('map');
    if (mapContainer) {
        const map = L.map('map').setView([41.5, -76.0], 6);

        L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
            subdomains: 'abcd',
            maxZoom: 19
        }).addTo(map);

        const locations = [
            { name: "Newark (Inicio/Fin)", coords: [40.6895, -74.1745], type: "transport", color: "#34495e" },
            { name: "Boston (Días 2-3)", coords: [42.3601, -71.0589], type: "city", color: "#2980b9" },
            { name: "Albany (Día 4)", coords: [42.6526, -73.7562], type: "stop", color: "#7f8c8d" },
            { name: "Cataratas del Niágara (Día 5)", coords: [43.0962, -79.0377], type: "nature", color: "#1abc9c" },
            { name: "Cedar Point (Días 6-7)", coords: [41.4822, -82.6835], type: "park", color: "#e74c3c" },
            { name: "Pittsburgh (Día 8)", coords: [40.4406, -79.9959], type: "city", color: "#f39c12" },
            { name: "Lancaster (Día 9)", coords: [40.0379, -76.3055], type: "culture", color: "#d35400" },
            { name: "Philadelphia (Día 10)", coords: [39.9526, -75.1652], type: "city", color: "#8e44ad" },
            { name: "Nueva York (Días 10-13)", coords: [40.7128, -74.0060], type: "city", color: "#2c3e50" }
        ];

        locations.forEach(loc => {
            let icon;
            if (loc.type === 'park') icon = parkIcon;
            else if (loc.type === 'nature') icon = fallsIcon;
            else if (loc.type === 'stop') icon = createIcon(loc.color, false);
            else icon = createIcon(loc.color, true);

            L.marker(loc.coords, { icon: icon })
                .addTo(map)
                .bindPopup(`<b>${loc.name}</b>`);
        });

        const routeCoords = [
            [40.6895, -74.1745], // Newark
            [42.3601, -71.0589], // Boston
            [42.6526, -73.7562], // Albany
            [43.0962, -79.0377], // Niagara
            [41.4822, -82.6835], // Cedar Point
            [40.4406, -79.9959], // Pittsburgh
            [40.0379, -76.3055], // Lancaster
            [39.9526, -75.1652], // Philadelphia
            [40.7128, -74.0060], // NYC
            [40.6895, -74.1745]  // Newark (Loop)
        ];

        L.polyline(routeCoords, {
            color: '#34495e',
            weight: 4,
            opacity: 0.8,
            dashArray: '10, 5',
            lineCap: 'round'
        }).addTo(map);
    }

    // 2. Logic for Individual Day Maps (dayX.html)
    const dayMapContainer = document.getElementById('day-map');
    if (dayMapContainer) {
        const lat = parseFloat(dayMapContainer.getAttribute('data-lat'));
        const lng = parseFloat(dayMapContainer.getAttribute('data-lng'));
        const zoom = parseInt(dayMapContainer.getAttribute('data-zoom')) || 10;
        const name = dayMapContainer.getAttribute('data-name');

        const map = L.map('day-map').setView([lat, lng], zoom);

        L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
            maxZoom: 19
        }).addTo(map);

        // Add a marker for the day's main location
        L.marker([lat, lng], { icon: createIcon('#e74c3c', true) })
            .addTo(map)
            .bindPopup(`<b>${name}</b>`)
            .openPopup();
    }
});
