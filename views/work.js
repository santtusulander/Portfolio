import React from 'react/addons';
import page  from 'page';

import SlideStore from '../stores/slide';
import Navigation from '../components/navigation';
import Carousel   from '../components/carousel';

export default React.createClass({
	propTypes: {
		work: React.PropTypes.string
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
					<section>
						{this.props.work}
					</section>
				</Carousel>
			</div>
		);
	}
});