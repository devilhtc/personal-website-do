// src/store/reducer.js

// define default states 
// and their correspoding reducers


const startingWidth = Math.max(window.innerWidth, 1400)
const myName = {
	firstName: "zibo", 
	lastName:"gong"
}
const navHeight = 70

export const view = (state = "HOME" , action) => {
	if (action.type === 'SWITCH_VIEW') {
		return action.payload
	}
	return state
}

export const totalWidth = (state = startingWidth, action) => {
	if (action.type === 'CHANGE_WIDTH') {
		return Math.max(window.innerWidth, 1400)
	} 
	return state
}



const constantState = {
	owner: myName,
	navHeight: navHeight
}

export const constants = (state = constantState) => {
	return state
}