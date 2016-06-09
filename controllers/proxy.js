exports.whatever = function(req, res)
{
	console.log('proxy');
	res.render('proxy',
	{
		title:'PROXY: '+res
	});

}
