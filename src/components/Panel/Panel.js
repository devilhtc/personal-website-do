// src/components/Panel/Panel.js
import React from 'react'
import {connect} from 'react-redux'
import styles from './Panel.css'

const primaryTextFontSize = 90
const secondaryTextFontSize = 26
const defaultPrimaryText = "This is the highlightet text"
const defaultSecondaryText = "More explanatory text that brings flavor to the design"
const defaultImgUrl = "./img/wolf.png"

class Panel extends React.Component {
	render() {
		const totalWidth = this.props.totalWidth
		const priText = this.props.primaryText || defaultPrimaryText
		const secText = this.props.secondaryText || defaultSecondaryText
		const bgImgUrl = this.props.bgImgUrl || defaultImgUrl
		const panelHeight =  totalWidth*6/7*8.1/13

		const panelES = {
			backgroundImage:'url("'+bgImgUrl+'")',
			backgroundSize: '100%',
			height: panelHeight+ 'px',
			overflow: 'hidden'
		}

		const priES = {
			top: panelHeight/2 - 14 + 'px',
			left: totalWidth*6/7/4,
			width: totalWidth*6/7/2 + 'px',
			fontSize: primaryTextFontSize + 'px'
		}

		const secES = {
			top: panelHeight*0.70 + 'px',
			left: totalWidth*6/7/6,
			width: totalWidth*6/7*2/3 + 'px',
			fontSize: secondaryTextFontSize + 'px'
		}

		return (
			<div style = {panelES}>
				<div className = {styles.panelPrimary} style = {priES} > {priText} </div>
				<div className = {styles.panelSecondary} style = {secES} > {secText} </div>
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