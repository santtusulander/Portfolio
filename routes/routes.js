import page      from 'page';
import React     from 'react';

import IndexView   from '../views/';
import WorkView    from '../views/work';
import WorksView   from '../views/works';
import ContactView from '../views/contact';
import AboutView   from '../views/about';

page.redirect('/');
page('/', () => {
	return React.render(
		<IndexView />,
		document.getElementById('application')
	);
});

page('/works', () => {
	return React.render(
		<WorksView />,
		document.getElementById('application')
	);
});

page('/works/:work', (ctx) => {
	return React.render(
		<WorkView component={ctx.body.page} work={ctx.params.work}/>,
		document.getElementById('application')
	);
});

page('/contact', () => {
	return React.render(
		<ContactView />,
		document.getElementById('application')
	);
});

page('/about', () => {
	return React.render(
		<AboutView />,
		document.getElementById('application')
	);
});