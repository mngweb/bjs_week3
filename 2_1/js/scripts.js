/*
1. Polyfill metody repeat dla String
W standardzie EcmaScript 2015 pojawiła się nowa metoda dostępna na obiektach typu
String o nazwie repeat. Jej użycie wygląda następująco:
“hej ”.repeat(3) // zwraca “hej hej hej ”
Metoda ta jest dostępna we wszystkich nowoczesnych przeglądarkach internetowych, ale
aby poćwiczyć rozszerzanie wbudowanych typów, utwórz jej polyfill. W kodzie sprawdź
najpierw czy taka metoda już w przeglądarce została zaimplementowana, a jeśli nie, to
dopisz własną funkcję, która będzie mogła być na dowolnym stringu wywołana w podany
wyżej sposób. Podpowiedź: rozszerzaj prototyp konstruktora String. Przy sprawdzeniu czy
taka metoda już istnieje, w nowoczesnych przeglądarkach otrzymasz odpowiedź
pozytywną. Jeśli zatem napiszesz odpowiedni warunek, to nie będzie można przetestować
Twojej metody. Z tego powodu, zamiast repeat możesz ją nazwać repeatt
*/


if (!String.prototype.repeatt) {

    String.prototype.repeatt = function(x) {

        x = Number(x);

        if( isNaN(x)){
            throw new Error("Podaj prawidłową liczbę powtórzeń.");
        }

        if( x < 0 ){
            throw new RangeError("Podaj dodatnią liczbę powtórzeń."); 
        };


        var result = "",
            s = this.toString();

        for (var i = 0; i < x; i++) {
            result += s;
        }

        return result;

    }

}


(function() {

    var output = document.getElementById("repeated"),
        form = document.getElementById("form"),
        textField = document.getElementById("text"),
        countField = document.getElementById("count");


    form.addEventListener("submit", function(e) {
        var text = textField.value,
            count = parseInt(countField.value);

        e.preventDefault();

        output.textContent = "";


        try{
            var result = text.repeatt(count);
            output.textContent = "Wynik powtórzenia: " + result;
        }
        catch(e){
            output.textContent = e.message;
        }


    }, false);

})();
