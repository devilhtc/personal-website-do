// src/components/TrialComponent.js
import React from 'react'
import {connect} from 'react-redux'
import styles from './NavBar.css'


class NameBanner extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    //console.log(styles)
    return ( <div style = {this.props.extraStyle[0]}> 
                <div style = {this.props.extraStyle[1]}> {this.props.content.firstName.toUpperCase()} </div>
                <div style = {this.props.extraStyle[1]} className = {styles.navLastName}> {"  " + this.props.content.lastName.toUpperCase()}  </div>
              </div> )
  }
}

class NavbarUpper extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const leftDis = this.props.propsWrapper.leftDis
    const width = this.props.propsWrapper.width
    const genOptionList = this.props.propsWrapper.genOptionList 
    const curOptionIndex = this.props.propsWrapper.curOptionIndex
    const navHeight = this.props.propsWrapper.navHeight
    // this div has a certain width
    // that moves to a certain position based 
    // on current option index
    // that also moves its children left 
    // by the same amount

    const upperContainerES = {
      position: 'absolute',
      height: navHeight + 'px',
      width: width + 'px',
      overflow: 'hidden',
      left: leftDis[curOptionIndex] + 'px',
      transition: 'left 300ms'
    }

    const lowerOptionListES = {
      position: 'absolute',
      height: navHeight + 'px',
      left: '-' + leftDis[curOptionIndex] + 'px',
      transition: 'left 300ms'
    }

    const upperOptionES = {
      backgroundColor: 'black',
      color: 'white',
    }
    const lowerOptionList = genOptionList(upperOptionES)
    return (<div style = {upperContainerES}> 
              <div style = {lowerOptionListES}>
                {lowerOptionList}
              </div>
             </div>)
  }
}

class NavBar extends React.Component {
	render() {
    const totalWidth = this.props.totalWidth
    const navHeight = this.props.navHeight
    const blockWidth = totalWidth * 3 / 28
    // totalWidth stored in this.props
    const options = ["HOME", "ABOUT", "PROJECTS", "CONTACT"]
    const leftDis = options.map(
      (item, index) => {
        return totalWidth * (index * 3 + 14 )/28;
      }
    )
    const genOptionList = (otherStyle) => {
      const generatedList = options.map(
        (item, index) => {
          const curLeftDis = leftDis[index]
          
          const optionES = {
            left: curLeftDis+ 'px',
            width:blockWidth,
            lineHeight:navHeight + 'px'
          }
          Object.assign(optionES, otherStyle)
          return (<div key = {item} className = {styles.navOption} style = {optionES} 
            onClick = {()=>{ this.props.switchView(item) }}> 
                    {item} 
                  </div>)
        }
      )
      return generatedList
    }
    
    const optionList = genOptionList({})



    const navbarAllES = {
      width: totalWidth + 'px',
      height: navHeight + 'px'
    }

    const nameFontSize = 30

    const nameBannerES = {
      position: "absolute",
      left: (totalWidth/14) + 'px',
      fontSize: nameFontSize + 'px',
      width: totalWidth*3/7 + 'px',
      display: 'flex',
      flexDirection: 'row',
      height: navHeight + 'px',
    }

    const namesES = {
      lineHeight: navHeight + 'px'
    }


    const owner = this.props.owner;
    
    const upperPropsWrapper = {
      leftDis: leftDis,
      width: blockWidth,
      genOptionList: genOptionList,
      curOptionIndex: options.indexOf(this.props.view),
      navHeight: navHeight
    }
        
		return (
			<div className = {styles.navbarAll} style = {navbarAllES}>
        
        <div className = {styles.navbarBanner}>
          <NameBanner extraStyle = { [nameBannerES, namesES] } content = {owner}/>
          {optionList}
        </div>
        <NavbarUpper propsWrapper = {upperPropsWrapper} />
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