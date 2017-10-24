// src/components/Footer/Footer.js
// should be applied to every view
import React from 'react'
import {connect} from 'react-redux'
import styles from './Footer.css'

const footerNameFontSize = 20
const footerCFontSize = 14
const footerContentPadding = 5

class Footer extends React.Component {
	render() {
		const footerHeight = this.props.navHeight
		const totalWidth = this.props.totalWidth
		const footerWidth = this.props.totalWidth*this.props.widthProportion
		const OwnerName = (this.props.owner.firstName + " " + this.props.owner.lastName)
		const footerES = {
			width: footerWidth + 'px'
		}

		const footerNameES = {
			fontSize: footerNameFontSize + 'px',
			padding: footerContentPadding + 'px',
			paddingTop: 4 * footerContentPadding + 'px'
		}

		const footerCES = {
			fontSize: footerCFontSize + 'px',
			padding: footerContentPadding + 'px',
			paddingBottom: 4 * footerContentPadding + 'px'
		}

		return (
			<div className = {styles.footerAll} style = {footerES} >
			    <div style = {footerNameES}>
			    	{OwnerName}
			    </div> 

			    <div className = {styles.footerC} style = {footerCES}>
			    	©2017.  All rights reserved. 
			    </div>
			</div>
		)
	}
}


const mapStateToProps = (state) => {
  return {
    totalWidth: state.totalWidth,
    owner: state.constants.owner,
    navHeight: state.constants.navHeight,
    widthProportion: state.constants.widthProportion
  }
}

const mapDispatchToProps = (dispatch) => {
	return {}
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Footer)