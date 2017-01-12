$().ready(function () {
	$('#wiki-search-button').click($.proxy(engine.getData, engine));

  $(document).bind('keypress',pressed);

});

function pressed(e)
{
    if(e.keyCode === 13)
    {
       engine.getData();
    }
}