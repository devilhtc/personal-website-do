// src/components/Sections/ProjectsSection.js
import React from 'react'
import {connect} from 'react-redux'
import styles from './Sections.css'
import Panel from '../Panel/Panel'
import Footer from '../Footer/Footer'
import AnimateSection from './AnimateSection'
import ProjectTile from '../Tiles/ProjectTile'
import SectionSeparator from './SectionSeparator'
import Utils from '../utils'
const bgImgUrl = "/static/img/skyscraper.jpg"
const fontColor = "white"
const tileMargin = 10

const tileHeightProp = 8/30
const primaryText = "Experience"
const secondaryText = "As an emerging engineer"

class ProjectsSection extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			projectsList : []
		}
	}

	render() {
		const totalWidth = this.props.totalWidth
		const widthProportion = this.props.widthProportion
		const sectionWidth = widthProportion * totalWidth

		const projectsNumCols = totalWidth<1400 ? 2 : (totalWidth>1650 ? 4 : 3)

		const item2Tile = (item, index) => {
			return (
				<ProjectTile 
					totalWidth = {totalWidth} 
					index = {index} 
					key = {item.title} 
					margin = {tileMargin}
					contents = {item.keywords}
					title = {item.title}
					links = {item.links}
					numCols = {projectsNumCols}
					heightProp = {tileHeightProp}
				/>
			)
		}

		const projectTiles = this.state.projectsList.map(item2Tile)
		const frNumCols = Array.from(
			new Array(projectsNumCols), 
			(item, index) => index + 1
		).map(
			(item) => '1fr'
		)
		const tileSectionES = {
			paddingTop: tileMargin + 'px',
			paddingBottom: tileMargin + 'px',
			gridTemplateColumns: frNumCols.join(' '),
			position: 'relative',
			left: '-' + tileMargin + 'px',
			width: sectionWidth + 2 * tileMargin
		}

		const inners = (
			<div>
				<Panel 
					primaryText = {primaryText} 
					secondaryText = {secondaryText}
					bgImgUrl = {bgImgUrl} 
					fontColor = {fontColor}
				/>

				<SectionSeparator />

				<div 
					className = {styles.projectTileSection} 
					style = {tileSectionES}
				>
					{projectTiles} 
				</div>

				<SectionSeparator />

				<Footer />
			</div>
		)

		return (
			<AnimateSection content = {inners}/>
		)
	}

	componentDidMount() {
		this.setState({
			projectsList : this.props.projects
		})
	}
}

const mapStateToProps = (state) => {
  return {
    totalWidth: state.totalWidth,
    projects: state.bio.projects,
    widthProportion: state.constants.widthProportion
  }
}

const mapDispatchToProps = (dispatch) => {
  	return {}
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProjectsSection)