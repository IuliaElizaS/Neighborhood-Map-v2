import React from 'react';
import './App.css';

class Marker extends React.Component {

  render() {
    const markerIcon = {
      url: "https://png.icons8.com/ultraviolet/40/000000/marker.png",// the icon for the marker on the map,
      anchor: new window.google.maps.Point(0,32),
      size: new window.google.maps.Size(32,32)
    };

    const selectedMarkerIcon = {
      url: "https://png.icons8.com/color/48/000000/marker.png",// the icon for the selected marker,
      anchor: new window.google.maps.Point(0,32),
      size: new window.google.maps.Size(38,38)
    };

  }
}

export default Marker;
