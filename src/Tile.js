import React, { Component } from 'react';
import './styles/Tile.css';


class Tile extends Component{

	constructor(props){
		super(props);
		this.onTileClicked = this.onTileClicked.bind(this);
	}

	onTileClicked(imageSource){
		this.props.onTileClick(imageSource);
	}
	
	render(){
		return(
			<div className="tile-container" onClick={() => { this.onTileClicked(this.props.source) }}>
				<img src={this.props.source} alt="Loading" />
			</div>
		);
	}
}

export default Tile;


