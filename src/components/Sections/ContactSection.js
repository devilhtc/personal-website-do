// src/components/Sections/ContactSection.js
import React from 'react'
import {connect} from 'react-redux'
import styles from './Sections.css'
import Panel from '../Panel/Panel'
import Footer from '../Footer/Footer'
import AnimateSection from './AnimateSection'
import LinkPad from '../Links/LinkPad'
import SectionSeparator from './SectionSeparator'
import Utils from '../utils'
import axios from 'axios'

const bgImgUrl = "/static/img/abstract2.jpg"
const fontColor = "white"
const socialLinkNumCols = 8
const linkMargin = 20
const linkPadSize = 75
const primaryText = "Connect"
const secondaryText = "Let's have a chat!"
const socialLinksWidthProp = 0.8

const basicContactInfoList  = [
	["Email", "th7@stanford.edu"],
	["Phone", "919 813 9323"],
	["Skype", "devilhtc@outlook.com"],
	["Address", "723 Sierra Vista Ave, Mountain View"]
]

class BasicContactInfoLine extends React.Component {
	render() {
		const title = this.props.title
		const content = this.props.content

		const titleES = {
			textAlign: 'right',
			marginRight: '20px'
		}
		const contentES = {
			textAlign: 'left'
		}
		const lineES = {
			display: 'grid',
			gridTemplateColumns: '7fr 1px 8fr',
			margin: '2px'
		}
		return (
			<div style = {lineES}>
				<div style = {titleES}> {title} </div>
				<div> </div>
				<div style = {contentES}> {content} </div>
		    </div>
	    )
	}
}

class BasicContantInfo extends React.Component {
	render() {
		const infoList = this.props.infoList
		const infoSectionES = {
			display: 'flex',
			flexDirection: 'column'
		}
		const infoListLines = infoList.map((item, index) => {
			return (
				<BasicContactInfoLine 
					key = {item[0] + index} 
					title = {item[0]} 
					content = {item[1]}
				/>
			)
		})

		return (
			<div style = {infoSectionES} className = {styles.basicContactInfo}>
				{infoListLines}
			</div>
		)
	}
}

class ContactSection extends React.Component {
	render() {
		const contactPanel = (
			<Panel 
				primaryText = {primaryText} 
				secondaryText = {secondaryText} 
				bgImgUrl = {bgImgUrl} 
				fontColor = {fontColor}
			/>
		)
		
		const socialLinks = this.props.socialLinks
		const totalWidth = this.props.totalWidth
		const sectionWidth = totalWidth * this.props.widthProportion 
		const socialLinksWidth = sectionWidth * socialLinksWidthProp
		const socialLinksMargin = sectionWidth * (1 - socialLinksWidthProp) / 2
		const linkBoxWidth = socialLinksWidth / socialLinkNumCols
		const linkBoxES = {
			margin: linkMargin + 'px auto',
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
			width: socialLinksWidth + 'px',
			marginLeft: socialLinksMargin + 'px',
			marginRight: socialLinksMargin + 'px',
			display: 'grid',
			gridTemplateColumns: frNumCols.join(' '),

		}

		const socialLinksDiv = (
			<div style = {SocialLinksES}> 
				{socialLinksList}
			</div>
		)

		const inners = (
			<div>
				{contactPanel}

				<SectionSeparator />

				<div className = {styles.sectionSubtitles}> Basic Contact Info </div>

				
				<BasicContantInfo infoList = {basicContactInfoList} />
				
				<SectionSeparator />

				<div className = {styles.sectionSubtitles}> Other Links </div>

				{socialLinksDiv}

				<SectionSeparator />

				<Footer />
			</div>
		)
		return (
			<AnimateSection content = {inners}/>
		)
	}

	componentDidMount() {
		if (!this.props.socialLinksFetched) {
			var self = this
			var dataUrl = '/data/sociallinks'
			axios.get(dataUrl)
				.then( (response) => {
					console.log('received data from '+ dataUrl)
					console.log(response.data)
					self.props.updateSocialLinks(response.data)
				})
				.catch( (err) => {
					console.log(err)
				})
		}
	}
}

const mapStateToProps = (state) => {
  return {
    totalWidth: state.totalWidth,
    socialLinks: state.bio.socialLinks,
    socialLinksFetched: state.bio.socialLinksFetched,
    widthProportion: state.constants.widthProportion
  }
}

const mapDispatchToProps = (dispatch) => {
  	return {
  		updateSocialLinks: (v) => {
  			dispatch({
  				type: 'UPDATE_SOCIAL_LINKS',
  				payload: v
  			})
  		}
  	}
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ContactSection)