# Proyecto: Viaje Costa Este EEUU - Montañas Rusas y Cataratas

## 📋 Descripción General

Este proyecto web documenta la agenda de viaje por la Costa Este de Estados Unidos. Es una aplicación web desarrollada en HTML y CSS que presenta un itinerario detallado de 13 días (del 23 de julio al 4 de agosto de 2025) centrada en ciudades históricas, maravillas naturales y, sobre todo, parques de atracciones de primer nivel.

## 🗓️ Fechas del Viaje

- **Inicio:** 23 de julio de 2025
- **Fin:** 4 de agosto de 2025
- **Duración:** 13 días

## 🚗 Itinerario Completo

### Etapa 1: Nueva Inglaterra (Días 1-3)

#### Día 1 (23 julio): El Aterrizaje
- **Lugar:** Newark, NJ
- **Actividades:**
  - Aterrizaje en Newark Liberty International Airport (EWR) a las 22:25
  - Recogida del coche de alquiler
  - Primera noche en hotel cercano al aeropuerto

#### Día 2 (24 julio): Hacia Nueva Inglaterra
- **Ruta:** Newark → Boston (350 km, 4h 30m)
- **Actividades:**
  - Llegada a Boston
  - Quincy Market - Lobster Roll
  - Paseo por el Harborwalk
- **Alojamiento:** Hotel zona Canton/Braintree (2 noches)

#### Día 3 (25 julio): Boston al Completo
- **Actividades:**
  - Freedom Trail (Boston Common, Old State House, Paul Revere House)
  - Harvard University (Harvard Yard, estatua de John Harvard)
  - Beacon Hill (Acorn Street)
  - North End (Little Italy)

### Etapa 2: Grandes Lagos y Adrenalina (Días 4-7)

#### Día 4 (26 julio): Ruta Escénica
- **Ruta:** Boston → Albany, NY (275 km, 3h)
- **Parada:** Stockbridge, MA (pueblo de Norman Rockwell)
- **Alojamiento:** Hotel en Albany

#### Día 5 (27 julio): Cataratas del Niágara
- **Ruta:** Albany → Niagara Falls (475 km, 4h 45m)
- **Actividades:**
  - **Maid of the Mist** - Barco a la base de las cataratas
  - Goat Island y Terrapin Point
  - Cave of the Winds
  - Iluminación nocturna de las cataratas
- **Alojamiento:** Hotel en Niagara Falls, NY

#### Día 6 (28 julio): Bordeando el Lago Erie
- **Ruta:** Niágara → Sandusky, OH (400 km, 4h)
- **Actividades:**
  - Ruta escénica por la I-90 bordeando el lago
  - Tarde de relax en Sandusky
- **Alojamiento:** Hotel en Sandusky (2 noches)

#### Día 7 (29 julio): Cedar Point ⭐
- **Actividad:** Día completo en Cedar Point
- **Montañas Rusas Top:**
  - Steel Vengeance (Híbrida)
  - Millennium Force (Giga Coaster)
  - Maverick (Lanzamiento)
  - Valravn (Dive Coaster)
- **Cena:** Famous Dave's BBQ

### Etapa 3: Regreso Cultural (Días 8-10)

#### Día 8 (30 julio): Ciudad de Acero
- **Ruta:** Sandusky → Pittsburgh, PA (300 km, 3h)
- **Actividades:**
  - Duquesne Incline - Funicular al Monte Washington
  - Vistas del "Triángulo Dorado"
  - Cena en Primanti Bros (sándwich con patatas dentro)
- **Alojamiento:** Hotel en Pittsburgh

#### Día 9 (31 julio): Territorio Amish
- **Ruta:** Pittsburgh → Lancaster, PA (370 km, 4h)
- **Actividades:**
  - Condado de Lancaster - Cultura Amish
  - Buggies de caballos
  - The Amish Village o Kitchen Kettle Village
  - Cena familiar "Pennsylvania Dutch"
- **Alojamiento:** Motel en Lancaster

#### Día 10 (1 agosto): Filadelfia y Nueva York
- **Ruta:** Lancaster → Philadelphia → NYC (270 km)
- **Actividades en Philadelphia:**
  - Liberty Bell
  - Rocky Steps (Museo de Arte)
  - Philly Cheesesteak
- **NYC:**
  - Devolución del coche de alquiler
- **Alojamiento:** Hotel en NJ/NYC (3 noches)

### Etapa 4: La Gran Manzana (Días 11-13)

#### Día 11 (2 agosto): Lady Liberty
- **Actividades:**
  - Ferry a Liberty Island y Ellis Island
  - Wall Street y Toro de Wall Street
  - Memorial del 11-S y Oculus
  - Puente de Brooklyn al atardecer
  - Dumbo

#### Día 12 (3 agosto): Iconos y Luces
- **Actividades:**
  - Central Park (Bethesda Fountain, Bow Bridge, Strawberry Fields)
  - Quinta Avenida
  - Top of the Rock (Rockefeller Center)
  - Times Square de noche

