import React from 'react';
import page  from 'page';
import Navigation from '../components/navigation';

let slides=[
	<div>jaa</div>,
	<div>juu</div>
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