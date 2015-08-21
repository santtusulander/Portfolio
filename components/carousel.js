import React       from 'react';
import page        from 'page';
import tweenState  from 'react-tween-state';

export default React.createClass({
	mixins: [tweenState.Mixin],

	propTypes: {
		slides:   React.PropTypes.array
	},

	getInitialState() {
		return {left: 0, wrapperHeight: 0};
	},

	handleClick() {
	    this.tweenState('left', {
	      easing: tweenState.easingTypes.easeInOutQuad,
	      duration: 600,
	      endValue: this.state.left + React.findDOMNode(this.refs[0]).offsetWidth
	    });
	},

	renderSlides() {
		return this.props.slides.map((item, index) => {
			return (
				<section ref={index} key={index} className={item.className}>
					{item.content}
				</section>
			)
		})
	},

	componentDidMount() {
		this.setState({
			wrapperHeight: React.findDOMNode(this.refs.wrapper).offsetHeight
		});
	},

	goToSlide(ref) {
		console.log(this.state.left)
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
				<section className='carousel-wrapper' ref='wrapper'
					style={style} onClick={this.handleClick}>
					{this.renderSlides()}
				</section>
				{this.renderNavigation()}
			</section>
		);
	}
});