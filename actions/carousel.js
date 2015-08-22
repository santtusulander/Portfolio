import flux            from '../flux';
import Action          from '../actions';

/**
 *
 */
export default flux.actionCreator({
	moveSlide(slideIndex) {
		this.dispatch(Action.Carousel.Move, slideIndex);
	}
});