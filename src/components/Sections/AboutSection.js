// src/components/Sections/AboutSection.js
import React from 'react'
import {connect} from 'react-redux'
import styles from './Sections.css'
import Panel from '../Panel/Panel'
import Footer from '../Footer/Footer'
import AnimateSection from './AnimateSection'
import Tile from '../Tiles/Tile'

const bgImgUrl = "./img/oval.jpg"
const fontColor = "white"
const tileMargin = 10
const educationNumCols = 3
const tileHeightProp = 1/5

class AboutSection extends React.Component {
	render() {
		const totalWidth = this.props.totalWidth
		const educationList = this.props.educationList
		const item2Tile = (item, index) => {
			return (
				<Tile 
					totalWidth = {totalWidth} 
					index = {index} 
					key = {item.title} 
					margin = {tileMargin}
					contents = {item.description}
					title = {item.title}
					links = {item.links}
					bgImgUrl = {item.bgImgUrl}
					numCols = {educationNumCols}
					heightProp = {tileHeightProp}

				/>
			)
		}

		const educationTiles = educationList.map(item2Tile)

		const frNumCols = Array.from(
			new Array(educationNumCols), 
			(item, index) => index + 1
		).map(
			(item) => '1fr'
		)

		const educationTilesES = {
			paddingTop: tileMargin + 'px',
			paddingBottom: tileMargin + 'px',
			gridTemplateColumns: frNumCols.join(' ')
		}
		const aboutPanel = (<Panel 
						primaryText = {"About"} 
						bgImgUrl = {bgImgUrl} 
						fontColor = {fontColor}
					/>)
		const inners = (
				<div>
					{aboutPanel}
					<div className = {styles.sectionSeperation}> </div>
					<div>
						<div className = {styles.sectionSubtitles}> Education </div>
						<div className = {styles.educationTileSection} 
							 style = {educationTilesES}
						>
							{educationTiles}
						</div>
					</div>
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
    educationList: state.bio.education,
    widthProportion: state.constants.widthProportion
  }
}

const mapDispatchToProps = (dispatch) => {
  	return {}
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AboutSection)