// src/store/reducer.js

// define default states 
// and their correspoding reducers

//import myProjects from './projectList'
//import educationList from './educationList'
import socialLinks from './socialMediaList'

const startingWidth = Math.max(window.innerWidth, 1400)
const myName = {
	firstName: "Kevin", 
	lastName:"He" 
}

const navHeight = 70
var defaultView = "HOME"
if (window.location.hash.length > 2) {
	defaultView = window.location.hash.substring(2).toUpperCase()
}


const constantState = {
	owner: myName,
	navHeight: navHeight,
	widthProportion: 6/7
}

const myBio = {
	projects: [],
	education: [],
	socialLinks: socialLinks
}

const minWidth = 1200

export const view = (state = defaultView , action) => {
	if (action.type === 'SWITCH_VIEW') {
		let payload = action.payload
		if (payload == "HOME") {
			window.location.replace("#/")
		} else {
			window.location.replace("#/"+payload.toLowerCase())
		}
		return action.payload
	}
	return state
} 

export const totalWidth = (state = startingWidth, action) => {
	if (action.type === 'CHANGE_WIDTH') {
		return Math.max(window.innerWidth, minWidth)
	} 
	return state
}

export const bio = (state = myBio, action) => {
	var newState = JSON.parse(JSON.stringify(state))
	if (action.type === 'UPDATE_EDUCATION_LIST') {
		Object.assign(newState, {education: action.payload})
	} 
	if (action.type === 'UPDATE_PROJECT_LIST') {
		Object.assign(newState, {projects: action.payload})
	}
	return newState
}

export const constants = (state = constantState, action) => {
	return state
}