import {createStore, combineReducers} from 'redux'
import {view, totalWidth, constants} from './reducers'

var combined = combineReducers({view, totalWidth, constants})
let store = createStore(combined)

store.subscribe( 
	() => {
		console.log( 
			JSON.stringify(store.getState() ) 
		)
	}
)

export default store