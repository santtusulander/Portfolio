import React from 'react/addons';
import page  from 'page';

import Navigation from '../components/navigation';
import Carousel   from '../components/carousel';

export default React.createClass({
	render(){
		return (
			<div>
				<Navigation view='index'/>
				<Carousel navVisible={true} class='carousel-window'>
				<div style={{width: 40 + '%', border: '1px solid', margin: 'auto',
					marginTop: 8 + '%', fontSize: 0.5 + 'em', padding: 10}}>
						The Magnificent
				</div>
				<div style={{width: 100 + '%', height: 100 + '%', backgroundColor:'#' + 'C37C00'}} />
				<div style={{width: 100 + '%', height: 100 + '%', backgroundColor:'#' + '9E174D'}} />
				<div style={{width: 100 + '%', height: 100 + '%', backgroundColor:'#' + 365151}} />
				</Carousel>
			<button onClick={() => {page.show('/works/php');}}/>
			</div>
		);
	}
});
