import React from 'react/addons';
import page  from 'page';

import SlideStore from '../stores/slide';
import Navigation from '../components/navigation';
import Carousel   from '../components/carousel';

//TODO: import data from a database passing it as props, establish a connection to API
//and make HTTP requests (using a module like superagent)
//in the router handler for this URL. For now, using local data for the html puzzle


let items = [
		{
			stateVar: 'purpose',
			title:   'Purpose',
			content: 'aaaaa jukkajjuuuuuu'
		},
		{
			stateVar: 'doneFor',
			title:   'Done For',
			content: 'aaaaa jukkajjuuuuuu'
		},
		{
			stateVar: 'doneWith',
			title:   'Done with',
			content: 'aaaaa jukkajjuuuuuu'
		},
		{
			stateVar: 'myRole',
			title:   'My role',
			content: 'aaaaa jukkajjuuuuuu'
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
						<span className='info-title'
							onClick={(event) => {if(event)this.toggleContent(item.stateVar)}}>
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
				<Navigation view='index'/>
				<Carousel navVisible={false} class='work-view' ref='carousel'>
					<section className='title-view'>
					<span onClick={this.move} style={{cursor: 'pointer'}}>
						{this.props.work}
					</span>
					</section>
					{this.renderTitles()}
				</Carousel>
			</div>
		);
	}
});