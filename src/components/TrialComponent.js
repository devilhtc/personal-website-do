// src/components/TrialComponent.js
import React from 'react'
import {connect} from 'react-redux'

class TrialComponent extends React.Component {
	render() {
		return (
			<div>
				<h1> Simple Trial {this.props.count}</h1>
				<button onClick={()=>{ this.props.clickListener('INC')} }> increment </button>
				<button onClick={()=>{ this.props.clickListener('DEC')} }> decrement </button>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
  return {
    count:state
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
      clickListener: (t) => dispatch({
   		type:t
    })
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TrialComponent)