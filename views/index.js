import React from 'react';
import page  from 'page';

import Navigation from '../components/navigation';
import Carousel   from '../components/carousel';

export default React.createClass({

	render(){
		let slides=[
			{
				content:
				<div style={{width: 40 + '%', border: '1px solid', margin: 'auto',
					marginTop: 8 + '%', fontSize: 0.5 + 'em', padding: 10}}>
						The Magnificent
				</div>
			},
			{
				content: <div style={{width: 100 + '%', height: 100 + '%', backgroundColor:'#' + 'C37C00'}} />
			},
			{
				content: <div style={{width: 100 + '%', height: 100 + '%', backgroundColor:'#' + '9E174D'}} />
			},
			{
				content: <div style={{width: 100 + '%', height: 100 + '%', backgroundColor:'#' + 365151}} />
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
