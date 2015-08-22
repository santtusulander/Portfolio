import flux   from '../flux';
import Action from '../actions';

import throttle from 'lodash.throttle';

/**
 *
 */
function createAction(payload) {
	ActionCreator.setSlide(payload);
}

let throttled = throttle(createAction, 200);

const ActionCreator = flux.actionCreator({

	setSlide(payload) {
		this.dispatch(Action.Slide.SetSlide, payload);
	},
	setCurrentSlide(payload) {
		throttled(payload);	
	}
});

export default ActionCreator;