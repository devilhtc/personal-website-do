import {createStore, combineReducers} from 'redux'
import {view, totalWidth, owner} from './reducers'


var combined = combineReducers({view, totalWidth, owner})
let store = createStore(combined)

store.subscribe( ()=>console.log(store.getState()) )

export default store