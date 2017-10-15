import React from 'react'

class NavBarUpper extends React.Component {
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

    return (
          <div style = {upperContainerES}> 
            <div style = {lowerOptionListES}>
              {lowerOptionList}
            </div>
          </div>
    )
  }
}

export default NavBarUpper