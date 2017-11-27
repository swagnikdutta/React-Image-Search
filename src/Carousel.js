import React, { Component } from 'react';
import './styles/Carousel.css';

class Carousel extends Component{

	constructor(){

		super();
		this.showNext = this.showNext.bind(this);
		this.showPrev = this.showPrev.bind(this);
	}

	showPrev(imageSrc){
		this.props.showPrevImage(imageSrc);
	}

	showNext(imageSrc){
		this.props.showNextImage(imageSrc);
	}

	render(){

		return(
			<div className="carousel-wrapper">

				<div className="navigate-left">
					<i className="ion-chevron-left" onClick={() => {this.showPrev(this.props.src)}}></i>
				</div>
				
				<div className="image-container">
					<img src={this.props.src} alt="Loading Carousel"/>
				</div>

				<div className="navigate-right">
					<i className="ion-chevron-right" onClick={() => {this.showNext(this.props.src)}}></i>
				</div>
			</div>
		);
	}
}

export default Carousel;