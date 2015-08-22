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
		return { left: 0, wrapperHeight: 0, currentSlide: 0 };
	},

	renderSlides() {
		return this.props.slides.map((item, index) => {
			return (
				<Slide ref='slide' index={index} key={index} slide={item}/>
			)
		});
	},

	componentDidMount() {
		SlideStore.addChangeListener(() => {
			if(this.state.currentSlide !== SlideStore.getSlide().index) {
				this.setState({
					currentSlide: SlideStore.getSlide().index
				});
			}
		});
		this.setState({
			wrapperHeight: React.findDOMNode(this.refs.slide).offsetHeight
		});
	},

	move(direction) {
		CarouselAction.moveCarousel(direction)
	},

	goToSlide(index) {
		CarouselAction.moveToSlide(index);
	},

	//This is so hacky it's almost revolting. But since with the current setup
	//the carousel's position needs to be absolute and I can't be bothered
	//with fixing it, this will suffice.
	renderNavigation(){
		let wrapperStyle = {
			paddingTop: `${this.state.wrapperHeight + 2}px` 
		};
		let nextClasses = classnames({
			nextprev: true,
			hidden: this.state.currentSlide === this.props.slides.length - 1
		});
		let prevClasses = classnames({
			nextprev: true,
			hidden: this.state.currentSlide === 0
		});
		return (
			<section className='navigation-wrapper' style={wrapperStyle}>
				<section onClick={(event) => {if(event)this.move('next')}}
					className={nextClasses}>
					next
				</section>
				<section onClick={(event) => {if(event)this.move('prev')}}
					className={prevClasses}>
					previous
				</section>
				{this.props.slides.map((item, index) => {
					return (
						<section key={index} className='carousel-navigator'
							onClick={(event) => {if(event)this.goToSlide(index)}}>
							asdsad
						</section>
					)
				})}
			</section>
		)
	},

	render() {
		 let style = {
			position: 'absolute',
			left: this.getTweeningValue('left')
		};
		return (
			<section className='carousel-window'>
					{this.renderSlides()}
				{this.renderNavigation()}
			</section>
		);
	}
});