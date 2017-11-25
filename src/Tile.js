import React, { Component } from 'react';
// import ReactDOM from 'react-dom';
import './styles/Tile.css';

class Tile extends Component{
	// constructor(){
	// 	super();

	// 	this.handleTileClick = this.handleTileClick.bind(this);
	// }

	// handleTileClick(e){
	// 	console.log(e);
	// }
	
	render(){
		return(
			<div className="tile-container" >
				<img src={this.props.source} alt="Loading"/>
			</div>
		);
	}
	
}

export default Tile;
