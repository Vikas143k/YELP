// import * as maptilersdk from '@maptiler/sdk';




// Use the global variables set in the EJS file
maptilersdk.config.apiKey = maptilerkey;

// Parse the coordinates if necessary
const parsedCoordinate = JSON.parse(coordinate);
const parsedCampground=JSON.parse(campground);

const map = new maptilersdk.Map({
  container: 'map',
  style: maptilersdk.MapStyle.STREETS,
//   center: [78.20900554209948, 28.613895618708465], // Parsed coordinates
  center: parsedCoordinate, // Parsed coordinates
  zoom: 8
});

 // create the popup
 var popup = new maptilersdk.Popup({ offset: 25 }).setHTML(
  `<h4>${parsedCampground.title}</h4>`
);

// create DOM element for the marker
var el = document.createElement('div');
el.id = 'marker';


const marker = new maptilersdk.Marker()
  .setLngLat(parsedCoordinate)
  .setPopup(popup)
  .addTo(map);
