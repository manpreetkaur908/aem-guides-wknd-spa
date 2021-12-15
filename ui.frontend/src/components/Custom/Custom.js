import React, { Component } from 'react';
import { MapTo } from '@adobe/aem-react-editable-components';

export const CustomEditConfig = {

	emptyLabel: 'Custom',

	isEmpty: function(props) {
		return !props || !props.message || props.message.trim().length < 1;
	}
};

export default class Custom extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			name: '',
			number: '',
			errorName: false,
			errorNumber: '',
			result: ''
		};

		this.handleNumberChange = this.handleNumberChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleNameChange = this.handleNameChange.bind(this);
	}
	handleNameChange(event) {
		this.setState({
			name: event.target.value
		});
	}

	handleNumberChange(event) {
		if (event.target.value.includes(".")) {
			this.setState({
				errorNumber: "Decimals are not allowed."
			});
		}

		this.setState({
			number: event.target.value
		});

	}


	handleSubmit(event) {
		event.preventDefault();
		if (this.state.name.length == 0 && (this.state.number.length > 11 || this.state.number.length == 0)) {
			this.setState({
				errorName: true
			});
			this.setState({
				errorNumber: "Please provide valid input."
			});
		} else if (this.state.name.length == 0) {
			this.setState({
				errorNumber: ''
			});
			this.setState({
				errorName: true
			});
		} else if (this.state.number.includes(".")) {
			this.setState({
				errorName: false
			});
			this.setState({
				errorNumber: "Decimals are not allowed."
			});
		} else if (this.state.number.length == 0 || this.state.number.length > 10) {
			this.setState({
				errorName: false
			});
			this.setState({
				errorNumber: "The length of number field should be between 1 and 10."
			});
		} else {
			this.setState({
				errorName: false
			});
			this.setState({
				errorNumber: ''
			});
			const url = '/bin/akqaform'
			const number = this.state.number;
			const requestOptions = {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					number
				})
			};
			fetch(url, requestOptions)
				.then((response) => response.json()).then((json) => {
					this.setState({
						result: json
					})
				})
				.catch(error => console.log('Form submit error', error))
		}
	}
    render() {
    const mystyle = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: "150px",
    width: "400px",
    paddingLeft: "300px",
    };

    const error = {
      paddingLeft: "70px",
      color: "red",
    };
        if(CustomEditConfig.isEmpty(this.props)) {
            return null;
        }

        return (
	<form onSubmit={this.handleSubmit}>
		<div style={{backgroundColor: "#D3D3D3", height: "500px"}}>
		<div style={mystyle}>
		<label><b>AKQA Form</b></label> &nbsp; &nbsp;  &nbsp;
		<div style={{alignItems:"left"}}>
		<div>
		<label><b>Name: </b></label> &nbsp; &nbsp;  &nbsp;
		<input type="text" name="name" value={this.state.name} onChange={this.handleNameChange}/>
		<br />
		{this.state.errorName &&
		<p style={error}>Please provide valid input </p>
	}
    </div> <br />
    <div>
    <label> <b>Number: </b></label> &nbsp;
    <input type="number" name="number" value={this.state.number} onChange={this.handleNumberChange} />
    {this.state.errorNumber &&
    <p style={error}>{this.state.errorNumber} </p>
	}
    </div><br />
    </div>
    <input type="submit" value="Submit" />
    </div>
	{
		this.state.result &&    <p style={{color: "green", paddingLeft: "70px", textAlign: "center"}}>The name is : {this.state.name} and the number converted to word is : {this.state.result}</p>
	}
    </div>
    </form>
  );   
 }
}
MapTo('wknd-spa-react/components/custom-component')(Custom, CustomEditConfig);
