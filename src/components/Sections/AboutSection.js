// src/components/Sections/AboutSection.js
import React from 'react'
import {connect} from 'react-redux'
import styles from './Sections.css'
import Panel from '../Panel/Panel'
import Footer from '../Footer/Footer'

const bgImgUrl = "./img/oval.jpg"
const fontColor = "white"

class AboutSection extends React.Component {
	render() {
		return (
			<div>
				<Panel primaryText = {"About"} bgImgUrl = {bgImgUrl} fontColor = {fontColor}/>

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
)(AboutSection)