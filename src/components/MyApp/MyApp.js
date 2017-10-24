// src/components/TrialComponent.js
import React from 'react'
import {connect} from 'react-redux'
import NavBar from '../NavBar/NavBar'
import Panel from '../Panel/Panel'
import Footer from '../Footer/Footer'
import HomeSection from '../Sections/HomeSection'
import AboutSection from '../Sections/AboutSection'
import ProjectsSection from '../Sections/ProjectsSection'
import ContactSection from '../Sections/ContactSection'
import { HashRouter as Router, Route, Link } from 'react-router-dom'
import styles from './MyApp.css'

class MyApp extends React.Component {
	render() {
    window.onresize = this.props.windowResize
    const totalWidth = this.props.totalWidth
    const navHeight = this.props.navHeight
    const widthProportion = this.props.widthProportion
    
    const contentSizingES = {
      position: 'absolute',
      width: totalWidth*widthProportion + 'px',
      left: totalWidth*(1-widthProportion)/2 + 'px',
      top: 0 + 'px',
      position: 'absolute',
      display: 'flex',
      flexDirection: 'column'
    }

		return (
      <div>
        <Router>
          <div className = {styles.contentStyle} style = {contentSizingES}>
            <Route path = '/' exact component = {HomeSection} />
            <Route path = '/about' component = {AboutSection} />
            <Route path = '/projects' component = {ProjectsSection} />
            <Route path = '/contact' component = {ContactSection} />
          </div>
        </Router>
        <NavBar />
      </div>
		)
	}
}

/*

<div style = > 
          <Panel />

          <Footer />
        </div>

*/
const mapStateToProps = (state) => {
  return {
    totalWidth: state.totalWidth,
    view: state.view,
    navHeight: state.constants.navHeight,
    widthProportion: state.constants.widthProportion
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    switchView: (v) => dispatch({
   		type:"SWITCH_VIEW",
      payload:v
    }),
    windowResize: () => dispatch({
      type:"CHANGE_WIDTH"
    })
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MyApp)