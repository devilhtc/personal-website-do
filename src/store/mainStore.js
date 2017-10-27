import {createStore, combineReducers} from 'redux'
import {view, totalWidth, constants, bio} from './reducers'

var combined = combineReducers({
	view, 
	totalWidth, 
	constants, 
	bio
})

let store = createStore(combined)

store.subscribe( 
	() => {
		console.log( 
			store.getState() 
		)
	}
)

export default store