// src/components/Sections/HomeSection.js
import React from 'react'
import {connect} from 'react-redux'
import styles from './Sections.css'
import Panel from '../Panel/Panel'
import Footer from '../Footer/Footer'

const bgImgUrl = "./img/wolf2.png"
const fontColor = "white"

class HomeSection extends React.Component {
	render() {
		return (
			<div>
				<Panel primaryText = {"Home"} bgImgUrl = {bgImgUrl} fontColor = {fontColor} />

				<div>  </div>

				<Footer />
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
)(HomeSection)