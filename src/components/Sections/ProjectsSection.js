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
import axios from 'axios'

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
			projectsList : this.props.projects
		}
	}

	render() {
		const totalWidth = this.props.totalWidth
		const widthProportion = this.props.widthProportion
		const sectionWidth = widthProportion * totalWidth

		const projectsNumCols = totalWidth < 1400 ? 2 : (totalWidth>1650 ? 4 : 3)

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
		if (!this.props.projectsFetched) {
			var self = this
			var dataUrl = '/data/project'
			axios.get(dataUrl)
				.then( (response) => {
					console.log('received data from '+ dataUrl)
					console.log(response.data)
					var projectsSortedByStartDate = response.data.sort((a, b) => -1*a.startDate.localeCompare(b.startDate))
					self.props.updateProjectList(projectsSortedByStartDate)
					this.setState({
						projectsList: this.props.projects
					})
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
    projects: state.bio.projects,
    widthProportion: state.constants.widthProportion,
    projectsFetched: state.bio.projectsFetched,
  }
}

const mapDispatchToProps = (dispatch) => {
  	return {
  		updateProjectList: (v) => {
  			dispatch({
  				type: 'UPDATE_PROJECT_LIST',
  				payload: v
  			})
  		}
  	}
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProjectsSection)