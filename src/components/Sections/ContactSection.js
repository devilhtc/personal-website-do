// src/components/Sections/ContactSection.js
import React from 'react'
import {connect} from 'react-redux'
import styles from './Sections.css'
import Panel from '../Panel/Panel'
import Footer from '../Footer/Footer'
import AnimateSection from './AnimateSection'
import LinkPad from '../Links/LinkPad'

const bgImgUrl = "./img/abstract2.jpg"
const fontColor = "white"
const socialLinkNumCols = 8
const linkMargin = 20
const linkPadSize = 80
class ContactSection extends React.Component {
	render() {
		const contactPanel = (
			<Panel 
				primaryText = {"Contact"} 
				bgImgUrl = {bgImgUrl} 
				fontColor = {fontColor}
			/>
		)
		
		const socialLinks = this.props.socialLinks
		const totalWidth = this.props.totalWidth
		const sectionWidth = totalWidth * this.props.widthProportion * 1
		const linkBoxWidth = sectionWidth / socialLinkNumCols
		const linkBoxES = {
			margin: linkMargin + 'px auto'
		}
		const socialLinksList = socialLinks.map( (item, index) => {
			return (
					<div style = {linkBoxES} key = {item.name + index} >
						<LinkPad 
							link = {item.link} 
							iconUrl = {item.iconUrl} 
							bgColor = {item.bgColor}
							defaultSize = {linkPadSize}
						/>
					</div>
					)
		})
		const frNumCols = Array.from(
			new Array(socialLinkNumCols), 
			(item, index) => index + 1
		).map(
			(item) => {return linkBoxWidth + 'px'}
		)

		const SocialLinksES = {
			display: 'grid',
			paddingTop: 0 + 'px',
			paddingBottom: 0 + 'px',
			gridTemplateColumns: frNumCols.join(' ')
		}

		const socialLinksDiv = (
			<div style = {SocialLinksES}> 
				{socialLinksList}
			</div>
		)

		const inners = (
			<div>
				{contactPanel}

				{socialLinksDiv}

				<Footer />
			</div>
		)
		return (
			<AnimateSection content = {inners}/>
		)
	}
}

const mapStateToProps = (state) => {
  return {
    totalWidth: state.totalWidth,
    socialLinks: state.bio.socialLinks,
    widthProportion: state.constants.widthProportion
  }
}

const mapDispatchToProps = (dispatch) => {
  	return {}
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ContactSection)