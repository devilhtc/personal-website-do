// src/components/Sections/HomeSection.js
import React from 'react'
import {connect} from 'react-redux'
import styles from './Sections.css'
import Panel from '../Panel/Panel'
import Footer from '../Footer/Footer'
import AnimateSection from './AnimateSection'
import SectionSeparator from './SectionSeparator'
import Utils from '../utils'
import axios from 'axios'

const bgImgUrl = "/static/img/wolf2.png"
const fontColor = "white"
const primaryText = "Welcome"
const secondaryText = "May the odds ever be in your favor"

class HomeSection extends React.Component {
	render() {
		const cachedImgs = this.props.cachedImgs.map((item) => {
			return (
				<img width = {"0px"} height = {"0px"} src = {item} key = {item} alt = {"cached"} />
			)
		})

		const inners = (
			<div>
				<Panel 
					primaryText = {primaryText} 
					secondaryText = {secondaryText} 
					bgImgUrl = {bgImgUrl} 
					fontColor = {fontColor}
				/>

				<div className = {styles.cachedImgs}> 
					{cachedImgs}
				</div>

				<Footer />
			</div>
		)
		return (
			<AnimateSection content = {inners}/>
		)
	}

	componentDidMount() {
		if (!this.props.cachedImgsFetched) {
			var self = this
			var dataUrl = '/data/cacheimg'
			axios.get(dataUrl)
				.then( (response) => {
					console.log('received data from '+ dataUrl)
					console.log(response.data)
					self.props.updateCachedImgs(response.data)
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
    cachedImgs: state.bio.cachedImgs,
    cachedImgsFetched: state.bio.cachedImgsFetched,
  }
}

const mapDispatchToProps = (dispatch) => {
  	return {
  		updateCachedImgs: (v) => {
  			dispatch({
  				type: 'UPDATE_CACHED_IMGS',
  				payload: v
  			})
  		}
  	}
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeSection)