import React from 'react'
import styles from './Tile.css'
import LinkTile from '../Links/LinkTile'


const titleFontSize = 31
const contentFontSize = 20
const tilePadding = 10

const paddingRatios = [2, 1.5]
const tileLinkHeight = 21
const tileLinkDisToBottom = 30
const descriptionLeftShift = 19
const bgSizePercentage = 120
const projectLinkKeys = [
   'github', 'report', 'link', 'youtube'
]

class Tile extends React.Component {
	constructor(props) {
		super(props)
		/*
		this.state = {
			mouseOver: false,
			pristine: true
		}
		this.mouseEnterListener = this.mouseEnterListener.bind(this)
		this.mouseLeaveListener = this.mouseLeaveListener.bind(this)
		*/
	}
	/*
	mouseEnterListener(e) {
		this.setState({
			mouseOver: true,
			pristine: false
		})
	}

	mouseLeaveListener(e) {
		this.setState({
			mouseOver:false
		})
	}
	*/

	render() {
		const titleMargin = this.props.margin || 10
		const contentMargin = titleMargin
		const tileTitle = this.props.title || "Tile Title"
		const tileContents = this.props.contents 
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
					 + 0 + 'px ' 
					 + paddingRatios[0] * tilePadding + 'px',
			textShadow: '0 0 2px rgba(255,255,255,0.7)'
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

		/*

		const colPlacementES = [index].map((item) => {
			if (item % numCols === 0) {
				return marginStyles[0]
			} else if (item % numCols === numCols - 1) {
				return marginStyles[2]
			}
			return marginStyles[1]
		})[0]
		*/
		
		const colPlacementES = marginStyles[1]

		const bgImgES = {
			position: 'absolute',
			left: '-' + ( paddingRatios[0] * tilePadding) + 'px',
			top: '-' + ( paddingRatios[0] * tilePadding) + 'px'
		}
		//console.log(bgImgUrl)
		if (bgImgUrl !== '') {
			Object.assign(
				bgImgES,
				{
					backgroundImage:'url("'+bgImgUrl+'")',
					backgroundPosition: '-60% 0%',
					backgroundRepeat: 'no-repeat',
					width: bgSizePercentage + '%',
					height: bgSizePercentage + '%',
					zIndex: '-1'
				}
			)
		} else {
			TileES.backgroundColor = 'white'
		}
		//console.log(bgImgES)
		return (
			<div 
				className = {styles.tileBox} 
				style = {Object.assign(
					{},
					colPlacementES, 
					TileES
				)} 
			>
				<div style = {bgImgES} className = {
				 	styles.bgImgOriginal
				}>
				</div>
				<div className = {styles.tileTitle} style = {titleES} > 
					{tileTitle} 
				</div>
				<div className = {styles.tileContent} style = {contentES} > 
					{tileContents}
				</div>
				<div style = {tileLinkES}> 			
			 		{linksToRender}					
				</div>
			</div>
		)
	}
}

export default Tile