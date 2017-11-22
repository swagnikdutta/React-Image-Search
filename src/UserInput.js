import React, {Component} from 'react';
// import ReactDOM from 'react-dom';
import './'

class UserInput extends Component{
	constructor(props){
		super(props);
		this.state = {
			gate: true,
			value: '',
			keyword: ''
		}

		this.handleClick = this.handleClick.bind(this);
		this.handleChange = this.handleChange.bind(this);
	}

	handleClick(){
		var keyword = this.state.keyword;
		this.props.onKeywordEntered(keyword);
	}

	handleChange(e){
		
		this.setState({
			value: e.target.value
		}, ()=>{

			var enteredText = this.state.value;
			if(enteredText === ''){
				this.setState({gate: true});
			} else {
				this.setState({
					gate: false,
					keyword: enteredText
				});
			}
		});
	}

	render(){
		return(
			<div>
				<input type="text" value={this.state.value} onChange={this.handleChange} />				
				<button onClick={this.handleClick} disabled={this.state.gate}>Search</button>
			</div>
		);
	}
}

export default UserInput;


