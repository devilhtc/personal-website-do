// src/components/TrialComponent.js
import React from 'react';
import store from '../../store/mainStore.js';

export default class TrialComponent extends React.Component {
	render() {
		return (
			<div>
				<h1> Simple Trial {store.getState()}</h1>
				<button onclick={store.dispatch({type:'INC'})}> increment </button>
				<button onclick={store.dispatch({type:'DEC'})}> decrement </button>
			</div>
		);
	}


}