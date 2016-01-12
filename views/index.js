import React from 'react/addons';
import page  from 'page';

import Navigation from '../components/navigation';
import Carousel   from '../components/carousel';

export default React.createClass({
	render(){
		return (
			<div>
				<Carousel navVisible={true} class='carousel-window'>
				<div className="slidetext">
						The Carousel keeps track of its current slide, which makes the
						slides freely selectable.
						These slides can contain Plain Text
				</div>
				<div>
					<div className="slidetext">
						Images
					</div>
					<img src="http://www.image.fi/sites/all/themes/custom/image_theme/logo.png"
						style={{maxWidth: 100 + "%", paddingTop: "20px"}}/>
				</div>
				<div>
					<div className="slidetext">
						and HTML elements.
					</div>
					<button className="btn" onClick={() => {page.show('/layout-example');}}>
						A page layout concept using this carousel
					</button>
				</div>
				</Carousel>
			</div>
		);
	}
});
