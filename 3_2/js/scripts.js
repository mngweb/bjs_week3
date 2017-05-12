/*
2. Wrapper Toggler dla elementów z drzewa DOM
Do przygotowanego pod adresem http://pastebin.com/hUK5tnh3 kodu dodaj konstruktor
(klasę) o nazwie Toggler. Przy tworzeniu nowych jej instancji z użyciem słowa kluczowego
new (jak możesz zobaczyć w przygotowanym kodzie) przekazywać będziemy selektor. Za
jego pomocą należy znaleźć na stronie odpowiedni element (skorzystaj z metody
document.querySelector) i zapisać go w nowo stworzonym obiekcie. Następnie dodaj 3
metody. Pierwsza z nich o nazwie getElem powinna po prostu zwrócić znaleziony
wcześniej element. Metoda show i hide powinny kolejno pokazywać i ukrywać element.
Jeśli wszystko wykonasz poprawnie, kod który został już napisany powinien działać bez
żadnych modyfikacji. Zauważ, że do elementu o identyfikatorze button zostało przypisane
zdarzenie kliknięcia. Taki element musisz wstawić na stronę, podobnie jak i element,
którego selektor zostanie przekazany przy tworzeniu nowego obiektu klasy Toggler.
*/


function Toggler(selector){

    if(!(this instanceof Toggler)){
        return new Toggler(selector);
    }

    this.elem = document.querySelector(selector);

}

Toggler.prototype.getElem = function(){
        return this.elem;
    };

Toggler.prototype.show = function(){
        this.elem.style.display = "";
        //this.elem.classList.remove('hidden');  //nie działa
    };

Toggler.prototype.hide = function(){
        this.elem.style.display = "none";  
        //this.elem.classList.add('hidden');
    };


(function(){

    var elem = new Toggler("#section");
    var button = document.querySelector("#button");

    button.addEventListener("click", function() {

        if(elem.getElem().style.display == "none") {   
            elem.show();
        } else {
            elem.hide();
        }

    }, false);

})();