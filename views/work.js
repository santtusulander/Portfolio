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
			title:   'Purpose',
			content: 'asdaaaaa juupajyyyyyyyyy'
		},
		{
			title:   'Done For',
			content: 'asdaaaaa juupajyyyyyyyyy'
		},
		{
			title:   'Done with',
			content: 'asdaaaaa juupajyyyyyyyyy'
		},
		{
			title:   'My role',
			content: 'asdaaaaa juupajyyyyyyyyy'
		}
	]


export default React.createClass({
	propTypes: {
		work: React.PropTypes.string
	},

	getInitialState() {
		return { contentInvoker: null }
	},

	toggleContent(invoker) {
		return this.state.contentInvoker === invoker ? this.setState({ contentInvoker: null })
			: this.setState({ contentInvoker: invoker });
	},

	renderContent(title, index) {
		return this.state.contentInvoker === title ?
			<section className='info-content'>
				{items[index].content}
			</section> : null;
	},

	renderTitles() {
		return <ul className='info-list'>
			{items.map((item, index) => {
				return (
					<li key={index} className='info-item'>
						<section className='info-title'
							onClick={(event) => {if(event)this.toggleContent(item.title)}}>
								{item.title}
						</section>
						{this.renderContent(item.title, index)}
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
					<section className='title-view' onClick={this.move}>
						{this.props.work}
					</section>
					{this.renderTitles()}
				</Carousel>
			</div>
		);
	}
});