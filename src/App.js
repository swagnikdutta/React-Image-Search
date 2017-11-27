import React, { Component } from 'react';
import './styles/App.css';

// components
import UserInput from './UserInput';
import Tile from './Tile';
import Carousel from './Carousel';

// Libraries
const axios = require('axios');


class App extends Component{

	constructor(props){
		super(props);

		this.state = {
			start: 1,
			imageLinks: [],
			currentCarouselImage: '',
			searchQuery: 'apples' // default
		}

		this.fetchImages = this.fetchImages.bind(this);		
		this.fetchMoreImages = this.fetchMoreImages.bind(this);
		this.makeAPICall = this.makeAPICall.bind(this);
		this.handleTileClick = this.handleTileClick.bind(this);
		this.showPrevImage = this.showPrevImage.bind(this);
		this.showNextImage = this.showNextImage.bind(this);
		this.closeCarousel = this.closeCarousel.bind(this);
	}

	makeAPICall(){

		// not mine
		// var url = 'https://www.googleapis.com/customsearch/v1?key=AIzaSyD6cZJdS4fjnrRzvM-WlEBeXKCEaBN9bbc&cx=017725526660795934517:_kokdupgki4';

		// mine
		var url = 'https://www.googleapis.com/customsearch/v1?key=AIzaSyC3ztOjElYBVj8q2BSmIKJ4EdXVtDq6R18&cx=000966039869815770295:1ugxnp2e6nw';

		axios.get(url, {
			params: {
				q: this.state.searchQuery,
				start: this.state.start,
				num: 8,
				safe: 'off',
				searchType: 'image'
			}
		})
		.then((response)=>{

			var links = response.data.items.map(item => item.link);
			this.setState({
				imageLinks: this.state.imageLinks.concat(links)
			});

		})
		.catch((e)=>{
			console.log(e);
		});
	}


	fetchImages(search_term){
		
		// For every new query, set the 'searchQuery' variable and clear 'imageLinks' array
		this.setState({
			imageLinks: [],
			searchQuery: search_term
		},()=>{
			this.makeAPICall();
		});
	}


	fetchMoreImages(){
		
		// Fetch more images of the same searchQuery, just increase the start parameter.
		this.setState((prevState, props) => ({
			start: prevState.start + 8
		}), ()=>{
			this.makeAPICall();
		});	
	}


	handleTileClick(imageSource){
		this.setState({
			currentCarouselImage: imageSource,
		});
	}


	showPrevImage(imageSrc){
		
		var newImageIndex;
		var arraySize = this.state.imageLinks.length;

		this.state.imageLinks.forEach((element, i)=>{
			if(element === imageSrc){
				newImageIndex = (i-1) < 0 ? arraySize-1 : (i-1);
			}
		})
		this.setState({
			currentCarouselImage: this.state.imageLinks[newImageIndex]
		});
	}


	showNextImage(imageSrc){

		var newImageIndex;
		var arraySize = this.state.imageLinks.length;

		this.state.imageLinks.forEach((element, i)=>{
			if(element === imageSrc){
				newImageIndex = (i+1) % arraySize;
			}
		})
		this.setState({
			currentCarouselImage: this.state.imageLinks[newImageIndex]
		});
	}


	closeCarousel(){
		this.setState({
			currentCarouselImage: ''
		});
	}
	

    render(){
        return(
        	<div id="parent">

	    		<div className="input-component-wrapper">
	                <UserInput onKeywordEntered={this.fetchImages} />
				</div>


				<div className="tile-component-wrapper">
	                {
	                	this.state.imageLinks.map((link, i) => {
							return <Tile key={link} source={link} onTileClick={this.handleTileClick} />
						})
					}
	            </div>


	            <div className="loadmore-button-wrapper" 
	            	 style={{display: this.state.imageLinks.length !== 0 ? '' : 'none'}}>
	            	<button onClick={this.fetchMoreImages}>Load more</button>
	            </div>


	            <div className="carousel-component-wrapper">
		            {
						this.state.currentCarouselImage === '' ? 
							null : 
							<Carousel src={this.state.currentCarouselImage} 
									showPrevImage={this.showPrevImage} 
									showNextImage={this.showNextImage} 
									onCloseCarousel={this.closeCarousel} />
		            }
	            </div>

        	</div>
        );
    }
}

export default App;



