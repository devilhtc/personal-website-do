// src/components/NavBar/NavBar.js
import React from 'react'
import {connect} from 'react-redux'
import styles from './NavBar.css'
import NavBarUpper from './NavBarUpper'

const navbarAllFontSize = 22 
const options = ["HOME", "ABOUT", "PROJECTS", "CONTACT"]

class NameBanner extends React.Component {
  render() {
    const extraSpacing = {
      letterSpacing: '6px'
    }
    Object.assign(extraSpacing,this.props.extraStyle[1])
    return ( 
      <div style = {this.props.extraStyle[0]} className = {styles.navNames}> 
          <div style = {extraSpacing}> 
            {this.props.content.firstName.toUpperCase()} 
          </div>
          <div style = {extraSpacing} className = {styles.navLastName}> 
            {this.props.content.lastName.toUpperCase()}  
          </div>
      </div> 
    )
  }
}

class NavBar extends React.Component {
	render() {
    const totalWidth = this.props.totalWidth
    const navHeight = this.props.navHeight
    const blockWidth = totalWidth * 3 / 28
    const leftDis = options.map(
      (item, index) => {
        return totalWidth * (index * 3 + 14 ) / 28;
      }
    )
    const genOptionList = (otherStyle) => {
      const generatedList = options.map(
        (item, index) => {
          const curLeftDis = leftDis[index]
          const optionES = {
            left: curLeftDis+ 'px',
            width: blockWidth,
            lineHeight: navHeight + 'px'
          }
          Object.assign(optionES, otherStyle)
          return (<div key = {item} className = {styles.navOption} style = { optionES } 
                  onClick = { ()=>{ this.props.switchView(item) }}> 
                      {item} 
                  </div>)
        }
      )
      return generatedList
    }
    
    const optionList = genOptionList({})
    const owner = this.props.owner
    const nameFontSize = 44
    const navbarAllES = {
      width: totalWidth + 'px',
      height: navHeight + 'px',
      fontSize: navbarAllFontSize + 'px'
    }
    const bothNameES = {
      position: "absolute",
      left: (totalWidth/14) + 'px',
      fontSize: nameFontSize + 'px',
      width: totalWidth*3/7 + 'px',
      display: 'flex',
      flexDirection: 'row',
      height: navHeight + 'px'
    }
    const upperPropsWrapper = {
      leftDis: leftDis,
      width: blockWidth,
      genOptionList: genOptionList,
      curOptionIndex: options.indexOf(this.props.view),
      navHeight: navHeight
    }
    const namesES = {
      lineHeight: navHeight + 'px'
    }
    const bannerES = {
      height: navHeight + 'px'
    }    

		return (
			<div className = {styles.navbarAll} style = {navbarAllES}>
        <div className = {styles.navbarBanner} style = {bannerES}>
          <NameBanner extraStyle = { [bothNameES, namesES] } content = {owner}/>
          {optionList}
        </div>
        <NavBarUpper propsWrapper = {upperPropsWrapper} />
			</div>
		)
	}
}

const mapStateToProps = (state) => {
  return {
    view: state.view,
    totalWidth: state.totalWidth,
    owner: state.constants.owner,
    navHeight: state.constants.navHeight
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    switchView: (v) => dispatch({
   		type:"SWITCH_VIEW",
      payload:v
    })
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NavBar)