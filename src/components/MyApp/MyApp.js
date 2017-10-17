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

class MyApp extends React.Component {
	render() {
    window.onresize = this.props.windowResize
    const totalWidth = this.props.totalWidth
    const navHeight = this.props.navHeight
    const contentSizingES = {
      position: 'absolute',
      left: totalWidth/14 + 'px',
      width: totalWidth*6/7 + 'px',
      top: 0 + 'px',
      position: 'absolute',
      display: 'flex',
      flexDirection: 'column',
      animation: 'fadein 500ms'
    }

		return (
      <div>
        <Router>
          <div style = {contentSizingES}>
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
    navHeight: state.constants.navHeight
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