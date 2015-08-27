import React       from 'react/addons';
import page        from 'page';
import tweenState  from 'react-tween-state';
import classnames  from 'classnames';

import SlideStore  from '../stores/slide';

import CarouselAction from '../actions/carousel' 

import Slide from './slide';

export default React.createClass({
	mixins: [tweenState.Mixin],

	propTypes: {
		class:      React.PropTypes.string,
		navVisible: React.PropTypes.bool
	},

	getInitialState() {
		return { left: 0, currentSlide: 0 };
	},

	renderSlides() {
		return this.props.children.map((item, index) => {
			return (
				<Slide ref='slide' index={index} key={index}>
					{item}
				</Slide>
			)
		});
	},

	componentWillUnmount() {
		SlideStore.removeChangeListener(this.onChange)
	},

	onChange() {
		if(this.state.currentSlide !== SlideStore.getSlide().index) {
			this.setState({
				currentSlide: SlideStore.getSlide().index
			});
		}
	},

	componentDidMount() {
		SlideStore.addChangeListener(this.onChange);
	},

	move(direction) {
		let lastSlide = this.props.children.length - 1;
		if(this.state.currentSlide === lastSlide && direction === "next")
			CarouselAction.moveToSlide(0, this.state.currentSlide);
		else if(this.state.currentSlide === 0 && direction === "prev")
			CarouselAction.moveToSlide(lastSlide, this.state.currentSlide);
		else CarouselAction.moveCarousel(direction);
	},

	goToSlide(index) {
		CarouselAction.moveToSlide(index, this.state.currentSlide);
	},

	renderNavigation(){
		return this.props.navVisible ? (
			<section className='navigation-wrapper'>
				{this.props.children.map((item, index) => {
					let navClasses = classnames({
						carouselNavigator: true,
						active : this.state.currentSlide === index
					})
					return (
						<section key={index} className={navClasses}
							onClick={(event) => {if(event)this.goToSlide(index)}}>
						</section>
					)
				})}
			</section>
		) : null
	},

	render() {
		let prevArrow = this.props.navVisible ?
			<section onClick={(event) => {if(event)this.move('prev')}} className='fa fa-arrow-left prev' />
			: null;
		let nextArrow = this.props.navVisible ?
			<section onClick={(event) => {if(event)this.move('next')}}className='fa fa-arrow-right next' />
			: null;

		return (
			<section ref='window' className={this.props.class}>
				{prevArrow}
				{nextArrow}
				{this.renderSlides()}
				{this.renderNavigation()}
			</section>
		);
	}
});
