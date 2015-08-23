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
		return { left: 0, slideHeight: 0, currentSlide: 0 };
	},

	renderSlides() {
		return this.props.slides.map((item, index) => {
			return (
				<Slide setHeight={this.setInitialSlideHight} ref='slide' index={index} key={index} slide={item}/>
			)
		});
	},

	componentDidMount() {
		SlideStore.addChangeListener(() => {
			if(this.state.currentSlide !== SlideStore.getSlide().index) {
				this.setState({
					currentSlide: SlideStore.getSlide().index,
					slideHeight:  SlideStore.getSlide().element.clientHeight
				});
			}
		});
	},

	move(direction) {
		CarouselAction.moveCarousel(direction)
	},

	goToSlide(index) {
		CarouselAction.moveToSlide(index, this.state.currentSlide);
	},

	setInitialSlideHight(height) {
		this.setState({
			slideHeight: height
		})
	},

	//This is so hacky it's almost revolting. But since with the current setup
	//the carousel's position needs to be absolute and I can't be bothered
	//with fixing it, this will suffice.
	renderNavigation(){
		let wrapperStyle = {
			paddingTop: `${this.state.slideHeight + 2}px` 
		};
		return (
			<section className='navigation-wrapper' style={wrapperStyle}>
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
		console.log('car')
		let nextClasses = classnames({
			next: true,
			hidden: this.state.currentSlide === this.props.slides.length - 1
		});
		let prevClasses = classnames({
			prev: true,
			hidden: this.state.currentSlide === 0
		});
		return (
			<section className='carousel-window'>
				<section onClick={(event) => {if(event)this.move('next')}}
					className={nextClasses}>
					next
				</section>
				<section onClick={(event) => {if(event)this.move('prev')}}
					className={prevClasses}>
					previous
				</section>
					{this.renderSlides()}
				{this.renderNavigation()}
			</section>
		);
	}
});
