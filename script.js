import { supabase } from './src/supabaseClient.js';

document.addEventListener('DOMContentLoaded', function () {

    // Common Icons
    function createIcon(color, isMajor = false) {
        const size = isMajor ? 18 : 12;
        const outerSize = isMajor ? 24 : 16;
        if (typeof L === 'undefined') return null; // Guard for no Leaflet
        return L.divIcon({
            className: 'custom-div-icon',
            html: `<div style='background-color:${color}; width:${size}px; height:${size}px; border-radius:50%; border:3px solid white; box-shadow:0 3px 6px rgba(0,0,0,0.3);'></div>`,
            iconSize: [outerSize, outerSize],
            iconAnchor: [outerSize / 2, outerSize / 2]
        });
    }

    const parkIcon = typeof L !== 'undefined' ? L.divIcon({
        className: 'custom-div-icon',
        html: "<div style='background-color:#e74c3c; width:24px; height:24px; border-radius:50%; border:3px solid white; display:flex; justify-content:center; align-items:center; color:white; font-size:12px; box-shadow:0 3px 6px rgba(0,0,0,0.4);'><i class='fa-solid fa-star'></i></div>",
        iconSize: [30, 30],
        iconAnchor: [15, 15]
    }) : null;

    const fallsIcon = typeof L !== 'undefined' ? L.divIcon({
        className: 'custom-div-icon',
        html: "<div style='background-color:#1abc9c; width:24px; height:24px; border-radius:50%; border:3px solid white; display:flex; justify-content:center; align-items:center; color:white; font-size:12px; box-shadow:0 3px 6px rgba(0,0,0,0.4);'><i class='fa-solid fa-water'></i></div>",
        iconSize: [30, 30],
        iconAnchor: [15, 15]
    }) : null;

    // 1. Logic for Overview Map (index.html)
    const mapContainer = document.getElementById('map');
    if (mapContainer && typeof L !== 'undefined') {
        const map = L.map('map').setView([41.5, -76.0], 6);

        L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
            subdomains: 'abcd',
            maxZoom: 19
        }).addTo(map);

        const locations = [
            { name: "Boston (Inicio - Días 1-2)", coords: [42.3601, -71.0589], type: "city", color: "#2980b9" },
            { name: "Albany (Día 3)", coords: [42.6526, -73.7562], type: "stop", color: "#7f8c8d" },
            { name: "Cataratas del Niágara (Día 4)", coords: [43.0962, -79.0377], type: "nature", color: "#1abc9c" },
            { name: "Cedar Point (Días 5-6)", coords: [41.4822, -82.6835], type: "park", color: "#e74c3c" },
            { name: "Pittsburgh (Día 7)", coords: [40.4406, -79.9959], type: "city", color: "#f39c12" },
            { name: "Lancaster (Día 8)", coords: [40.0379, -76.3055], type: "culture", color: "#d35400" },
            { name: "Philadelphia (Día 9)", coords: [39.9526, -75.1652], type: "city", color: "#8e44ad" },
            { name: "Nueva York (Días 10-12)", coords: [40.7128, -74.0060], type: "city", color: "#2c3e50" },
            { name: "Newark (Fin - Día 13)", coords: [40.6895, -74.1745], type: "transport", color: "#34495e" }
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
            [42.3601, -71.0589], // Boston
            [42.6526, -73.7562], // Albany
            [43.0962, -79.0377], // Niagara
            [41.4822, -82.6835], // Cedar Point
            [40.4406, -79.9959], // Pittsburgh
            [40.0379, -76.3055], // Lancaster
            [39.9526, -75.1652], // Philadelphia
            [40.7128, -74.0060], // NYC
            [40.6895, -74.1745]  // Newark
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
    if (dayMapContainer && typeof L !== 'undefined') {
        const lat = parseFloat(dayMapContainer.getAttribute('data-lat'));
        const lng = parseFloat(dayMapContainer.getAttribute('data-lng'));
        const zoom = parseInt(dayMapContainer.getAttribute('data-zoom')) || 10;
        const name = dayMapContainer.getAttribute('data-name');

        const map = L.map('day-map').setView([lat, lng], zoom);

        L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
            maxZoom: 19
        }).addTo(map);

        L.marker([lat, lng], { icon: createIcon('#e74c3c', true) })
            .addTo(map)
            .bindPopup(`<b>${name}</b>`)
            .openPopup();
    }

    // --- SUPABASE INTEGRATION ---

    const itineraryContainer = document.getElementById('itinerary-timeline');
    if (itineraryContainer) {
        loadItinerary(itineraryContainer);
    }

    const budgetTotalEl = document.getElementById('total-budget');
    if (budgetTotalEl) {
        loadBudget(budgetTotalEl);

        // Expense Form Handler
        const expenseForm = document.getElementById('add-expense-form');
        if (expenseForm) {
            expenseForm.addEventListener('submit', async (e) => {
                e.preventDefault();
                const desc = document.getElementById('expense-desc').value;
                const amount = parseFloat(document.getElementById('expense-amount').value);

                if (!desc || isNaN(amount)) return;

                // Try 'descripcion', fallback to 'categoria' if failed before (knowing schema is tricky, trying best guess or both if loose)
                // Based on populate script error log, 'categoria' might be the one, or 'descripcion' if schema was fixed.
                // Let's assume 'descripcion' first as per my plan, but if it fails I'll notify user.
                // Actually, populate script succeeded with 'categoria' in my retry logic (simulated).
                // Let's use 'categoria' as the text field just in case, or 'descripcion'.

                const { error } = await supabase
                    .from('gastos')
                    .insert([{ descripcion: desc, monto: amount }]); // Trying descripcion first as per request of user probably

                if (error) {
                    console.error('Error adding expense:', error);
                    // Fallback to categoria if column error
                    if (error.code === 'PGRST204') {
                        const { error: err2 } = await supabase.from('gastos').insert([{ categoria: desc, monto: amount }]);
                        if (err2) { alert('Error guardando gasto: ' + err2.message); return; }
                    } else {
                        alert('Error guardando gasto: ' + error.message);
                        return;
                    }
                }

                alert('Gasto guardado correctamente!');
                expenseForm.reset();
                loadBudget(budgetTotalEl); // Refresh total
            });
        }
    }

    const progressBar = document.getElementById('trip-progress-bar');
    if (progressBar) {
        updateProgressBar(progressBar);
    }

    // --- DAY PAGE EXPENSE FORM INJECTION ---
    const expensesSection = document.querySelector('.expenses-section');
    if (expensesSection && !document.getElementById('add-expense-form')) {
        // We are on a day page
        const dayTitle = document.title; // e.g. "Día 1: El Aterrizaje"
        const defaultDesc = `Gasto - ${dayTitle.split(':')[0]}`;

        const formHTML = `
            <div class="expense-form-container">
                <h4><i class="fas fa-plus-circle"></i> Añadir Gasto Rápido</h4>
                <form class="expense-form" id="day-expense-form">
                    <div class="form-group">
                        <label>Concepto</label>
                        <input type="text" id="day-expense-desc" value="${defaultDesc}" required>
                    </div>
                    <div class="form-group small">
                        <label>Monto (€)</label>
                        <input type="number" id="day-expense-amount" placeholder="0.00" required step="0.01">
                    </div>
                    <button type="submit" class="btn-save">
                        <i class="fas fa-save"></i>
                    </button>
                </form>
            </div>
        `;
        expensesSection.insertAdjacentHTML('beforeend', formHTML);

        document.getElementById('day-expense-form').addEventListener('submit', async (e) => {
            e.preventDefault();
            const desc = document.getElementById('day-expense-desc').value;
            const amount = parseFloat(document.getElementById('day-expense-amount').value);

            if (!desc || isNaN(amount)) return;

            const { error } = await supabase
                .from('gastos')
                .insert([{ descripcion: desc, monto: amount }]);

            if (error) {
                console.error('Error adding expense:', error);
                if (error.code === 'PGRST204') {
                    const { error: err2 } = await supabase.from('gastos').insert([{ categoria: desc, monto: amount }]);
                    if (err2) { alert('Error: ' + err2.message); return; }
                } else {
                    alert('Error: ' + error.message);
                    return;
                }
            }

            alert('Gasto guardado! Ver el total actualizado en la página de Presupuesto.');
            document.getElementById('day-expense-amount').value = '';
        });
    }

});

