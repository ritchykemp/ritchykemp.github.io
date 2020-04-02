let startLayer = L.tileLayer.provider('Stamen.TonerLite');
let map = L.map("map", {
    center: [0, 0],
    zoom: 2,
    layers: [
        startLayer
    ]
});
L.control.layers({
    "OpenTopoMap": L.tileLayer.provider('OpenTopoMap'),
    //"Stadia.AlidadeSmooth" : L.tileLayer.provider('OStadia.AlidadeSmooth'),
    //"Stadia.AlidadeSmoothDark" : L.tileLayer.provider('Stadia.AlidadeSmoothDark'),
    "Thunderforest.OpenCycleMap": L.tileLayer.provider('Thunderforest.OpenCycleMap'),
    "Thunderforest.SpinalMap": L.tileLayer.provider('Thunderforest.SpinalMap'),
    "CyclOSM": L.tileLayer.provider('CyclOSM'),
    "Stamen.Watercolor": L.tileLayer.provider('Stamen.Watercolor'),
    "Stamen.TonerLite": startLayer,
    "OpenStreetMap.DE": L.tileLayer.provider('OpenStreetMap.DE'),
}).addTo(map);


console.log(CONFIRMED);

for (let i = 1; i < CONFIRMED.length; i++) {
    const row = CONFIRMED[i];
    console.log(row[2], row[3]);
    let lat = row[2];
    let lng = row[3];
    let reg = `${row[0]}${row[1]}`;
    let val = row[row.length - 1];
    // let mrk =L.marker ([lat,lng]).addTo(map);
    // mrk.bindPopup(`${reg}: ${val}`);
    let s = 0.5;
    let r = Math.sqrt(val * s / Math.PI)

    let circle = L.circleMarker([lat, lng], {
        radius: r
    }).addTo(map);
    circle.bindPopup(`${reg}: ${val}`);
}