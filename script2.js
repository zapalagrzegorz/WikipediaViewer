
$().ready(function () {
    var engine = {
        results: [0],
        dataJSON: [],

        // app makes request to WIKI API
        getData: function () {
            // console.log('GetData - this: ' + self);
            var self = this;
            var url = "http://en.wikipedia.org/w/api.php?format=json&action=query&list=search&srsearch=metal&srlimit=50&titles=metal&origin=*";
            $.getJSON(url, function (data) {
                console.log(data);
                data.query.search.forEach(
                    function (element, index) {
                        var obj = {}; // bez tego mamy tylko jeden obiekt
                        obj.title = element.title;
                        obj.snippet = element.snippet;
                        obj.index = 
                        self.dataJSON.push(obj);
                    }
                );
                console.log(self.dataJSON);
            });
        },
        // ?
        setResults: function () {


            // console.log('this: ' + this);
            // console.log('results: ');
            // console.log(this.results);
            var pagesNum = data.query.search.length / 10;
        },

        // Random button
        getRadomData: function () {
        },

        // wyświetl dane
        showData: function () {
            console.log('Show data function');
            engine.dataJSON.forEach(function (item) {
                var result = $('div').html('<p>'+item.title+'</p><p>'+item.snippet+'</p>')
                $('#results').append(result);
            });
        }
    }
    $('#show').click(engine.showData);
    engine.getData();
    // engine.showData();
    // engine.setResults();
});