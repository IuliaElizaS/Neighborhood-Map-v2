import React, { Component } from 'react';
import MapContainer from './MapContainer';
import Sidebar from './Sidebar';
import Hamburger from './Hamburger';
import InfoWindow from './InfoWindow'
import './App.css';

class App extends Component {
  state = {
    allPlaces: [],// all the places on the map
    selectedPlace: {},//the selected place object
    map: null, // the map
    markersList: [], // array containing all the markers
    clickedMarker: null, //the selected marker on the map
    optionId: '',// the category's id
    sideBarStyle: {display: ''}//style for the sidebar
  }

  //updates the map's state
  updateMap = (map) => {
    this.setState ({map: map})
  }

  // updates the clickedMarker's state
  updateMarker = (marker) => {
    const selectedMarkerIcon = {
      url: "https://png.icons8.com/color/48/000000/marker.png",// the icon for the selected marker,
      anchor: new window.google.maps.Point(0,32),
      size: new window.google.maps.Size(38,38)
    };
    marker.setIcon (selectedMarkerIcon);
    this.setState ({clickedMarker: marker})
  }

  //updates the markersList
  updateMarkersList = (markersList) => {
    this.setState ({markersList: markersList})
  }

  /* fetches the places to be marked on the map using foursquareAPI
  and loads the Google Maps script asynchronously, passing in the callback reference */
  fetchPlaces = ()=> {
    fetch('https://api.foursquare.com/v2/venues/search?ll=47.6507275,23.5765156&intent=browse&radius=1800&limit=45&categoryId=4bf58dd8d48988d181941735,4bf58dd8d48988d137941735,4bf58dd8d48988d15e941735,4bf58dd8d48988d184941735,4bf58dd8d48988d163941735,4bf58dd8d48988d175941735&client_id=3T544WQKFOVHSHX5DJW5VOILONS4NQEX0APKY1XSXBZW2EFF&client_secret=0XTVXJHYBHSW3Q55A1MEN1L3HDU1NDARNC0JJ4RPIJPEHFWD&v=20180708')
    .then(result => result.json())
    .then(fetchedPlaces => {
      //if there are items in the venue, adds them to the allPlaces
      if(fetchedPlaces.response.venues.length >0){
        this.setState(
          {allPlaces: fetchedPlaces.response.venues}
        );
        console.log (this.state.allPlaces);
      }else{
        alert("Sorry we couldn't load the data. Please try again");
      }
    })
    .catch(err => console.log (err));
  }

  //sets the optionId according to the filter option
  onOptionChange = (option) => {
    if (option === 'all'){
      this.setState({optionId: ''});
    } else if (option === 'museum'){
      this.setState({optionId: 'Muzeu'});
    }else if (option === 'theater'){
      this.setState({optionId: 'Teatru'});
    }else if (option === 'stadion'){
      this.setState({optionId: 'Stadion'});
    }else if (option === 'park'){
      this.setState({optionId: 'Parc'});
    }else if (option === 'gym'){
      this.setState({optionId: 'Gym'});
    }
  }

  //shows the InfoWindow
  showInfoWindow = (selectedPlace) => {
    this.setState({
      selectedPlace: selectedPlace,
    }, () => {
        return (
          <InfoWindow
            selectedPlace = {this.state.selectedPlace}
            map = {this.state.map}
            clickedMarker = {this.state.clickedMarker}
            deselectMarker = {this.deselectMarker}
          />
        );
      }
    );
    console.log (this.state.selectedPlace);
    console.log (this.state.clickedMarker);
  }

  //deselects the marker
  deselectMarker = () => {
    this.setState({
      selectedPlace: {}, //deselects the marker
      clickedMarker: null, //the selected marker on the map
    })
  }

  //opens and closes the sidebar if the hamburger is clicked
  hideSideBar = () => {
    console.log('menu button clicked');
    if (this.state.sideBarStyle.display === '') {
      //if the sidebar is closed (hidden) makes it visible according to it's initial style
      this.setState({sideBarStyle: {display: 'inherit'}});
    }else{
      //if the sidebar is opened (visible) makes it hidden
      this.setState({sideBarStyle: {display: ''}});
    }
  }

  componentDidMount(){
    this.fetchPlaces();
  }

  render() {
    return (
      <div  tabIndex="0" className="App">
        <header tabIndex="0" aria-label="header of the page">
          <h1 className="mainTitle"> Baia Mare, Romania - Freetime Activities Map </h1>
        </header>
        <main className="main-container">
          <MapContainer
            selectedPlace = {this.state.selectedPlace}
            allPlaces = {this.state.allPlaces}
            optionId = {this.state.optionId}
            updateMap = {this.updateMap}
            updateMarker = {this.updateMarker}
            updateMarkersList = {this.updateMarkersList}
            showInfoWindow = {this.showInfoWindow}
          />
          <Hamburger
            clickHandler = {this.hideSideBar}
          />
          <Sidebar
            sideBarStyle = {this.state.sideBarStyle}
            allPlaces = {this.state.allPlaces}
            markersList = {this.state.markersList}
            optionId = {this.state.optionId}
            onOptionChange = {this.onOptionChange}
            showInfoWindow = {this.showInfoWindow}
            updateMarker = {this.updateMarker}
          />
        </main>
        <footer className="app-footer" tabIndex="0" >
          <p>App created for UDACITY-Google Schoolarship Program. Copyright (c) 2018 </p>
          <p>This app uses marker icons from
              <a aria-label="link to marker's icons source" href="https://icons8.com"> Icon pack by Icons8 </a>
              and data fetched from
              <a aria-label="link to Forsquare" href="https://foursquare.com/"> Forsquare </a>
          </p>
        </footer>
      </div>
    );
  }
}
export default App
