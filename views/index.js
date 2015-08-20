import React from 'react';
import page  from 'page';

import Navigation from '../components/navigation';
import Carousel   from '../components/carousel';

let slides=[
	<div className='slide'>jaa</div>,
	<div className='slide'>juu</div>
];

export default React.createClass({

	render(){
		return (
			<div>
				<Navigation view='index'/>
				<Carousel slides={slides} />
			</div>
		);
	}
});