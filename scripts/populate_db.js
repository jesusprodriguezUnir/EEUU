
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://iwqlbvlwxcekihliyayn.supabase.co';
const supabaseKey = 'sb_publishable_njkxTThfS8jqZCBBLAUkOQ_owd-P03H';
const supabase = createClient(supabaseUrl, supabaseKey);

const startDate = new Date('2026-07-29T12:00:00Z');

const itineraryData = [
    { dia_numero: 1, titulo: "Llegada a Boston", distancia_km: 20, alojamiento: "Hotel zona Canton/Braintree" },
    { dia_numero: 2, titulo: "Boston al Completo", distancia_km: 0, alojamiento: "Hotel zona Canton/Braintree" },
    { dia_numero: 3, titulo: "Boston a Albany", distancia_km: 275, alojamiento: "Hotel en Albany" },
    { dia_numero: 4, titulo: "Cataratas del Niágara", distancia_km: 475, alojamiento: "Hotel en Niagara Falls, NY" },
    { dia_numero: 5, titulo: "Lago Erie", distancia_km: 400, alojamiento: "Hotel en Sandusky" },
    { dia_numero: 6, titulo: "Cedar Point", distancia_km: 0, alojamiento: "Hotel en Sandusky" },
    { dia_numero: 7, titulo: "Sandusky a Pittsburgh", distancia_km: 300, alojamiento: "Hotel en Pittsburgh" },
    { dia_numero: 8, titulo: "Territorio Amish", distancia_km: 370, alojamiento: "Motel en Lancaster" },
    { dia_numero: 9, titulo: "Philadelphia a NYC", distancia_km: 270, alojamiento: "Hotel en NJ/NYC" },
    { dia_numero: 10, titulo: "Explorando NYC", distancia_km: 0, alojamiento: "Hotel en NJ/NYC" },
    { dia_numero: 11, titulo: "Lady Liberty", distancia_km: 0, alojamiento: "Hotel en NJ/NYC" },
    { dia_numero: 12, titulo: "Central Park", distancia_km: 0, alojamiento: "Hotel en NJ/NYC" },
    { dia_numero: 13, titulo: "La Despedida", distancia_km: 0, alojamiento: "N/A" }
].map((item, index) => {
    const d = new Date(startDate);
    d.setDate(d.getDate() + index);
    return { ...item, fecha: d.toISOString().split('T')[0] };
});

const budgetData = [
    { monto: 2400, descripcion: "Vuelos" },
    { monto: 2100, descripcion: "Hoteles" },
    { monto: 1000, descripcion: "Coche + Gas" },
    { monto: 900, descripcion: "Entradas" },
    { monto: 1400, descripcion: "Comidas" }
];

async function seed() {
    console.log("Seeding Itinerary...");
    // Clear table first to avoid duplicates if re-running (optional but good practice if not unique constraint)
    // await supabase.from('itinerario').delete().neq('id', 0); 

    // We will just insert. If error, we might see it.
    const { error: errItinerary } = await supabase
        .from('itinerario')
        .insert(itineraryData);

    if (errItinerary) console.error("Error inserting itinerary:", errItinerary);
    else console.log("Itinerary inserted!");

    console.log("Seeding Expenses...");
    const { error: errBudget } = await supabase
        .from('gastos')
        .insert(budgetData);

    if (errBudget) {
        console.error("Error inserting expenses with 'descripcion':", errBudget);
        if (errBudget.code === 'PGRST204') {
            // Retry with 'categoria'
            console.log("Retrying with 'categoria'...");
            const budgetDataCat = budgetData.map(b => ({ monto: b.monto, categoria: b.descripcion }));
            const { error: errBudget2 } = await supabase.from('gastos').insert(budgetDataCat);
            if (errBudget2) console.error("Error inserting expenses with 'categoria':", errBudget2);
            else console.log("Expenses inserted with 'categoria'!");
        }
    }
    else console.log("Expenses inserted!");
}

seed();
