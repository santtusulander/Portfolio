import React from 'react';
import page  from 'page';

import Dropdown from './dropdown';

export default React.createClass({
	propTypes: {
		view: React.PropTypes.string
	},

	getInitialState() {
		return {
			dropDown: false,
			dropDownInvoker: '',
		};
	},

	toggleDropdown(invoker) {
		this.setState({
			dropDown: !this.state.dropDown,
			dropDownInvoker: invoker
		});	
	},

	renderLinks(items) {
		let links = [];
		for (let key in items) {
			links.push(
				<li key={key} id={key} className='dropdown-link'
					onClick={(event) => {if(event)this.toggleDropdown(key)} }>
						{key}
				</li>
			)
		}
		return (
			<ul>
				{links}
			</ul>
		);
	},

	render() {
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
					title:   'php-application bundle',
					onClick: () => { page.show('works/php') }
				},
				{
					title:   'java-application',
					onClick: () => { page.show('works/java') }
				}
			]
		}
		let dropdown = this.state.dropDown ?
			<Dropdown
				invoker={this.state.dropDownInvoker}
				items={items[this.state.dropDownInvoker]}
			/> : null;

		return (
			<nav className='nav'>
				{this.renderLinks(items)}
				{dropdown}
			</nav>
		);
	}
});