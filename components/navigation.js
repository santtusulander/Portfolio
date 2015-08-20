import React from 'react';
import page  from 'page';

import Dropdown from './dropdown';

let items = {
	works : [
		{
			title:   'php-application bundle',
			onClick: () => { page.show('works/php') }
		},
		{
			title:   'java-application',
			onClick: () => { page.show('works/java') }
		}
	],
	about : [
		{
			title:   'php-application sunder',
			onClick: () => { page.show('works/php') }
		},
		{
			title:   'java-application',
			onClick: () => { page.show('works/java') }
		}
	]
}

export default React.createClass({
	propTypes: {
		view: React.PropTypes.string
	},

	getInitialState() {
		return {
			dropDownInvoker: ''
		};
	},

	toggleDropdown(invoker) {
		if(invoker === this.state.dropDownInvoker){
			return this.setState({
				dropDownInvoker: null
			});	
		}
		this.setState({
			dropDownInvoker: invoker
		});	
	},

	renderDropdown(link, sameInvoker) {
		return this.state.dropDownInvoker === link ?
			<Dropdown items={items[this.state.dropDownInvoker]} /> :
			null;
	},

	renderLinks(links) {
		let linkArray = [];
		for (let link in links) {
			linkArray.push(
				<li key={link} id={link} className='dropdown-link'
					onClick={(event) => { if(event)this.toggleDropdown(link)} }>
					{link}
					{this.renderDropdown(link)}
				</li>
			)
		}
		return (
			<ul>
				{linkArray}
			</ul>
		);
	},

	render() {
		return (
			<nav className='nav'>
				{this.renderLinks(items)}
			</nav>
		);
	}
});