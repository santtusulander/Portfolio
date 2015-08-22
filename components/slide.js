import React       from 'react';
import page        from 'page';
import tweenState  from 'react-tween-state';

import CarouselStore from '../stores/carousel';


/**
* Could've been done with pure React
* but used flux for the sake of exercise and spagetti.
*/
export default React.createClass({
	mixins: [tweenState.Mixin],

	propTypes: {
		slide:   React.PropTypes.object,
		index:   React.PropTypes.number
	},

	getInitialState() {
		return {left: 0};
	},

	//Playing around with this, I noticed that the dynamics of the slide movement
	//can be easily configured to preference.
	getEndValue() {
		let slideCalled = CarouselStore.getSlide();
		let greaterThan	=
			(this.props.index - slideCalled) * React.findDOMNode(this).offsetWidth;
		let lesserThan	=
			-(slideCalled - this.props.index) * React.findDOMNode(this).offsetWidth;
		return this.props.index === slideCalled ? 0
			: this.props.index < slideCalled ? lesserThan : greaterThan;
	},

	onChange() {
		this.tweenState('left', {
			easing: tweenState.easingTypes.easeInOutQuad,
			duration: 600,
			endValue: this.getEndValue()
		});
	},

	//A bit hackish here... triggering a render immediately after
	//mounting the component in order to set the initial position of the slides
	componentDidMount() {
		CarouselStore.addChangeListener(this.onChange);
		this.setState({
			left: this.props.index * React.findDOMNode(this).offsetWidth
		})
	},

	handleClick() {
		this.tweenState('left', {
			easing: tweenState.easingTypes.easeInOutQuad,
			duration: 600,
			endValue: this.state.left + React.findDOMNode(this).offsetWidth
		});
	},

	render() {
		let position = {
			position: 'absolute',
			left: this.getTweeningValue('left')
		};
		return (
			<section ref={this.props.index} onClick={this.handleClick} key={this.props.index}
				className={this.props.slide.className} style={position}>
				{this.props.slide.content}
			</section>
		)
	}
});