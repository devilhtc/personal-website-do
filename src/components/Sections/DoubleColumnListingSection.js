import React from 'react'
import styles from './Sections.css'

class DoubleColumnListingSection extends React.Component {
	render() {
		const listings = this.props.listings
		
		const listingsDivs = listings.map((item, index) => {

			let contents = item[1].length > 1 ? item[1].concat(['']) : item[1]
			var contentsDivs

			if (item[0] == 'Resume') {
				contentsDivs = (
					<div className = {styles.dclsLink}>
						<a href = {item[1][1]} target = {"_blank"}> {item[1][0]} </a>
					</div>
				)
			} else {
			 	contentsDivs = contents.map((contentItem, contentIndex) => {
					return (<div key = {contentItem + contentIndex}> {contentItem} </div>)
				})
			}
			return (
				<div key = {item + index} className = {styles.dclsLine}>
					<div className = {styles.dclsTitle}>
						{item[0]}
					</div>

					<div className = {styles.dclsContents}>
						{contentsDivs}
					</div>
				</div>
			)
		})

		return (
			<div className = {styles.dclsContainer}>
				{listingsDivs}
		    </div>
	    )
	}
}

export default DoubleColumnListingSection