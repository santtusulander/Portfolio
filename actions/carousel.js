import flux            from '../flux';
import Action          from '../actions';

/**
 *
 */
export default flux.actionCreator({
	moveToSlide(slideIndex) {
		this.dispatch(Action.Carousel.MoveTo, slideIndex);
	},
	moveCarousel(direction) {
		this.dispatch(Action.Carousel.Move, direction);
	}
});