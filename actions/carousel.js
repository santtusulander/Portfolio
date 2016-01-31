import flux            from '../flux';
import Action          from '../actions';

/**
 *
 */
export default flux.actionCreator({
	moveToSlide(slideIndex, current) {
		if(slideIndex !== current)
			this.dispatch(Action.Carousel.MoveTo, slideIndex);
	},
	moveCarousel(direction) {
		this.dispatch(Action.Carousel.Move, direction);
	}
});
