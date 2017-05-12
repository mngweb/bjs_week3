/*
4. Funkcja getJSON
Mając już rozwiązanie zadania trzeciego, przepisz swój kod tak, aby stworzyć nową funkcję
o nazwie getJSON. Idea działania i użycie będą bardzo podobne:
getJSON("url", function(data) {
console.log("Sukces");
console.log(data);
// typeof data powinno zwrócić “object”
}, function(err) {
console.log("Wystąpił błąd!");
console.log(err);
});
Różnica jest taka, że tym razem pod parametrem data przekazanym w funkcji callback,
powinien się znajdować javascriptowy obiekt, a nie string przysłany z serwera. Serwer,
który przygotowaliśmy pod tym adresem: http://code.eduweb.pl/bootcamp/users/ działa tak,
że po otrzymaniu standardowego zapytania GET, np. kiedy wpiszesz ten adres w
przeglądarce lub wyślesz zapytanie Ajaxem, zwróci dane zawarte w kodzie HTML. Jeśli
jednak przy wysyłaniu zapytania dodasz nagłówek Accept: application/json, to serwer
zwróci te same dane, ale w formacie JSON (bez kodu HTML). Z poziomu Twojego kodu
JavaScript, otrzymane Ajaxem dane to cały czas typ String, ale za pomocą metody
JSON.parse możesz ten string łatwo zamienić na javascriptowy obiekt. To jest właśnie
Twoje zadanie. Wysyłając żądanie do serwera, dodaj wspomniany wcześniej nagłówek za
pomocą metody setRequestHeader, a otrzymane dane sparsuj za pomocą JSON.parse i
dopiero wtedy przekaż jako parametr data do funkcji callback.

*/

(function() {


    function getJSON(url, success, fail) { 
        
        if(arguments.length !== 3 
            || typeof url !== "string"  || url instanceof String
            || typeof success !== "function"
            || typeof fail !== "function" ){

            throw new Error("Podaj prawidłowe parametry");
        } 
        

        var xhr = new XMLHttpRequest();

        xhr.open("GET", url, true);

        xhr.setRequestHeader('Accept', 'application/json')


    //2 wersje z chyba tym samym efektem:
    //WERSJA 1:
        xhr.onload = function(e) {

            var res = JSON.parse(xhr.responseText);

            if (this.status === 200) {
                success(res);
            } else {
                fail( new Error("Błąd - status HTTP: " + xhr.status) );
            }
        };        

    //WERSJA 2:
        // xhr.onreadystatechange = function(e) { 

        //     var res = JSON.parse(xhr.responseText);

        //     if (this.readyState === 4 && this.status === 200) {
        //         success(res);
        //     } else if (this.readyState === 4 && this.status !== 200) {
        //         fail( new Error("Błąd - status HTTP: " + this.status) );
        //     }
        // };

        xhr.onerror = function(e) {
            fail( new Error("Błąd: " + e.type) );
        }

        xhr.send();


    }



    function createDataTable(data, container){
        var table = document.createElement("table");

        // nagłówki
        var tr = document.createElement("tr");
        for(var key in data[0]){
            var th = document.createElement("th");
            th.appendChild(document.createTextNode(key));
            tr.appendChild(th);                         
        }
        table.appendChild(tr); 
        

        // wiersze z danymi
        data.forEach(function(person){
            var tr = document.createElement("tr");
            for(var key in person){
                var td = document.createElement("td");
                td.appendChild(document.createTextNode(person[key]));
                tr.appendChild(td);    
            }
            table.appendChild(tr);  
        })

        container.appendChild(table);  

    }




    document.querySelector("#button").addEventListener("click", function(e) {

        var result = document.querySelector("#response");


        getJSON("http://code.eduweb.pl/bootcamp/users/", function(data) {
            console.log("Sukces");
            console.log(data);

            console.log(typeof data);

            //result.textContent = data;
            createDataTable(data, result);

        }, function(err) {
            console.log("Wystąpił błąd!");
            console.log(err);
        });

    }, false);


})();