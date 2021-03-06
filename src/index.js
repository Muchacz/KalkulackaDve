function solveExpression() {
  var vyraz = document.getElementById("vyraz").value;
  var zasobnik = new Array();
  var dosCislo = 0;
  for (var i = 0; i < vyraz.length; i++) {
    //není zadán legální znak
    /* if (parseInt(vyraz[i],10) !== [0 - 9] && vyraz[i] !== ["+", "-", "/", "*"]) {
      document.getElementById("vysledek").innerHTML = "0" ;
    }*/
    //je zadána cifra
    if ("0123456789".includes(vyraz[i].charAt(0))) {
      dosCislo *= 10;
      dosCislo += parseInt(vyraz[i], 10);
      // document.getElementById("vysledek").innerHTML = "1";
    }
    //je zadáno znaménko operace
    else if ("+-*/".includes(vyraz[i].charAt(0))) {
      zasobnik.push(dosCislo);
      dosCislo = 0;
      zasobnik.push(vyraz[i]);
      // document.getElementById("vysledek").innerHTML = "2";
    }
  }
  zasobnik.push(dosCislo);

  //průchod pro násobení a dělení

  for (i = 0; i < zasobnik.length; i++) {
    if ("*".includes(zasobnik[i][0])) {
      document.getElementById("vysledek").innerHTML = "2";
      zasobnik[i - 1] = zasobnik[i - 1] * zasobnik[i + 1];
      zasobnik.splice(i, 2);
      i--;
    } else if ("/".includes(zasobnik[i][0])) {
      zasobnik[i - 1] = zasobnik[i - 1] / zasobnik[i + 1];
      zasobnik.splice(i, 2);
      i--;
    }
  }

  //průchod pro sčítání a odčítání
  for (i = 0; i < zasobnik.length; i++) {
    if ("+".includes(zasobnik[i][0])) {
      zasobnik[i - 1] = zasobnik[i - 1] + zasobnik[i + 1];
      zasobnik.splice(i, 2);
      i--;
    } else if ("-".includes(zasobnik[i][0])) {
      zasobnik[i - 1] = zasobnik[i - 1] - zasobnik[i + 1];
      zasobnik.splice(i, 2);
      i--;
    }
  }
  // vyraz.value = zasobnik[0];
  document.getElementById("vysledek").innerHTML = "Výsledek je: " + zasobnik[0];
}

var input = document.getElementById("vyraz");

input.addEventListener("keyup", function(event) {
  event.preventDefault();

  if (event.keyCode === 13) {
    solveExpression();
  }
});
