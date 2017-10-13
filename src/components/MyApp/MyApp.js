// src/components/TrialComponent.js
import React from 'react'
import {connect} from 'react-redux'

class MyApp extends React.Component {
	render() {
    var viewList = ["HOME", "ABOUT", "PROJECTS", "CONTACT"].map(
      (item) => {
        return (<div key = {item} onClick = {()=>{this.props.switchView(item)}}> {item} </div>)
      }
    )
		return (
			<div>
				<div> {this.props.view} </div>
        {viewList}
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
    })
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MyApp)