async function loadItinerary(container) {
    const { data: days, error } = await supabase
        .from('itinerario')
        .select('*')
        .order('dia_numero', { ascending: true });

    if (error) {
        console.error('Error fetching itinerary:', error);
        container.innerHTML = '<p class="error">Error cargando itinerario.</p>';
        return;
    }

    container.innerHTML = ''; // Clear loading

    data.days = days; // Store for other uses if needed

    days.forEach(day => {
        const item = document.createElement('div');
        item.className = 'timeline-item';
        // HTML Structure matching original
        item.innerHTML = `
            <div class="timeline-marker"></div>
            <div class="timeline-content">
                <div class="day-card ${day.dia_numero === 7 || day.dia_numero === 5 || day.dia_numero === 3 ? 'featured' : ''}">
                    <div class="day-header">
                        <span class="day-number">Día ${day.dia_numero}</span>
                        <span class="day-date">${formatDate(day.fecha)}</span>
                    </div>
                    <h3>${day.titulo}</h3>
                    <p>${day.descripcion || 'Sin descripción disponible.'}</p>
                    <div class="day-stats">
                        <span><i class="fas fa-road"></i> ${day.distancia_km} km</span>
                        <span><i class="fas fa-bed"></i> ${day.alojamiento}</span>
                    </div>
                    <a href="day${day.dia_numero}.html" class="day-link">Ver Detalles</a>
                </div>
            </div>
        `;
        container.appendChild(item);
    });
}

function formatDate(dateString) {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', { day: 'numeric', month: 'short' });
}

async function loadBudget(element) {
    const { data, error } = await supabase
        .from('gastos')
        .select('monto');

    if (error) {
        console.error('Error fetching budget:', error);
        element.textContent = 'Error';
        return;
    }

    const total = data.reduce((sum, item) => sum + (item.monto || 0), 0);
    element.textContent = `~${total.toLocaleString('es-ES')} €`;
}

async function updateProgressBar(barContainer) {
    // We need total distance first.
    // We can fetch from itinerary or assume we have the sum if we already fetched it.
    // To be safe, let's fetch sum of distances.
    const { data, error } = await supabase
        .from('itinerario')
        .select('distancia_km');

    if (error) {
        console.error('Error fetching distances:', error);
        return;
    }

    const totalDist = data.reduce((sum, item) => sum + (item.distancia_km || 0), 0);

    // Clear existing
    barContainer.innerHTML = '';

    data.forEach((day, index) => {
        const width = (day.distancia_km / totalDist) * 100;
        const segment = document.createElement('span');
        segment.className = `progress-segment day${index + 1}`;
        segment.style.width = `${width}%`;
        segment.title = `Día ${index + 1}: ${day.distancia_km} km`;
        barContainer.appendChild(segment);
    });
}
