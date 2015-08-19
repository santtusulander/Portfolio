import React from 'react';
import page  from 'page';

export default React.createClass({
	propTypes: {
		invoker: React.PropTypes.string,
		items:   React.PropTypes.array
	},

	renderItems() {
		return this.props.items.map((item, index) => {
			console.dir(item, index)
			return (
				<li key={index} className='dropdown-item' onClick = {item.onClick}>
					{item.title}
				</li>
			);
		});
	},

	render() {
		return (
			<section>
				<ul>
					{this.renderItems()}
				</ul>
			</section>
		);
	}
});