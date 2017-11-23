import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './App.css';

import UserInput from './UserInput';

const axios = require('axios');


class App extends Component{
	constructor(props){
		super(props);
		this.state = {
			start: 1,
			imageLinks: []
		}

		this.handleKeyword = this.handleKeyword.bind(this);
	}

	handleKeyword(search_term){
		// not mine
		// var url = 'https://www.googleapis.com/customsearch/v1?key=AIzaSyD6cZJdS4fjnrRzvM-WlEBeXKCEaBN9bbc&cx=017725526660795934517:_kokdupgki4';

		// mine
		var url = 'https://www.googleapis.com/customsearch/v1?key=AIzaSyC3ztOjElYBVj8q2BSmIKJ4EdXVtDq6R18&cx=000966039869815770295:1ugxnp2e6nw';

		axios.get(url, {
			params: {
				q: search_term,
				start: this.state.start,
				num: 8,
				safe: 'off',
				searchType: 'image'
			}
		})
		.then((response)=>{

			var itemsArray = response.data.items;
			// var links = itemsArray.map(item => item.link);
			// this.setState({
			// 	imageLinks: links
			// });

			var listItems = itemsArray.map((item) => 
				<li className="tile" key={item.link}>
					<img src={item.link} alt="Loading"/>
				</li>
			);
			
			ReactDOM.render(
				<ul className="unordered-list">{listItems}</ul>,
				document.getElementById('holder')
			);

		})
		.catch((e)=>{
			console.log(e);
		});
	}

    render(){
        return(
        	
    		<div className="input-component-wrapper">
                <UserInput onKeywordEntered={this.handleKeyword} />
                
            </div>
        	
        );
    }
}

export default App;



