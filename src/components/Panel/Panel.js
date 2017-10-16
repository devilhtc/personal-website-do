// src/components/Panel/Panel.js
import React from 'react'
import {connect} from 'react-redux'
import styles from './Panel.css'

const primaryTextFontSize = 150
const secondaryTextFontSize = 32
const defaultPrimaryText = "Highlight"
const defaultSecondaryText = "More explanatory text"
const defaultImgUrl = "./img/wolf.png"

class Panel extends React.Component {
	render() {
		const totalWidth = this.props.totalWidth
		const priText = this.props.primaryText || defaultPrimaryText
		const secText = this.props.secondaryText || defaultSecondaryText
		const bgImgUrl = this.props.bgImgUrl || defaultImgUrl
		const panelHeight =  totalWidth*6/7*8.1/13
		const priTop = panelHeight*0.46
		const secTop = panelHeight*0.51

		const panelES = {
			backgroundImage:'url("'+bgImgUrl+'")',
			backgroundSize: '100%',
			height: panelHeight+ 'px',
			overflow: 'hidden',
			position: 'relative'
		}

		const priES = {
			top:  priTop + 'px',
			width: totalWidth*6/7 + 'px',
			fontSize: primaryTextFontSize + 'px'
		}

		const secES = {
			top: secTop + 'px',
			width: totalWidth*6/7+ 'px',
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