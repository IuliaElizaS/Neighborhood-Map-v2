import React from 'react';
import './App.css';


class MapContainer extends React.Component {

  //initializes the map
  initMap = () => {
    const map = new window.google.maps.Map(document.getElementById('map'), {
      center: {lat: 47.6573916, lng: 23.5652344},
      zoom: 14.25,
      styles: [{
        featureType: 'poi',
        stylers: [{'visibility': 'off'}]
      }]
    });

    this.props.updateMap(map);

    const markerIcon = {
      url: "https://png.icons8.com/ultraviolet/40/000000/marker.png",// the icon for the marker on the map,
      anchor: new window.google.maps.Point(0,32),
      size: new window.google.maps.Size(28,28)
    };

    //displays the markers on the map
    this.props.allPlaces.filter(places => places.name.indexOf(this.props.optionId) > -1)
    .map(place => {
      const marker = new window.google.maps.Marker ({
        position: {
          lat: place.location.lat,
          lng: place.location.lng
        },
        map: map,
        title: place.name,
        icon: markerIcon
      });

      marker.addListener("click", (evt) => {
        this.props.updateMarker(marker);
        this.props.showInfoWindow(place);
      });
      markersList.push(marker);
      return markersList;
    });

    this.props.updateMarkersList(markersList);
  }

  //alerts the user when the map fails loading due to authentication failure. Method suggested by awesome Udacity comunity :)
  gm_authFailure = () => {
     alert ('You will not be able to see the map. There was an error with the authentication.');
  }

  componentDidMount(){
    //connects the initMap function to the global window
    window.initMap = this.initMap;
    //loads the script and initializes the map
    loadScript("https://maps.googleapis.com/maps/api/js?key=AIzaSyChc63cHsVUo0L-UUrBYIEFF1BQGTsjyUY&v=3&callback=initMap");
    //connects the gm_authFailure function to the global window context
    window.gm_authFailure = this.gm_authFailure;
  }

  render() {
    return(
      <section className = "map-container" tabIndex = "0">
        <div id = "map"
          tabIndex = "0"
          role = "application"
          aria-label = "Map of Baia Mare, Romania, with places marked on it"
        >
        </div>
      </section>
    )
  }
};

/* Google Maps API integration in React.js addapted from https://www.klaasnotfound.com/2016/11/06/making-google-maps-work-with-react/
and https://www.youtube.com/watch?v=W5LhLZqj76s&list=PLgOB68PvvmWCGNn8UMTpcfQEiITzxEEA1&index=2 */

//loads the script
const loadScript = (src) => {
  //selects the first <script> tag
  const firstScript = window.document.getElementsByTagName("script")[0];
  //creates the nedeed <script> element for Google Maps API
  const script = window.document.createElement("script");
  // adds propreties to the <script>
  script.src = src;
  script.async = true;
  script.defer = true;
  // inserts the new created <script> before the first existing script
  firstScript.parentNode.insertBefore(script, firstScript);
};

//array that holds all the markers
const markersList = [];

export default MapContainer;
