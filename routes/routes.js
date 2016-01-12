import page      from 'page';
import React     from 'react';

import IndexView   from '../views/';
import WorkView    from '../views/work';

page('/', () => {
	page.redirect('/basic');
});

page('/basic', () => {
	return React.render(
		<IndexView />,
		document.getElementById('application')
	);
});

page('/layout-example', () => {
	return React.render(
		<WorkView work="Click me!"/>,
		document.getElementById('application')
	);
});

page.start();