import React from 'react';
import page  from 'page';

export default React.createClass({
	propTypes: {
		invoker: React.PropTypes.string,
		items:   React.PropTypes.arr
	},

	getInitialState() {
		return {
			dropDown: false
		};
	},

	renderItems() {
		return this.props.items.map((item) => {
			return (

				)
		})
	}

	render() {
		<section>
			<ul>
			</ul>
		</section>
	}
});