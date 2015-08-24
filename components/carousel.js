import React       from 'react';
import page        from 'page';
import tweenState  from 'react-tween-state';
import classnames  from 'classnames';

import SlideStore  from '../stores/slide';

import CarouselAction from '../actions/carousel' 

import Slide from './slide';

export default React.createClass({
	mixins: [tweenState.Mixin],

	propTypes: {
		slides:   React.PropTypes.array
	},

	getInitialState() {
		return { left: 0, windowHeight: 0, currentSlide: 0 };
	},

	renderSlides() {
		return this.props.slides.map((item, index) => {
			return (
				<Slide ref='slide' index={index} key={index} slide={item}/>
			)
		});
	},

	componentDidMount() {
		this.setState({
			windowHeight: React.findDOMNode(this.refs.window).offsetHeight
		});
		SlideStore.addChangeListener(() => {
			if(this.state.currentSlide !== SlideStore.getSlide().index) {
				this.setState({
					currentSlide: SlideStore.getSlide().index
				});
			}
		});
	},

	move(direction) {
		let lastSlide = this.props.slides.length - 1;
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
		return (
			<section className='navigation-wrapper'
				style={{marginTop: this.state.windowHeight * 0.9}}>
				{this.props.slides.map((item, index) => {
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
		)
	},

	render() {
		let navPosition = {
			marginTop: this.state.windowHeight * 0.45
		}
		return (
			<section ref='window' className='carousel-window'>
				<section onClick={(event) => {if(event)this.move('next')}}
					className='fa fa-arrow-right next' style={navPosition} />
				<section onClick={(event) => {if(event)this.move('prev')}}
					className='fa fa-arrow-left prev' style={navPosition} />
					{this.renderSlides()}
				{this.renderNavigation()}
			</section>
		);
	}
});
