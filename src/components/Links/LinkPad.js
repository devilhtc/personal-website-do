import React from 'react'
import styles from './Links.css'

class LinkPad extends React.Component {
	constructor(props) {
		super(props)
	}

	render() {
		const defaultSize = this.props.defaultSize || 100
		const link = this.props.link || "https://github.com/devilhtc"
		const iconUrl = this.props.iconUrl || ""
		//iconUrl = "./img/social-media-links/github-icon-formatted.png"
		const bgColor = this.props.bgColor || "#6e328f"
		const padHaloES = {
			position: 'absolute',
			width: defaultSize + 'px',
			height: defaultSize + 'px',
			borderRadius: defaultSize/2 + 'px',
			//borderStyle: 'inset',
			//borderImage: 'radial-gradient(' + bgColor + ' 0%, ' + bgColor + ' 50%, rgba(0,0,0,0) 100%)',
			backgroundColor : bgColor
		}

		const padContainerES = {
			position: 'relative',
			width: defaultSize + 'px',
			height: defaultSize + 'px'
		}

		const iconES = {
			backgroundImage: 'url("'+iconUrl+'")',
			backgroundSize: '100%',
			borderRadius: defaultSize/2 + 'px',
			backgroundRepeat: 'no-repeat',
			width: '100%',
			height: '100%',
			zIndex: '3',
			opacity: '1'
		}
		return (
			<div style = {padContainerES} className = {styles.padAll}>
				<a 
					href = {link} 
					target = {"_blank"}
				>
					<div style = {padHaloES} className = {styles.padHalo}>

					</div>

					<div style = {iconES} className = {styles.padIcon}>
					
					</div>
				</a>
			</div>
		)



	}
}

export default LinkPad