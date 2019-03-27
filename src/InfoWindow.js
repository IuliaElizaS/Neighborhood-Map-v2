import React from 'react';
import './App.css';

class InfoWindow extends React.Component {
  state = {
    content: '',
    markerPhoto: {},// photos for the selected marker
  }

  //fetches the photo for the marker and generates the InfoWindow
  populateInfoWindow = (placeId) => {
    fetch(`https://api.foursquare.com/v2/venues/${placeId}/photos?&client_id=3T544WQKFOVHSHX5DJW5VOILONS4NQEX0APKY1XSXBZW2EFF&client_secret=0XTVXJHYBHSW3Q55A1MEN1L3HDU1NDARNC0JJ4RPIJPEHFWD&v=20180807`)
    .then(result => result.json())
    .then(fetchedPhotos => {
      if(fetchedPhotos.response.photos !== undefined){
        this.setState({markerPhoto: fetchedPhotos.response.photos}, this.generateInfoWindow(infoWindow, this.props.clickedMarker));
      };
      console.log(this.state.markerPhoto);
    }).catch(err => alert (err));
  }

  //generates the InfoWindow
  generateInfoWindow = (infoWindow, marker) => {
    //creates a new infoWindow object
    infoWindow = new window.google.maps.InfoWindow({
      content: this.state.content
    });

    //sets the marker for the infoWindow
    infoWindow.marker = marker;
    //if the selected place has picture displays it, else provides a placeholder. Placeholder source: 'https://placeholder.com'
    if (this.state.markerPhoto.items && this.state.markerPhoto.items.length > 0) {
      this.setState({
        content : `
          <div className = "info" role = "dialog" aria-label = "more informations about the place" >
            <h3 className = "placeName"> ${this.props.selectedPlace.name}</h3>
            <p aria-label = "address of the selected place" className = "address" > ${this.props.selectedPlace.location.address} Baia Mare, Romania</p>
            <img className = "picture" src = "${this.state.markerPhoto.items[0].prefix}height36${this.state.markerPhoto.items[0].suffix}" alt = "${this.props.selectedPlace.name}">
          </div>`
      }, infoWindow.setContent(this.state.content));
    } else {
      this.setState({
        content : `
          <div className = "info" role = "dialog" aria-label = "more informations about the place" >
            <h3 className = "placeName"> ${this.props.selectedPlace.name}</h3>
            <p aria-label = "address of the selected place" className = "address" > ${this.props.selectedPlace.location.address} Baia Mare, Romania</p>
            <img className = "picture" src = "http://via.placeholder.com/50x36/ffe99b/282c4b?text=No+Image" alt = "a blank placeholder">
          </div>`
      },infoWindow.setContent(this.state.content))
    };

    //opens the infoWindow
    infoWindow.open(this.props.map, marker);

    //when clicking on close (X) button the infoWindow closes and the content is cleaned
    infoWindow.addListener("closeclick", ()=>{
      //infoWindow.setMarker(null);
      infoWindow.close();
      this.props.deselectMarker();
      this.setState({content : ''})
    })
  }

  componentDidMount(){
    this.populateInfoWindow(this.props.selectedPlace.id)
  }

  render() {
    return infoWindow
  }
}

let infoWindow;
export default InfoWindow;
