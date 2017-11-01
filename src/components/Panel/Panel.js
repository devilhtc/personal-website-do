// src/components/Panel/Panel.js
import React from 'react'
import {connect} from 'react-redux'
import styles from './Panel.css'

const primaryTextFontSize = 140
const secondaryTextFontSize = 32
const defaultPrimaryText = "Highlight"
const defaultSecondaryText = "More explanatory text"
const defaultImgUrl = "./img/wolf.png"
const defaultFontColor = "white"
const whRatio = 8.1/13

const priShadowX = 12
const priShadowY = 15
const secShadowX = 6
const secShadowY = 8
const priShadowRadius = 20
const secShadowRadius = 10
const minBlur = 0.6
const textOpacity = 0.99

class Panel extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			priTextShadow : {
				textShadow: '0 3px 20px rgba(0,0,0,0.7)'
			},
			secTextShadow : {
				textShadow: '0 1px 10px rgba(0,0,0,0.7)'
			}
		}
		this.shadowMoveListener = this.shadowMoveListener.bind(this)
		this.shadowLeaveListener = this.shadowLeaveListener.bind(this)
	}

	render() {
		const panelWidthProportion = this.props.widthProportion
		const panelHeightProportion = panelWidthProportion*whRatio
		const totalWidth = this.props.totalWidth
		const priText = this.props.primaryText || defaultPrimaryText
		const secText = this.props.secondaryText || defaultSecondaryText
		const bgImgUrl = this.props.bgImgUrl || defaultImgUrl
		const panelFontColor = this.props.fontColor || defaultFontColor
		const panelHeight =  totalWidth*panelHeightProportion
		const priTop = panelHeight*0.46
		const secTop = panelHeight*0.49
		
		const panelES = {
			backgroundImage:'url("'+bgImgUrl+'")',
			backgroundSize: '100%',
			height: panelHeight+ 'px',
			overflow: 'hidden',
			position: 'relative',
			color: panelFontColor,
			backgroundBlendMode: 'lighten'
		}

		const priES = {
			top: priTop + 'px',
			width: totalWidth*panelWidthProportion + 'px',
			fontSize: primaryTextFontSize + 'px',
			opacity: textOpacity +''
			//transition: 'text-shadow 50ms ease-in'
		}
		Object.assign(priES, this.state.priTextShadow)
		const secES = {
			top: secTop + 'px',
			width: totalWidth*panelWidthProportion+ 'px',
			fontSize: secondaryTextFontSize + 'px',
			opacity: textOpacity +''
			//transition: 'text-shadow 50ms ease-in'
		}
		Object.assign(secES, this.state.secTextShadow)
		//onMouseMove = {this.shadowMoveListener}
		return (
			<div ref = "panelRef" onMouseLeave = {this.shadowLeaveListener} className = {styles.panelAll} style = {panelES}>
				<div className = {styles.panelPrimary} style = {priES} > {priText} </div>
				<div className = {styles.panelSecondary} style = {secES} > {secText} </div>
			</div>
		)
	}


	shadowLeaveListener(e) {
		e.stopPropagation();
		this.setState({
			priTextShadow : {
				textShadow: '0 3px 20px rgba(0,0,0,0.7)',
				transition: 'text-shadow 300ms ease-in-out'
			},
			secTextShadow : {
				textShadow: '0 1px 10px rgba(0,0,0,0.7)',
				transition: 'text-shadow 300ms ease-in-out'
			}
		})
	}

	shadowMoveListener(e) {
		const panelWidthProportion = this.props.widthProportion
		const panelHeightProportion = panelWidthProportion*whRatio
		//let ct = this.refs.panelRef
		let ct = e.currentTarget
		/*
		console.log(e.clientX)		
		console.log(e.clientX)
		console.log(e.clientY)		
		console.log(ct)
		console.log(ct.offsetLeft)
		console.log(ct.offsetTop)
		console.log(window.scrollX)
		console.log(window.scrollY)
		*/
		let leftMargin = this.props.totalWidth / 14
		let topMargin = 0
		let panelWidth = this.props.totalWidth * 6 / 7
		let panelHeight = this.props.totalWidth * panelHeightProportion
		let hp = (window.scrollX + e.clientX -  leftMargin) / panelWidth
		let vp = (window.scrollY + e.clientY - topMargin) /panelHeight
		/*
		console.log(horizontalProportion)
		console.log(verticalProportion)
		*/
		let shadows = [ 
			-(hp - 0.5)/0.5 * priShadowX,
			-(vp - 0.6)/0.6 * priShadowY,
			-(hp - 0.5)/0.5 * secShadowX,
			-(vp - 0.6)/0.6 * secShadowY
		]

		let sp = (hp - 0.5)* (hp - 0.5) + (vp - 0.6)*(vp - 0.6) 
		let priFinalBlur = priShadowRadius * (minBlur + (1-minBlur)*sp   )
		let secFinalBlur = secShadowRadius * (minBlur + (1-minBlur)*sp   )

		let curPriShadow = {
			textShadow: shadows[0]+ 'px ' + shadows[1] +'px '+priFinalBlur+'px rgba(0,0,0,0.6)'
		}
		let curSecShadow = {
			textShadow: shadows[2]+ 'px ' + shadows[3] +'px '+secFinalBlur+'px rgba(0,0,0,0.6)'
		}

		this.setState({
			priTextShadow: curPriShadow,
			secTextShadow: curSecShadow
		})

	}
		
}

const mapStateToProps = (state) => {
  return {
    totalWidth: state.totalWidth,
    widthProportion: state.constants.widthProportion
  }
}

const mapDispatchToProps = (dispatch) => {
  	return {}
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Panel)