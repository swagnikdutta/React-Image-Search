import React, { Component } from 'react';
// import ReactDOM from 'react-dom';
import './App.css';

// Components
import UserInput from './UserInput';

// Libraries
const axios = require('axios');




class App extends Component{
	constructor(props){
		super(props);
		this.handleKeyword = this.handleKeyword.bind(this);
	}

	// componentDidMount(){
	// 	console.log('Component has been mounted');
	// }

	handleKeyword(search_term){
		// not mine
		// var url = 'https://www.googleapis.com/customsearch/v1?key=AIzaSyD6cZJdS4fjnrRzvM-WlEBeXKCEaBN9bbc&cx=017725526660795934517:_kokdupgki4';

		// mine
		var url = 'https://www.googleapis.com/customsearch/v1?key=AIzaSyC3ztOjElYBVj8q2BSmIKJ4EdXVtDq6R18&cx=000966039869815770295:1ugxnp2e6nw';

		axios.get(url, {
			params: {
				q: search_term,
				start: 1,
				num: 8,
				safe: 'off',
				searchType: 'image'
			}
		})
		.then((response)=>{
			console.log(JSON.stringify(response,undefined,4));
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



