import flux   from '../flux';
import Action from '../actions';

/**
 *
 */
let slide = null
export default flux.store({
	getSlide() {
		return slide
	},

	handlers: {
		[Action.Carousel.Move](payload) {
			slide = payload
		}
	}
});