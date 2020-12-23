'use strict';
var parsed_data = null;
var currentPage = 0;
var maxPage = 0;

(function () {
    function init() {
        var router = new Router([
            new Route('home', 'home.html', true),            
            new Route('about', 'about.html')
        ]);
    }
    init();
}());

function getPrevPage(){
    if (currentPage > 0){
        currentPage--;
        findExamples(currentPage);
    }
};

function getNextPage(){
    if (currentPage < maxPage - 1){
        currentPage++;
        findExamples(currentPage);
    }
}


// https://dartloli.pythonanywhere.com/request
function findExamples(currentPage = 0, fractional = 5) {

    console.log('Click find!');
    //e.preventDefault();
    console.log(JSON.stringify({
        "words" : $('#input').val(),       
        "examples": 10
    }));

    $('#result').html('Загрузка...');
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        url: "https://dartloli.pythonanywhere.com/request",
        data: JSON.stringify({
            "words" : $('#input').val(),       
            "examples": 10,
            "currentPage": currentPage,
            "fractional": fractional
        }),
        success: function (response) {
            console.log(response);
            //parsed_data = response['words'];
            currentPage = response['currentPage'];
            maxPage = response['maxPage'];

            var html = '<ul>';
            response['words'].forEach(element => {
                html+=`<li> ${element} </li>`;
            });
            html += '</ul>';
            $('#result').html(html);
            $('#bottom_bar').show();
        }
    }).fail(function (jqXHR, textStatus, error) 
    {
        $('#result').html('<h2>Нет результата</h2>');
        $('#bottom_bar').hide();
        console.log(jqXHR); 
        console.log(textStatus);
        console.log(error);
    });
};

