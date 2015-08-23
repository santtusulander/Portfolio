import React       from 'react';
import page        from 'page';
import tweenState  from 'react-tween-state';

import CarouselStore  from '../stores/carousel';

import CarouselAction from '../actions/carousel';
import SlideAction    from '../actions/slide';


/**
* Could've been done with pure React
* but used flux for the sake of exercise and spagetti.
*/
export default React.createClass({
	mixins: [tweenState.Mixin],

	propTypes: {
		slide:        React.PropTypes.object,
		index:        React.PropTypes.number
	},

	getInitialState() {
		return {left: 0};
	},

	//The dynamics of the slide movement
	//can easily be configured to preference.
	specificSlideMovement(slideCalled) {
		let greaterThan	=
			(this.props.index - slideCalled) * React.findDOMNode(this).offsetWidth;
		let lesserThan	=
			-(slideCalled - this.props.index) * React.findDOMNode(this).offsetWidth;
		return this.props.index === slideCalled ? 0
			: this.props.index < slideCalled ? lesserThan : greaterThan;
	},

	singleSlideMovement(direction) {
		return direction === 'next' ? this.state.left - React.findDOMNode(this).offsetWidth
			: this.state.left + React.findDOMNode(this).offsetWidth;
	},

	onChange() {
		let item = CarouselStore.getItem();
		let endValue = typeof item === 'number' ?
			this.specificSlideMovement(item) : this.singleSlideMovement(item); 
		this.tweenState('left', {
			easing: tweenState.easingTypes.easeInOutQuad,
			duration: 600,
			endValue: endValue
		});
	},

	componentDidUpdate() {
		if(this.state.left === 0) {
			SlideAction.setCurrentSlide({
				element: React.findDOMNode(this),
				index: this.props.index
			});
		}
	},

	shouldComponentUpdate(nextProps, nextState) {
		return this.props !== nextProps || this.state !== nextState
	},

	//A bit hackish here... triggering a render immediately after
	//mounting the component in order to set the initial position of the slides
	componentDidMount() {
		CarouselStore.addChangeListener(this.onChange);
		this.setState({
			left: this.props.index * React.findDOMNode(this).offsetWidth
		})
	},

	render() {
		let position = {
			left: this.getTweeningValue('left')
		};
		return (
			<section ref={this.props.index} key={this.props.index}
				className='slide' style={position}>
				{this.props.slide.content}
			</section>
		)
	}
});
