exports.home = function(req, res) 
{
	var react = require('react');
	var dom = require('react-dom/server');
	var form = react.createFactory(require('../views/components/form'));
	var form_html = dom.renderToString(form({}));
	res.render('index.ejs', 
	{
		title:'home',
		body_class:'homepage',
		react_output: form_html
	});
};
