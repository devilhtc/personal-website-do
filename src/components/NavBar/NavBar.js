// src/components/TrialComponent.js
import React from 'react'
import {connect} from 'react-redux'
import styles from './NavBar.css'


class NameBanner extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return ( <div style = {this.props.extraStyle}> {this.props.content} </div> )
  }
}


class NavBar extends React.Component {
	render() {
    const totalWidth = this.props.totalWidth
    // totalWidth stored in this.props
    const viewList = ["HOME", "ABOUT", "PROJECTS", "CONTACT"].map(
      (item, index) => {
        const leftDis = totalWidth * (index * 3 + 14 )/28
        const optionES = {
          position: "absolute",
          left: leftDis+ 'px'
        }
        return (<div key = {item} style = {optionES} onClick = {()=>{ this.props.switchView(item) }}> {item} </div>)
      }
    )
    
    

    const navbarAllES = {
      width: totalWidth + 'px'
    }

    const nameBannerES = {
      position: "absolute",
      left: (totalWidth/14) + 'px'
    }

    console.log(navbarAllES)

    const fullName = this.props.ownerName.toUpperCase()
    
        
		return (
			<div className={styles.navbarAll} >
				<div> {this.props.view} </div>

        <div className={styles.navbarBanner}>
        <NameBanner extraStyle={nameBannerES} content = {fullName}/>
          {viewList}
        </div>
			</div>
		)
	}
}

const mapStateToProps = (state) => {
  return {
    view: state.view,
    totalWidth: state.totalWidth,
    ownerName: state.owner.firstName + " " + state.owner.lastName
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