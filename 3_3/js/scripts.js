/*
3. Ajaxowy polyfill dla funkcji fetch
Napisz polyfill dla funkcji fetch (nie będziemy się tutaj trzymać dokładnie tego, w jaki
sposób ona działa, stworzysz jedynie prostą jej wersję). Wykorzystaj obiekt XMLHttpRequest 
w ten sposób, aby docelowo korzystanie z funkcji fetch wyglądało następująco:
fetch("url", function(data) {
    console.log("Sukces");
    console.log(data);
}, function(err) {
    console.log("Wystąpił błąd!");
    console.log(err);
});
a zatem jako pierwszy argument przekazujemy adres URL (wyślij pod niego zapytanie GET), 
jako drugi funkcję, którą należy wykonać jeśli wszystko się powiedzie (przekaż jej pobrane dane), 
a jako trzeci funkcję, która wykona się na wypadek błędu (przekaż jej obiekt z błędem lub komunikat tekstowy). 
W nowoczesnych przeglądarkach istnieje już funkcja fetch, a zatem aby jej nie nadpisywać, możesz nadać jej inną nazwę. 
Jako adres URL, z którego pobierane bedą dane, możesz wykorzytać https://jsonplaceholder.typicode.com/users

*/

(function() {


    function fetchh(url, success, fail) { 
        
        if(arguments.length !== 3 
            || typeof url !== "string"  || url instanceof String
            || typeof success !== "function"
            || typeof fail !== "function" ){

            throw new Error("Podaj prawidłowe parametry");
        } 
        

        var xhr = new XMLHttpRequest();

        xhr.open("GET", url, true);


    //WERSJA 1:
        xhr.onload = function(e) {
            if (this.status === 200) {
                success(xhr.responseText);
            } else {
                fail( new Error("Błąd - status HTTP: " + xhr.status) );
                
            }
        };        

    //WERSJA 2:
        // xhr.onreadystatechange = function(e) { 
        //     if (this.readyState === 4 && this.status === 200) {
        //         success(xhr.responseText);
        //     } else if (this.readyState === 4 && this.status !== 200) {
        //        fail( new Error("Błąd - status HTTP: " + this.status) );
        //     }
        // };

        xhr.onerror = function(e) {
            fail( new Error("Błąd: " + e.type) );
        }

        xhr.send();


    }



    document.querySelector("#button").addEventListener("click", function(e) {

        var result = document.querySelector("#response");


        fetchh("http://code.eduweb.pl/bootcamp/users/", function(data) {
            console.log("Sukces");
            console.log(data);
            result.textContent = data;
            console.log(typeof data);
        }, function(err) {
            console.log("Wystąpił błąd!");
            console.log(err);
        });

    }, false);


})();
