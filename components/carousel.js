import React from 'react';

import page        from 'page';
import tweenState  from 'react-tween-state';

export default React.createClass({
	mixins: [tweenState.Mixin],

	propTypes: {
		slides:   React.PropTypes.array
	},

	getInitialState() {
		return {left: 0};
	},

	handleClick() {
	    this.tweenState('left', {
	      easing: tweenState.easingTypes.easeInOutQuad,
	      duration: 300,
	      endValue: this.state.left + React.findDOMNode(this.refs.wrapper).clientWidth
	    });
	},

	render() {
		 var style = {
			position: 'absolute',
			left: this.getTweeningValue('left')
		};
		return (
			<section className='carousel-wrapper' ref='wrapper' style={style} onClick={this.handleClick}>
				{this.props.slides}
			</section>
		);
	}
});