import React from 'react'
import styles from './Tile.css'

const titleMargin = 10
const contentMargin = 10
const titleFontSize = 30
const contentFontSize = 22
const tilePadding = 10
const tileHeightProportion = 1/4

class Tile extends React.Component {
	render() {
		const margin = this.props.margin || 10
		const marginStyles = [
			{
				margin: margin + 'px',
				marginLeft: 0
			}, {
				margin: margin + 'px',
				marginRight: 0
			}
		]
		const index = this.props.index || 0
		const totalWidth = this.props.totalWidth || 1400

		const TileES = {
			height: totalWidth*tileHeightProportion + 'px',
			padding: tilePadding + 'px',
			paddingTop : 1.5 * tilePadding + 'px'
		}

		const titleES = {
			margin: titleMargin + 'px',
			fontSize: titleFontSize + 'px'
		}

		const contentES = {
			margin: contentMargin + 'px',
			fontSize: contentFontSize + 'px'
		}

		return (
			<div className = {styles.TileBox} style = {Object.assign({},marginStyles[index % 2], TileES)} >
				<div style = {titleES} > Tile Title </div>
				<div style = {contentES} > Tile Content </div>
			</div>
		)
	}
}

export default Tile