import React       from 'react';
import page        from 'page';
import tweenState  from 'react-tween-state';

import CarouselAction from '../actions/carousel' 

import Slide from './slide';

export default React.createClass({
	mixins: [tweenState.Mixin],

	propTypes: {
		slides:   React.PropTypes.array
	},

	getInitialState() {
		return {left: 0, wrapperHeight: 0};
	},

	renderSlides() {
		return this.props.slides.map((item, index) => {
			return (
				<Slide index={index} ref='slide' slide={item}/>
			)
		})
	},

	componentDidMount() {
		this.setState({
			wrapperHeight: React.findDOMNode(this.refs.slide).offsetHeight
		});
	},

	goToSlide(index) {
		CarouselAction.moveSlide(index);
	},

	//This is so hacky it's almost revolting. But since with the current setup
	//the carousel's position needs to be absolute and I can't be bothered
	//with fixing it, this will suffice.
	renderNavigation(){
		let wrapperStyle = {
			paddingTop: `${this.state.wrapperHeight + 2}px` 
		}
		return (
			<section className='navigation-wrapper' style={wrapperStyle}>
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