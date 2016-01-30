import React from 'react/addons';
import page  from 'page';

import SlideStore from '../stores/slide';
import Carousel   from '../components/carousel';

//TODO: import data from a database passing it as props, establish a connection to API
//and make HTTP requests (using a module like superagent)
//in the router handler for this URL. For now, using hc data for the html puzzle


let items = [
		{
			stateVar: 'listitemOne',
			title:   'Stuff',
			content: 'But think not that this famous town has only harpooneers, cannibals, and bumpkins to show her visitors. Not at all. Still New Bedford is a queer place. Had it not been for us whalemen, that tract of land would this day perhaps have been in as howling condition as the coast of Labrador.'
		},
		{
			stateVar: 'listitemTwo',
			title:   'More stuff',
			content: 'Go and gaze upon the iron emblematical harpoons round yonder lofty mansion, and your question will be answered. Yes; all these brave houses and flowery gardens came from the Atlantic, Pacific, and Indian oceans.'
		},
		{
			stateVar: 'listitemThree',
			title:   'Other stuff',
			content: 'In New Bedford, fathers, they say, give whales for dowers to their daughters, and portion off their nieces with a few porpoises a-piece. You must go to New Bedford to see a brilliant wedding; for, they say, they have reservoirs of oil in every house, and every night recklessly burn their lengths in spermaceti candles.'
		},
		{
			stateVar: 'listitemFour',
			title:   'Out of stuff',
			content: 'In this same New Bedford there stands a Whaleman\'s Chapel, and few are the moody fishermen, shortly bound for the Indian Ocean or Pacific, who fail to make a Sunday visit to the spot. I am sure that I did not.'
		}
	]


export default React.createClass({
	propTypes: {
		work: React.PropTypes.string
	},

	getInitialState() {
		return items.reduce((state, variable) => {
			state[variable.stateVar] = false;
			return state
		}, {});
	},

	toggleContent(invoker) {
		return this.state[invoker] === true ? this.setState({ [invoker]: false })
			: this.setState({ [invoker]: true });
	},

	renderContent(item, index) {
		return this.state[item] === true ?
			<section className='info-content'>
				{items[index].content}
			</section> : null;
	},

	renderTitles() {
		return <ul className='info-list'>
			{items.map((item, index) => {
				return (
					<li key={index} className='info-item'>
						<span
							className='info-title'
							onClick={
								(event) => {
									if(event)this.toggleContent(item.stateVar)
								}
							}>
								{item.title}
						</span>
						<React.addons.CSSTransitionGroup transitionName='content'>
							{this.renderContent(item.stateVar, index)}
						</React.addons.CSSTransitionGroup>
					</li>
				);
			})}
		</ul>
	},

	move() {
		this.refs.carousel.move('next');
	},

	render() {
		return (
			<div>
				<Carousel navVisible={false} class='work-view' ref='carousel'>
					<section className='title-view'>
						<span onClick={this.move} className='worktitle-span'>
							{this.props.work}
						</span>
						<section className='info-content' style={{maxWidth:"25%"}}>
							I originally developed this page as a place to showcase any
							single project of mine. Above would read the project{'\''}s 
							name.
						</section>
					</section>
					{this.renderTitles()}
				</Carousel>
			</div>
		);
	}
});
