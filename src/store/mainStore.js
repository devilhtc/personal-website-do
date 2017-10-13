import {createStore} from 'redux'

function switchView(state = {view: "HOME"} , action) {
	if (action.type==='SWITCH_VIEW') {
		return {view: action.payload}
	} else {
		return {view: state.view}
	}
}

let store = createStore(switchView)

store.subscribe(()=>console.log(store.getState()))

export default store