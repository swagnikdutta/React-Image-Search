import React, { Component } from 'react';
import './styles/Carousel.css';

class Carousel extends Component{

	constructor(){

		super();
		this.showNext = this.showNext.bind(this);
		this.showPrev = this.showPrev.bind(this);
		this.closeIconClicked = this.closeIconClicked.bind(this);
	}

	showPrev(imageSrc){
		this.props.showPrevImage(imageSrc);
	}

	showNext(imageSrc){
		this.props.showNextImage(imageSrc);
	}

	closeIconClicked(){
		this.props.onCloseCarousel();
	}

	render(){

		return(
			<div className="carousel-wrapper">

				<i className="ion-chevron-left" onClick={() => {this.showPrev(this.props.src)}}></i>
				
				<div className="image-container">
					<img src={this.props.src} alt="Loading Carousel"/>
				</div>

				<i className="ion-chevron-right" onClick={() => {this.showNext(this.props.src)}}></i>
					
				<i className="ion-close-round" onClick={this.closeIconClicked}></i>
				
			</div>
		);
	}
}

export default Carousel;