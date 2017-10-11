// src/components/TrialComponent.js
import React from 'react';
import store from '../store/mainStore';

export default class TrialComponent extends React.Component {
	constructor() {
		super();
		this.state={count: store.getState()};
	}

	render() {
		var clickListener = function(t) {
			store.dispatch({type:t});
			this.setState({count:store.getState()});
		}
		clickListener=clickListener.bind(this);
		return (
			<div>
				<h1> Simple Trial {this.state.count}</h1>
				<button onClick={()=>{ clickListener('INC')} }> increment </button>
				<button onClick={()=>{clickListener('DEC')} }> decrement </button>
			</div>
		);
	}
}