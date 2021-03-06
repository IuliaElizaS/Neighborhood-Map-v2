import React from 'react'
import './App.css'

class Sidebar extends React.Component {
  render() {
    return(
      <aside className="sidebar-container" tabIndex="0" style={this.props.sideBarStyle} >
        <div role="group" aria-label="markers filter options" className="marker-filter">
          <h2>Markers Filter</h2>
          <select aria-label="Choose your preferred activity"
                tabIndex="0"
                className="marker-select"
                onChange={(event) => this.props.onOptionChange (event.target.value)}>
            <option value="all">All markers</option>
            <option value="museum">Museums</option>
            <option value="theater">Theaters</option>
            <option value="park">Parks</option>
            <option value="stadion">Stadions</option>
            <option value="gym">Fittness/Gym</option>
          </select>
        </div>
        <hr></hr>
        <div role="listbox" aria-label="selected markers list" className="list-container">
          <h2 className= "listTitle">Markers List </h2>
          <ol className="marker-list">
            {/* Displays a list with the Markers according to the selected filter option */
              this.props.allPlaces.filter(places => places.name.indexOf(this.props.optionId) > -1)
              .map(place =>{
                return (
                  <li className="listItem"
                      tabIndex="0"
                      aria-label="name of the marked place"
                      key={place.id}
                      onClick={(evt) => {
                        this.props.markersList.map(correspondentMarker => {
                          if (correspondentMarker.title === place.name){
                            this.props.updateMarker(correspondentMarker);
                          }else{
                            console.log ("couldn't find  a matched marker");
                          }
                        });
                        this.props.showInfoWindow(place);
                      }}
                  > {place.name}
                  </li>
                )
              })
            }
          </ol>
        </div>
      </aside>
    );
  }
}

export default Sidebar;
