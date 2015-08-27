import React      from 'react/addons';
import page       from 'page';
import classnames from 'classnames';

let items = {
	works : [
		{
			title:   'php-application bundle',
			onClick: () => { page.show('/works/php') }
		},
		{
			title:   'java-application',
			onClick: () => { page.show('/works/java') }
		}
	],
	about : [
		{
			title:   'php-application sunder',
			onClick: () => { page.show('/works') }
		},
		{
			title:   'java-application',
			onClick: () => { page.show('/') }
		}
	]
}

export default React.createClass({
	propTypes: {
		view: React.PropTypes.string
	},

	getInitialState() {
		return {
			dropDownInvoker: null
		};
	},

	componentWillUnmount() {
		this.replaceState(this.getInitialState())
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

	renderDropdown(link) {
		return this.state.dropDownInvoker === link ?
			<ul className='dropdown-list'>
			{items[link].map((item, index) => {
				return (
					<li key={index} className='dropdown-item' onClick={item.onClick}>
						{item.title}
					</li>
				);
			})}
			</ul> : null;
	},

	renderLinks(links) {
		let linkArray = [];
		for (let link in links) {
			let classNames = classnames({
				dropdownLink: true,
				linkActive: link === this.state.dropDownInvoker
			});
			linkArray.push(
				<li key={link} id={link} className={classNames}
					onClick={(event) => { if(event)this.toggleDropdown(link)} }>
					{link}
					{this.renderDropdown(link)}
				</li>
			)
		}
		return (
			<ul className='dropdown-headers'>
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