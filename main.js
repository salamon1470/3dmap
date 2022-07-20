// TO MAKE THE MAP APPEAR YOU MUST
// ADD YOUR ACCESS TOKEN FROM
// https://account.mapbox.com
mapboxgl.accessToken = 'sk.eyJ1Ijoic2FsYW1vbjE0NzAiLCJhIjoiY2w1dGNqdWl0MGRoaDNkc2R2aDJza2hseCJ9.ceU7rLogXmrf4GAsEWgBTA';
const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [-87.61694, 41.86625],
    zoom: 15.99,
    pitch: 40,
    bearing: 20,
    antialias: true
});

map.on('load', () => {
    map.addSource('floorplan', {
        'type': 'geojson',
        /*
            * Each feature in this GeoJSON file contains values for
            * `properties.height`, `properties.base_height`,
            * and `properties.color`.
            * In `addLayer` you will use expressions to set the new
            * layer's paint properties based on these values.
            */
        'data': 'https://docs.mapbox.com/mapbox-gl-js/assets/indoor-3d-map.geojson'
    });
    map.addLayer({
        'id': 'room-extrusion',
        'type': 'fill-extrusion',
        'source': 'floorplan',
        'paint': {
            // Get the `fill-extrusion-color` from the source `color` property.
            'fill-extrusion-color': ['get', 'color'],

            // Get `fill-extrusion-height` from the source `height` property.
            'fill-extrusion-height': ['get', 'height'],

            // Get `fill-extrusion-base` from the source `base_height` property.
            'fill-extrusion-base': ['get', 'base_height'],

            // Make extrusions slightly opaque to see through indoor walls.
            'fill-extrusion-opacity': 0.5
        }
    });
});
