import React from 'react/addons';
import page  from 'page';
import Navigation from '../components/navigation';
import Carousel   from '../components/carousel';

export default React.createClass({

	render(){
		return (
			<div>
			<Navigation/>
				<button onClick={() => {page.show('/works/php');}}/>
				<button onClick={() => {page.show('/');}}/>
			</div>
		);
	}
});