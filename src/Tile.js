import React, { Component } from 'react';
// import ReactDOM from 'react-dom';
import './styles/Tile.css';

class Tile extends Component{
	
	render(){
		return(
			<div className="tile-container">
				<img src={this.props.source} alt="Loading"/>
			</div>
		);
	}
	
}

export default Tile;
