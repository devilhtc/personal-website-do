// src/components/TrialComponent.js
import React from 'react'
import {connect} from 'react-redux'
import NavBar from '../NavBar/NavBar'

class MyApp extends React.Component {
	render() {
    window.onresize = this.props.windowResize

		return (
			<div>
				<NavBar />
			</div>
		)
	}
}

const mapStateToProps = (state) => {
  return {
    view:state.view
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    switchView: (v) => dispatch({
   		type:"SWITCH_VIEW",
      payload:v
    }),
    windowResize: () => dispatch({
      type:"CHANGE_WIDTH"
    })
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MyApp)