import React from 'react'
import styles from './Tile.css'
import Tile from './Tile'

class EducationTile extends React.Component {
	constructor(props) {
		super(props)
		
	}

	render() {
		const leftShift = this.props.leftShift || 19
		const tileContents = this.props.contents
		const descriptionLeftShiftES = {
			position: 'relative',
			left: '-' + leftShift + 'px'
		}

		const tileContentList = tileContents.map( (item, index) => {
			return (<li style = {descriptionLeftShiftES} key = {item + index}> {item} </li>)
		})

		const tileContentsDiv = (
			<ul>
				{tileContentList}
			</ul>
		)

		return (
			<Tile
				totalWidth = {this.props.totalWidth} 
				index = {this.props.index} 
				margin = {this.props.Margin}
				contents = {tileContentsDiv}
				title = {this.props.title}
				links = {this.props.links}
				numCols = {this.props.numCols}
				heightProp = {this.props.heightProp}
				bgImgUrl = {this.props.bgImgUrl}
			/>
		)
	}
}

export default EducationTile