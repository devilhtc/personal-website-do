// src/store/reducer.js

// define default states 
// and their correspoding reducers

export const view = (state = "HOME" , action) => {
	if (action.type === 'SWITCH_VIEW') {
		return action.payload
	}
	return state
}

export const totalWidth = (state = window.innerWidth, action) => {
	if (action.type === 'CHANGE_WIDTH') {
		return window.innerWidth
	}
	return state
}

export const owner = (state = {firstName: "Tianchang", lastName:"He"}, action) => {
	return state
}