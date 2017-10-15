import React from 'react' 
import ReactDOM from 'react-dom'
import TrialComponent from './components/TrialComponent'
import MyApp from './components/MyApp/MyApp'
import {Provider} from 'react-redux'
import store from './store/mainStore'

ReactDOM.render(<Provider store={store}>
					<MyApp/>
				</Provider>,  document.getElementById("app"));