#### Día 13 (4 agosto): La Despedida
- **Actividades:**
  - Últimas compras (Macy's Herald Square, Hudson Yards)
  - Traslado al Aeropuerto Newark
  - Vuelo de regreso: 17:05

## 🏗️ Estructura del Proyecto

### Archivos HTML

- `index.html` - Página principal con hero section, estadísticas y timeline
- `itinerary.html` - Línea de tiempo detallada organizada por etapas
- `budget.html` - Desglose de presupuesto (Vuelos, Hoteles, Coche, Entradas, Comida)
- `recommendations.html` - Hoteles, restaurantes y consejos de viaje
- `day1.html` a `day13.html` - Páginas de detalle para cada día con:
  - Mapas de Google Maps embebidos
  - Información de ruta (km, tiempo)
  - Hoteles con enlaces a reservas
  - Gastos estimados
  - Qué ver y hacer

### Archivos de Estilo

- `styles.css` - Hoja de estilos principal (adaptada del tema SelvaNegra con colores USA)
- `script.js` - Scripts para funcionalidades interactivas

### Directorios de Recursos

```
EEUU/
├── Documentos/
│   ├── DNI/
│   └── Pasaporte/
├── Hoteles/
├── images/
├── day1.html - day13.html
├── index.html
├── itinerary.html
├── budget.html
├── recommendations.html
├── styles.css
├── script.js
└── README.md
```

## 🎨 Características Técnicas

### Tecnologías Utilizadas

- **HTML5:** Estructura semántica moderna
- **CSS3:** Variables CSS, Flexbox, Grid
- **JavaScript:** Interactividad (opcional)
- **FontAwesome 6.0:** Iconografía vectorial
- **Google Maps Embed API:** Mapas interactivos
- **Google Fonts:** Tipografía 'Inter' para mejor legibilidad

### Diseño y UI/UX

- **Paleta de colores temática USA:**
  - Azul primario: `#0d47a1`
  - Rojo secundario: `#b71c1c`
  - Acento dorado: `#ffca28`
- **Componentes principales:**
  - Hero section con estadísticas
  - Tarjetas de información (`info-card`)
  - Timeline vertical con marcadores
  - Tarjetas de día (`day-card`) con efecto hover
  - Barra de progreso de kilómetros acumulados
  - Secciones de alojamiento y gastos
- **Responsive:** Adaptable a móviles y tablets
- **Navegación:** Botones de navegación entre días

### Funcionalidades

- **Línea de tiempo visual:** Progreso del viaje día a día
- **Mapas interactivos:** Rutas embebidas para cada día
- **Estadísticas dinámicas:** Km totales, días, estados visitados
- **Enlaces a hoteles:** Preparados para PDFs de reservas
- **Cálculo de gastos:** Desglose por categoría

## 📊 Estadísticas del Viaje

- **Estados visitados:** 5+ (Nueva Jersey, Nueva York, Massachusetts, Ohio, Pennsylvania)
- **Ciudades principales:** Newark, Boston, Albany, Niagara Falls, Sandusky, Pittsburgh, Lancaster, Philadelphia, NYC
- **Distancia total conducida:** ~2,000 km
- **Parques temáticos:** Cedar Point (Top 1 mundial)
- **Noches de alojamiento:** 12
- **Presupuesto estimado:** ~7,800 € (para 2 adultos + 1 niño)

## 🎯 Objetivo del Proyecto

Este proyecto web sirve como:

- **Planificador centralizado:** Toda la información del viaje en un solo lugar
- **Guía de viaje interactiva:** Accesible desde cualquier dispositivo
- **Documentación personal:** Registro completo para futuras referencias
- **Portfolio técnico:** Demostración de habilidades en desarrollo web front-end

## 🔧 Instalación y Uso

1. **Clonar o descargar** el repositorio
2. **Abrir** `index.html` en cualquier navegador moderno
3. **Navegar** entre las páginas usando el menú superior o los botones de navegación
4. **Visualizar** mapas, imágenes y detalles de cada día
5. **Añadir documentación:** Guardar PDFs de reservas en las carpetas correspondientes

## 📝 Notas Importantes

### Documentación Requerida
- **Pasaportes:** Verificar validez (mínimo 6 meses)
- **ESTA:** Autorización de viaje (tramitar online)
- **Permiso de conducir:** Internacional recomendado
- **Seguro de viaje:** Cobertura médica en EEUU

### Reservas
- **Hoteles:** Guardar confirmaciones en `/Hoteles`
- **Vuelos:** Billete electrónico en `/Documentos`
- **Coche de alquiler:** Voucher y seguro
- **Entradas:** Cedar Point, Maid of the Mist, etc.

## 📞 Información Adicional

- **Zona horaria:** Eastern Time (ET) - UTC-5/-4
- **Divisa:** Dólar estadounidense (USD)
- **Propinas:** 15-20% en restaurantes
- **Peajes:** Llevar efectivo o E-ZPass (alquiler de coche)

---

**Proyecto creado:** Enero 2026  
**Última actualización:** Enero 2026

¡Que empiece la aventura! 🎢🗽🦞
