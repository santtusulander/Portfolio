import React from 'react/addons';
import page  from 'page';

import SlideStore from '../stores/slide';
import Navigation from '../components/navigation';
import Carousel   from '../components/carousel';

export default React.createClass({
	propTypes: {
		work: React.PropTypes.string
	},

	render(){
		return (
			<div>
				<Navigation view='index'/>
				<Carousel class='work-view'>
					<section className="title-view">
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