import React from 'react';
import page  from 'page';

export default React.createClass({
	propTypes: {
		items:   React.PropTypes.array
	},

	renderItems() {
		console.log(this.props.items)
		return this.props.items.map((item, index) => {
			return (
				<li key={index} className='dropdown-item' onClick={item.onClick}>
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