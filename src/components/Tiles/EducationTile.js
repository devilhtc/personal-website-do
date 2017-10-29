import React from 'react'
import styles from './Tile.css'
import LinkTile from '../LinkTile/LinkTile'

const titleMargin = 10
const contentMargin = titleMargin
const titleFontSize = 33
const contentFontSize = 19
const tilePadding = 10
const tileHeightProportion = 4/15
const paddingRatios = [2, 1.5]
const tileLinkHeight = 21
const tileLinkDisToBottom = 30
const descriptionLeftShift = 19

const projectLinkKeys = [
   'github', 'report', 'link', 'youtube'
]

class EducationTile extends React.Component {
	render() {
		const tileTitle = this.props.title || "Tile Title"
		const tileContents = this.props.contents || "Tile Content"
		const tileLinks = this.props.links || {}
		const margin = this.props.margin || 10

		const linksToRender = projectLinkKeys.filter( (item, index) => {
			return tileLinks[item]
		}).map((item,index) => {
			return (
				<LinkTile 
					height = {tileLinkHeight} 
					content = {item.toUpperCase()}
					link = {tileLinks[item]}
					key = {item}
				/>
			)
		})

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
		const tileHeight = totalWidth*tileHeightProportion
		const TileES = {
			height: tileHeight + 'px',
			padding: paddingRatios[1] * tilePadding + 'px '
					 + paddingRatios[0] * tilePadding + 'px ' 
					 + tilePadding + 'px ' 
					 + paddingRatios[0] * tilePadding + 'px'
		}

		const titleES = {
			margin: titleMargin + 'px',
			fontSize: titleFontSize + 'px'
		}

		const contentES = {
			margin: contentMargin + 'px',
			fontSize: contentFontSize + 'px'
		}

		const tileLinkES = {
			position: 'absolute',
			display: 'flex',
			flexDirection: 'row',
			margin: contentMargin + 'px',
			top: (tileHeight 
				  - tileLinkHeight 
				  - tileLinkDisToBottom) 
				  + 'px'
		}

		const descriptionLeftShiftES = {
			position: 'relative',
			left: '-' + descriptionLeftShift + 'px'
		}
		const tileContentList = tileContents.map( (item, index) => {
			return (<li style = {descriptionLeftShiftES} key = {item}> {item} </li>)
		})
		return (
			<div 
				className = {styles.tileBox} 
				style = {Object.assign(
					{},
					marginStyles[index % 2], 
					TileES
				)} 
			>
				<div className = {styles.tileTitle} style = {titleES} > 
					{tileTitle} 
				</div>
				<div className = {styles.tileContent} style = {contentES} > 
					<ul>
						{tileContentList} 
					</ul>
				</div>
				<div style = {tileLinkES}> 			
			 		{linksToRender}					
				</div>
			</div>
		)
	}
}

export default EducationTile