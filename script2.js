
$().ready(function () {
    var engine = {
        results: [0],
        dataJSON: [],

        // app makes request to WIKI API
        getData: function () {
            // console.log('GetData - this: ' + self);
            var self = this;
            var url = "http://en.wikipedia.org/w/api.php?format=json&action=query&prop&list=search&srsearch=metal&srlimit=50&titles=metal&origin=*";
            $.getJSON(url, function (data) {
                console.log(data);
                var length = data.query.search.length;
                for(var i = 0; i<length; i++){
                    if(i % 10 === 0){
                        var arr = [];
                    }
                    var obj = {}; // bez tego mamy tylko jeden obiekt
                    obj.title = data.query.search[i].title;
                    obj.snippet = data.query.search[i].snippet;
                    arr.push(obj);
                    if(i % 10 === 0){
                        self.dataJSON.push(arr);
                    }
                }
                console.log(self.dataJSON);
            });
        },

        // Random button
        getRadomData: function () {
        },

        // wyświetl dane
        showData: function () {

            // pagination
            var navigation = '<nav aria-label="Page navigation">' + 
                                '<ul class="pagination">'+
                                    '<li class="page-item">' +
                                        '<a class="page-link" href="#" aria-label="Previous">' +
                                        '<span aria-hidden="true">&laquo;</span>' +
                                        '<span class="sr-only">Previous</span>' +
                                        '</a>' +
                                    '</li>';
            var numPages = engine.dataJSON.length
            for(var i = 0; i<numPages; i++){
                navigation += '<li class="page-item"><a class="page-link" data-pagenum="'+i+'" href="#">'+(i+1)+'</a></li>';
            }
            navigation += '<li class="page-item">' +
                                '<a class="page-link" href="#" aria-label="Next">' +
                                '<span aria-hidden="true">&raquo;</span>' +
                                '<span class="sr-only">Next</span>' +
                                '</a>'
                            '</li>'
                        '</ul>'
                    '</nav>';
            $('.nav').html(navigation);
            $('a.page-link').click(function() {
                var pageNum = $(this).data('pagenum');
                setPage(pageNum);
            });
            setPage(0);
            
            // inner helper function
            function setPage(num) {
                $('#results').html('');
                engine.dataJSON[num].forEach(function (item) {
                result = $('<div>').html('<p>'+ item.title +'</p><p>'+item.snippet+'</p>')
                $('#results').append(result);
                });
            }
        }
    }
    $('#show').click(engine.showData);
    engine.getData();
    // engine.showData();
    // engine.setResults();
});