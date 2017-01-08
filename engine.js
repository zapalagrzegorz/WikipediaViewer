
var engine = {
    dataJSON: [],
    currentPage : 0,
    self : this,
    // app makes request to WIKI API
    getData: function (event) {
        var self = this;
        console.log(self);
        var search = $( "#wiki-search" ).val();
        var url = "http://en.wikipedia.org/w/api.php?format=json&action=query&prop&list=search&srlimit=50&formatversion=2&origin=*&srsearch=" + search;
        $.getJSON(url, function (data) {
            console.log(data);
            var length = data.query.search.length;
            for (var i = 0; i < length; i++) {
                if (i % 10 === 0) {
                    var arr = [];
                }
                var obj = {}; // bez tego mamy tylko jeden obiekt
                obj.title = data.query.search[i].title;
                obj.snippet = data.query.search[i].snippet;
                arr.push(obj);
                if (i % 10 === 0) {
                    self.dataJSON.push(arr);
                }
            }
            self.showData();
        });

    },

    // Random button
    getRadomData: function () {
    },

    // presents data on page
    showData: function () {
        // var self = this;
        console.log(self);
        setPagination();

        $('a.page-link').click(function (event) {
            event.preventDefault();
            // console.log(cP);
            var pageNum = $(this).data('pagenum');
            if(pageNum === -1 && (self.currentPage-1) >= 0){
                setPage(self.currentPage-1);
            }
            else if (pageNum > 0) {
                setPage(pageNum);
            }
            else{
                return false;
            }

        });
        // $('a.previousPage').click(function(event){
        //     event.preventDefault();
        //     if((this.currentPage-1) < 0){
        //         return false
        //     }
        // });

        setPage(0);

        // sets pagination 
        function setPagination() {
            var navigation = '<nav aria-label="Page navigation">' +
                '<ul class="pagination">' +
                '<li class="page-item">' +
                '<a class="page-link previousPage" href="#" aria-label="Previous" data-pagenum="-1">' +
                '<span aria-hidden="true">&laquo;</span>' +
                '<span class="sr-only">Previous</span>' +
                '</a>' +
                '</li>';
            var numPages = engine.dataJSON.length
            for (var i = 0; i < numPages; i++) {
                navigation += '<li class="page-item"><a class="page-link" data-pagenum="' + i + '" href="#">' + (i + 1) + '</a></li>';
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
        }
        // sets results
        function setPage(pageNum) {
            this.currentPage = pageNum;
            $('#results').html('');
            engine.dataJSON[pageNum].forEach(function (item) {
                var result = $('<div class="wiki-results default-primary-color">').html('<a class="text-primary-color" href="https://en.wikipedia.org/wiki/' + item.title + '"><div class="wiki-header"><h2>' + item.title + '</h2></a></div><p class="wiki-extract">' + item.snippet + '</p>')
                $('#results').append(result);
            });
        }
    }
}