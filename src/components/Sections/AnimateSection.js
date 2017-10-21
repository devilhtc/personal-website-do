import React from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'


class AnimateSection extends React.Component {
	render() {
		return (
			<ReactCSSTransitionGroup transitionName="anim" transitionAppear={true} transitionAppearTimeout={1000} transitionLeave={true} transitionLeaveTimeout={1000} transitionEnter={false} transitionLeave={true}>
				{this.props.content}
			</ReactCSSTransitionGroup>
		)
	}
}

export default AnimateSection