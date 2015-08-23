import React from 'react';
import page  from 'page';

import Navigation from '../components/navigation';
import Carousel   from '../components/carousel';

export default React.createClass({

	render(){
		let slides=[
			{
				content: <img style={{width: 100 + '%'}}
				src="http://oppiminen.yle.fi/sites/oppiminen.yle.fi/files/images/siili_kuva_risto_salovaara.jpg"/>
			},
			{
				content: 'jaa'
			},
			{
				content: 'jaa'
			},
			{
				content: 'vika'
			}
		]
		return (
			<div>
				<Navigation view='index'/>
				<Carousel slides={slides} />
			</div>
		);
	}
});
