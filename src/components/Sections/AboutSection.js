// src/components/Sections/AboutSection.js
import React from 'react'
import {connect} from 'react-redux'
import styles from './Sections.css'
import Panel from '../Panel/Panel'
import Footer from '../Footer/Footer'
import AnimateSection from './AnimateSection'
import EducationTile from '../Tiles/EducationTile'
import SectionSeparator from './SectionSeparator'
import DoubleColumnListingSection from './DoubleColumnListingSection'
import Utils from '../utils'
import axios from 'axios'

const bgImgUrl =  "/static/img/oval.jpg"
const fontColor = "white"
const tileMargin = 10
const educationNumCols = 3
const tileHeightProp = 1/5
const primaryText = "Discover"
const secondaryText = "My passions and personality"


const infoListings = [
	["Who am I?", ["Stanford Student", "Emerging Engineer", "Problem Solver with Keen Senses", "Mostly A Geek"]],
	["Career Interests", ["Web Developement", "Machine Learning"]],
	["Languages", ["English", "Chinese", "German (beginner)"]],
	["Hometown", ["Wuhan, China"]],
	["Interests", ["Movies", "Artificial Intelligence", "Computer Vision", "Graphic Design"]],
	['Resume', ["Dropbox", "https://www.dropbox.com/s/9n8zj87u35hidwj/resume_tianchang_he.pdf?dl=0"]]
]

const triviaListings = [
	["Favorite Movie", ["The Dark Knight"]],
	["Favorite Food", ["Sushi"]],
	["Favorite Book", ["Angels and Demons"]],
	["Favorite Color", ["Gray"]],
	["Others", ["Don't drink coffee", "Loves Star Wars", "Owns a car with CarPlay"]]
]

class AboutSection extends React.Component {
	render() {
		const totalWidth = this.props.totalWidth
		const widthProportion = this.props.widthProportion
		const sectionWidth = totalWidth * widthProportion
		
		const item2Tile = (item, index) => {
			return (
				<EducationTile 
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

		const educationList = this.props.educationList
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
			gridTemplateColumns: frNumCols.join(' '),
			position: 'relative',
			left: '-' + tileMargin + 'px',
			width: sectionWidth + 2 * tileMargin
		}
		const aboutPanel = (<Panel 
						primaryText = {primaryText} 
						secondaryText = {secondaryText} 
						bgImgUrl = {bgImgUrl} 
						fontColor = {fontColor}
					/>)
		const inners = (
				<div>
					{aboutPanel}
					<SectionSeparator />
					
					<div className = {styles.sectionSubtitles}> Education </div>
					<div className = {styles.educationTileSection} 
						 style = {educationTilesES}
					>
						{educationTiles}
					</div>
					<SectionSeparator />

					<div className = {styles.sectionSubtitles}> Basic Info </div>
					<SectionSeparator />
					<DoubleColumnListingSection listings = {infoListings} />

					
					<SectionSeparator />
					<div className = {styles.sectionSubtitles}> Trivia </div>
					<SectionSeparator />
					<DoubleColumnListingSection listings = {triviaListings} />

					<SectionSeparator />
					<SectionSeparator />
					<Footer />
				</div>
			)

		return (
			<AnimateSection content = {inners}/>
		)
	}

	componentDidMount() {
		if (!this.props.educationFetched) {
			var self = this
			var dataUrl = '/data/education'
			axios.get(dataUrl)
				.then( (response) => {
					console.log('received data from '+ dataUrl)
					console.log(response.data)
					self.props.updateEducationList(response.data)
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
    educationList: state.bio.education,
    educationFetched: state.bio.educationFetched,
    widthProportion: state.constants.widthProportion
  }
}

const mapDispatchToProps = (dispatch) => {
  	return {
  		updateEducationList: (v) => {
  			dispatch({
  				type: 'UPDATE_EDUCATION_LIST',
  				payload: v
  			})
  		}
  	}
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AboutSection)