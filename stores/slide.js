import flux   from '../flux';
import Action from '../actions';

/**
 *
 */
let slide = 0;
export default flux.store({
	getSlide() {
		return slide
	},

	handlers: {
		[Action.Slide.SetSlide](payload) {
			slide = {
				index: payload.index,
				element: payload.element
			}
		}
	}
});