// src/components/Panel/Panel.js
import React from 'react'
import {connect} from 'react-redux'
import styles from './Panel.css'


class Panel extends React.Component {
	render() {
		return (
			<div>
				Panel
			</div>
		)
	}
}

const mapStateToProps = (state) => {
  return {
    totalWidth: state.totalWidth
  }
}

const mapDispatchToProps = (dispatch) => {
  	return {}
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Panel)