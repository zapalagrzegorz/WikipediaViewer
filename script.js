$().ready(function () {
    $('#wiki-search-button').click($.proxy(engine.getData, engine));
});