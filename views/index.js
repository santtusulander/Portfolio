import React from 'react';
import page  from 'page';
import Navigation from '../components/navigation';

export default React.createClass({
	componentWillMount(){
		console.log('juuh elicks')
	},

	render(){
		return (
			<div>
				<button onClick={() => {page.show('/works');}}/>
				<Navigation view='index'/>
			</div>
		);
	}
});