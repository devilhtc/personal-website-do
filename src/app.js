import React from 'react' 
import ReactDOM from 'react-dom'
import TrialComponent from './components/TrialComponent'
import App from './components/MyApp/MyApp'
import {Provider} from 'react-redux'
import store from './store/mainStore'

ReactDOM.render(<Provider store={store}><App/></Provider>,  document.getElementById("app"));