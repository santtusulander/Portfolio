import React from 'react';
import page  from 'page';

export default React.createClass({
	propTypes: {
		slides:   React.PropTypes.array
	},

	render() {
		return (
			<section>
				{this.props.slides}
			</section>
		);
	}
});