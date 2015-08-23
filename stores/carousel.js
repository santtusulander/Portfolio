import flux   from '../flux';
import Action from '../actions';

/**
 *
 */
let item = null;
export default flux.store({
	getItem() {
		return item
	},

	handlers: {
		[Action.Carousel.MoveTo](index) {
			item = index
		},
		[Action.Carousel.Move](direction) {
			item = direction
		}
	}
});
