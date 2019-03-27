import React from 'react'
import './App.css'

class Map extends React.Component {

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

    //displays the markers on the map
    this.props.allMarkers.filter(marker => marker.name.indexOf(this.props.optionId) > -1)
      .map(mapMarker => {
        const marker = new window.google.maps.Marker ({
          position: {
            lat: mapMarker.location.lat,
            lng: mapMarker.location.lng
          },
          map: map,
          title: mapMarker.name,
          icon: this.props.markerIcon
        });
        marker.addListener("click", (evt) => this.props.activateMarker(mapMarker, evt));
        return marker;
      });
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
      <div id = "map"
        tabIndex = "0"
        role = "application"
        aria-label = "Map of Baia Mare, Romania, with places marked on it"
      >
      </div>
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

export default Map;
