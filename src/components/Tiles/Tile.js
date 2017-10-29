import React from 'react'
import styles from './Tile.css'
import LinkTile from '../LinkTile/LinkTile'


const titleFontSize = 31
const contentFontSize = 20
const tilePadding = 10

const paddingRatios = [2, 1.5]
const tileLinkHeight = 21
const tileLinkDisToBottom = 30
const descriptionLeftShift = 19

const projectLinkKeys = [
   'github', 'report', 'link', 'youtube'
]

class Tile extends React.Component {
	render() {
		const titleMargin = this.props.margin || 10
		const contentMargin = titleMargin
		const tileTitle = this.props.title || "Tile Title"
		const tileContents = this.props.contents || "Tile Content"
		const tileLinks = this.props.links || {}
		const margin = titleMargin
		const numCols = this.props.numCols
		const bgImgUrl = this.props.bgImgUrl || ''
		const tileHeightProportion = this.props.heightProp || 5/15
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
			},
			{
				margin: margin + 'px'
			},
			{
				margin: margin + 'px',
				marginRight: 0
			}
		]

		const index = this.props.index || 0
		const totalWidth = this.props.totalWidth || 1400
		const tileHeight = totalWidth*tileHeightProportion
		//console.log(tileHeight)
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

		const colPlacementES = [index].map((item) => {
			if (item % numCols === 0) {
				return marginStyles[0]
			} else if (item % numCols === numCols - 1) {
				return marginStyles[2]
			}
			return marginStyles[1]
		})[0]
		const bgImgES = {
			position: 'absolute'
		}
		if (bgImgUrl !== '') {
			Object.assign(
				bgImgES,
				{
					backgroundImage:'url("'+bgImgUrl+'")'
				}
			)
		}
		return (
			<div 
				className = {styles.tileBox} 
				style = {Object.assign(
					{},
					colPlacementES, 
					TileES
				)} 
			>
				<div style = {bgImgES}> </div>
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

export default Tile