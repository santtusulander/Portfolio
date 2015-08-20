import React from 'react';
import page  from 'page';
import Navigation from '../components/navigation';

export default React.createClass({

	render(){
		return (
			<div>
				<button onClick={() => {page.show('/works');}}/>
				<Navigation view='index'/>
			</div>
		);
	}
});