import React from 'react'
import styles from './Links.css'

class LinkTile extends React.Component {
   constructor(props) {
      super(props)
      const height = this.props.height || 16
      const color = this.props.color || 'black'
      this.state = { /* initial state */ 
         mourseOver:false,
         upperTileClassName:'',
         upperTileStyle: {
            left:'-100%',
            backgroundColor: color
         },
         upperTileStaticStyle: {
            backgroundColor: color
         },
         tileStyle: {
            height: height,
            fontSize: height,
         },
         tileStaticStyle: {
            height: height,
            fontSize: height,
         }    
      }
      this.slideIn = this.slideIn.bind(this)
      this.slideOut = this.slideOut.bind(this)
   }

   render() {
      const linkHref = this.props.link || ''
      const content = this.props.content || 'content'
      return (
         <div 
            ref = "tileRef" 
            style = { this.state.tileStyle } 
            className = { styles.tileClip }
         >
            <div className = { styles.tileStandard }> 
               <span className = { styles.spanStyle } >
                  { content }
               </span> 
            </div>
            <div 
               style={this.state.upperTileStyle} 
               className = {this.state.upperTileClassName + " " 
                            + styles.upperTileMoreStyle + " " 
                            + styles.tileStandard
                           }
            > 
            </div>
            <a 
               href = { linkHref } 
               className ={ styles.tileStandard + " " 
                            + styles.tilePlaceholder
                          } 
               onMouseEnter = { () => this.slideIn() } 
               onMouseLeave = { () => this.slideOut() }
               onClick = {() => this.slideOut}
               target = {"_blank"}
            > 
               suprious
            </a>
         </div>
      )
   }

   slideIn() {
      const newUpperTileStyle={
         left:'0'
      }
      this.setState({
         mourseOver: true,
         upperTileClassName: styles.upperTileAnimationIn,
         upperTileStyle: Object.assign(
            {},
            newUpperTileStyle,
            this.state.upperTileStaticStyle
         )
      })
   }

   slideOut() {
      const newUpperTileStyle = {
         left:'-100%'
      } 
      this.setState({
         mourseOver: false,
         upperTileClassName: styles.upperTileAnimationOut,
         upperTileStyle: Object.assign(
            {},
            newUpperTileStyle,
            this.state.upperTileStaticStyle
         )
      })
   }

   componentDidMount() {
      var self = this
      const newStyle = {}
      const newWidthStyle = {
         width: self.refs.tileRef.children[0].children[0].offsetWidth
      }
      Object.assign(
         newStyle,
         newWidthStyle, 
         this.state.tileStaticStyle
      )
      this.setState(
         {
            tileStyle:newStyle
         }
      )
   }
}

export default LinkTile
