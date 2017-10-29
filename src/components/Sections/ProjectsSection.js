// src/components/Sections/ProjectsSection.js
import React from 'react'
import {connect} from 'react-redux'
import styles from './Sections.css'
import Panel from '../Panel/Panel'
import Footer from '../Footer/Footer'
import AnimateSection from './AnimateSection'
import Tile from '../Tiles/Tile'

const bgImgUrl = "./img/skyscraper.jpg"
const fontColor = "white"
const tileMargin = 10
const projectsNumCols = 2
const tileHeightProp = 7/30

class ProjectsSection extends React.Component {
	render() {
		const totalWidth = this.props.totalWidth
		const projectsList = this.props.projects

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
					numCols = {projectsNumCols}
					heightProp = {tileHeightProp}
				/>
			)
		}

		const projectTiles = projectsList.map(item2Tile)
		const frNumCols = Array.from(
			new Array(projectsNumCols), 
			(item, index) => index + 1
		).map(
			(item) => '1fr'
		)
		const tileSectionES = {
			paddingTop: tileMargin + 'px',
			paddingBottom: tileMargin + 'px',
			gridTemplateColumns: frNumCols.join(' ')
		}

		const inners = (
			<div>
				<Panel 
					primaryText = {"Projects"} 
					bgImgUrl = {bgImgUrl} 
					fontColor = {fontColor}
				/>

				<div 
					className = {styles.projectTileSection} 
					style = {tileSectionES}
				>
					{projectTiles} 
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
    projects: state.bio.projects
  }
}

const mapDispatchToProps = (dispatch) => {
  	return {}
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProjectsSection)