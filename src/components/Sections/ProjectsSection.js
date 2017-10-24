// src/components/Sections/ProjectsSection.js
import React from 'react'
import {connect} from 'react-redux'
import styles from './Sections.css'
import Panel from '../Panel/Panel'
import Footer from '../Footer/Footer'
import AnimateSection from './AnimateSection'
import Tile from '../Tile/Tile'

const bgImgUrl = "./img/skyscraper.jpg"
const fontColor = "white"
const tileMargin = 12

class ProjectsSection extends React.Component {
	render() {
		const totalWidth = this.props.totalWidth
		const projectTiles = [1,2,3].map((item, index)=> {
			return (
				<Tile totalWidth = {totalWidth} index = {index} key = {item} margin = {tileMargin}/>
			)
		})

		const tileSectionES = {
			paddingTop: tileMargin + 'px',
			paddingBottom: tileMargin + 'px'
		}

		const inners = (
			<div>
				<Panel primaryText = {"Projects"} bgImgUrl = {bgImgUrl} fontColor = {fontColor}/>

				<div className = {styles.tileSection} style = {tileSectionES}> {projectTiles} </div>

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
    totalWidth: state.totalWidth
  }
}

const mapDispatchToProps = (dispatch) => {
  	return {}
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProjectsSection)