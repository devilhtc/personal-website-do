import React from 'react'
import styles from './Tile.css'
import Tile from './Tile'

class ProjectTile extends React.Component {
	constructor(props) {
		super(props)
	}

	render() {
		const leftShift = this.props.leftShift || 19
		const tileContents = this.props.contents
		const descriptionLeftShiftES = {
			position: 'relative',
			padding: '0 ' + this.props.margin + 'px',
			margin: this.props.margin/4 + 'px',
 			border: '1px solid black'
		}
		const tileContentList = tileContents.map( (item, index) => {
			return (<div style = {descriptionLeftShiftES} key = {item + index}> {item} </div>)
		})

		const tileContentsDivES = {
			display: 'flex',
			flexDirection: 'row',
			flexWrap: 'wrap'
		}

		const tileContentsDiv = (
			<div style = {tileContentsDivES}>
				{tileContentList}
			</div>
		)

		return (
			<div className = {styles.projectTileInverse}> 
				<Tile
					totalWidth = {this.props.totalWidth} 
					index = {this.props.index} 
					margin = {this.props.margin}
					contents = {tileContentsDiv}
					title = {this.props.title}
					links = {this.props.links}
					numCols = {this.props.numCols}
					heightProp = {this.props.heightProp}
				/>
			</div>
		)
	}
}

export default ProjectTile