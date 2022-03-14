import { PrikazKorisnici } from "./PrikazKorisnici.js";
import { PrikazAutomobili } from "./PrikazAutomobili.js";
import { PrikazIznajmljivanje } from "./PrikazIznajmljivanje.js";


let trAgencija;

let divSelekcija = document.createElement("div");
divSelekcija.className = "divKontrola";

let Naslov = document.createElement("label");
Naslov.className = "Naslov";
Naslov.innerHTML = "RENTA CAR AGENCIJA"
divSelekcija.appendChild(Naslov);

let selAgencija = document.createElement("select");
selAgencija.className = "selAgencija";

divSelekcija.appendChild(selAgencija);
document.body.appendChild(divSelekcija);

fetch("https://localhost:5001/Agencija/PreuzmiAgencije").then(p => {
    if (!p.ok) {
        window.alert("Nije moguce pribaviti agencije!");
    } else {
        p.json().then(agencije => {
            agencije.forEach(a => {
                let opt = document.createElement("option");
                opt.innerHTML = a.naziv;
                opt.value = a.id;
                selAgencija.appendChild(opt);
            });
            trAgencija = selAgencija.options[selAgencija.selectedIndex].value;
            prikazKorisnici();
        })
    }
});

selAgencija.onchange = (ev) => {
    trAgencija = selAgencija.options[selAgencija.selectedIndex].value;
    obrisiPrikaz();
    prikazKorisnici();
}

let divDugmici = document.createElement("div");
divDugmici.className = "divKontrola";
document.body.appendChild(divDugmici);

let btnKorisnici = document.createElement("button");
btnKorisnici.className = "btnSelekcija";
btnKorisnici.innerHTML = "Korisnici";
btnKorisnici.onclick = (ev) => {
    obrisiPrikaz();
    prikazKorisnici();
}

divDugmici.appendChild(btnKorisnici);

let btnAutomobil = document.createElement("button");
btnAutomobil.className = "btnSelekcija";
btnAutomobil.innerHTML = "Automobili";
btnAutomobil.onclick = (ev) => {
    obrisiPrikaz();
    prikazAutomobil();
}

divDugmici.appendChild(btnAutomobil);


let btnIznajmljivanje = document.createElement("button");
btnIznajmljivanje.className = "btnSelekcija";
btnIznajmljivanje.innerHTML = "Iznamljivanje";
btnIznajmljivanje.onclick = (ev) => {
    obrisiPrikaz();
    prikazIznajmljivanje();
}

divDugmici.appendChild(btnIznajmljivanje);

let divPrikaz = document.createElement("div");
divPrikaz.className = "divPrikaz";
document.body.appendChild(divPrikaz);

function obrisiPrikaz() {
    while (divPrikaz.firstChild)
        divPrikaz.removeChild(divPrikaz.firstChild);
}

function prikazKorisnici() {
    let prikaz = new PrikazKorisnici(trAgencija);
    prikaz.crtaj(divPrikaz);
}

function prikazAutomobil() {
    let prikaz = new PrikazAutomobili(trAgencija);
    prikaz.crtaj(divPrikaz);
}

function prikazIznajmljivanje() {

    console.log("Iznajmljivanje!!!");
    let prikaz = new PrikazIznajmljivanje(trAgencija);
    prikaz.crtaj(divPrikaz);

}