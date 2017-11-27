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
			// imageLinks: [
			// 	"http://cdn.history.com/sites/2/2017/03/GettyImages-157278376.jpg",
			// 	"https://news.nationalgeographic.com/content/dam/news/2016/10/17/jia-jia/01-panda-jia-jia.jpg",
			// 	"http://cdn.history.com/sites/2/2015/04/HITH-When-Pandamonium-Hit-US-Getty460935005.jpg",
			// 	"https://i.ytimg.com/vi/4NJlUribp3c/maxresdefault.jpg",
			// 	"https://www.nationalgeographic.com/content/dam/magazine/rights-exempt/2016/08/pandas/cover.jpg",
			// 	"http://cdn.cnn.com/cnnnext/dam/assets/170210101016-bao-bao-panda-final-checkup-orig-jh-00002619-full-169.jpg",
			// 	"https://www.nationalgeographic.com/content/dam/magazine/rights-exempt/2016/08/departments/panda-mania-12.jpg",
			// 	"https://blogs.scientificamerican.com/thoughtful-animal/files/2014/01/red-panda-and-baby.jpg"
			// ],
			carouselVisible: false,
			currentCarouselImage: '',
			searchQuery: 'apples' // default
		}

		this.fetchImages = this.fetchImages.bind(this);		
		this.fetchMoreImages = this.fetchMoreImages.bind(this);
		this.makeAPICall = this.makeAPICall.bind(this);
		this.handleTileClick = this.handleTileClick.bind(this);
		this.showPrevImage = this.showPrevImage.bind(this);
		this.showNextImage = this.showNextImage.bind(this);
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
			carouselVisible: !this.state.carouselVisible
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
							<Carousel src={this.state.currentCarouselImage} showPrevImage={this.showPrevImage} showNextImage={this.showNextImage} />
		            }
	            </div>

        	</div>
        );
    }
}

export default App;



