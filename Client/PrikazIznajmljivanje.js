import { Korisnik } from "./Korisnik.js";
import { Automobil } from "./Automobil.js";
export class PrikazIznajmljivanje {
    constructor(idAgencije) {
        this.idAgencije = idAgencije;
        this.host = null;
        this.listaAutomobila = [];
        this.listaKorisnika = [];
    }

    iznajmiAutomobil(korisnikId, automobilId, dod, ddo) {
        fetch(`https://localhost:5001/Korisnik/DodajIznajmljivanjeZaKorisnika/${korisnikId}/${automobilId}/${dod}/${ddo}`, { method: "POST" }).then(p => {
            if (!p.ok) {
                window.alert("Nije moguce iznajmnljivanje!");
            } else {
                window.alert("Uspesno iznajmljeno!");
            }
        });
    }
    pretraziDostupnost(dod, ddo, tabela) {
        fetch(`https://localhost:5001/Automobil/PreuzmiDostupneAutomobile/${this.idAgencije}/${dod}/${ddo}`).then(p => {
            if (!p.ok) {
                window.alert("Nije moguce pribaviti automobile!");
            } else {
                p.json().then(automobili => {
                    this.listaAutomobila.length = 0;
                    automobili.forEach(a => {
                        this.listaAutomobila.push(new Automobil(a.id, a.tablice, a.proizvodjac, a.godinaProizvodnje, a.naziv, a.potrosnjaPoKm, a.snagaMotora, a.boja, a.cenaPoDanuRSD));
                    });
                    this.crtajTabeluAutomobila(tabela);
                })
            }
        });
    }
    crtajZaglavljeKorisnika(host) {
        let zaglavlje = document.createElement("tr");
        zaglavlje.className = "trZaglavlje";
        host.appendChild(zaglavlje);

        let ime = document.createElement("th");
        ime.innerHTML = "Ime";
        zaglavlje.appendChild(ime);

        let prezime = document.createElement("th");
        prezime.innerHTML = "Prezime";
        zaglavlje.appendChild(prezime);

        let brTel = document.createElement("th");
        brTel.innerHTML = "Broj Telefona";
        zaglavlje.appendChild(brTel);
    }
    crtajRedoveKorisnika(host) {
        this.listaKorisnika.forEach(korisnik => {
            let red = document.createElement("tr");
            red.value = korisnik.id;
            red.className = "trTabela";
            host.appendChild(red);

            let ime = document.createElement("td");
            ime.innerHTML = korisnik.ime;
            red.appendChild(ime);

            let prezime = document.createElement("td");
            prezime.innerHTML = korisnik.prezime;
            red.appendChild(prezime);

            let brTel = document.createElement("td");
            brTel.innerHTML = korisnik.brojTelefona;
            red.appendChild(brTel);


            red.addEventListener("click", (ev) => {
                let redovi = host.querySelectorAll(".trTabela");
                redovi.forEach(r => {
                    r.className = "trTabela";
                })
                red.className = "trTabela trSelektovanTabela";
            });
        });
    }

    crtajTabeluKorisika(host) {
        while (host.firstChild)
            host.removeChild(host.firstChild);
        this.crtajZaglavljeKorisnika(host);
        fetch("https://localhost:5001/Korisnik/PreuzmiKorisnikeIzAgencije/" + this.idAgencije).then(p => {
            if (!p.ok) {
                window.alert("Nije moguce pribaviti korisnike!");
            } else {
                p.json().then(korisnici => {
                    this.listaKorisnika.length = 0;
                    korisnici.forEach(k => {
                        this.listaKorisnika.push(new Korisnik(k.ime, k.prezime, k.telefon, k.id));
                    });
                    this.crtajRedoveKorisnika(host);
                })
            }
        });

    }

    crtajZaglavljeAutomobila(host) {
        let zaglavlje = document.createElement("tr");
        zaglavlje.className = "trZaglavlje";
        host.appendChild(zaglavlje);

        let proizvodjac = document.createElement("th");
        proizvodjac.innerHTML = "Proizvodjac";
        zaglavlje.appendChild(proizvodjac);

        let naziv = document.createElement("th");
        naziv.innerHTML = "Naziv";
        zaglavlje.appendChild(naziv);

        let godina = document.createElement("th");
        godina.innerHTML = "Godina";
        zaglavlje.appendChild(godina);

        let boja = document.createElement("th");
        boja.innerHTML = "Boja";
        zaglavlje.appendChild(boja);

        let cena = document.createElement("th");
        cena.innerHTML = "Cena po danu u RSD";
        zaglavlje.appendChild(cena);

    }

    crtajRedoveAutommobila(host) {
        this.listaAutomobila.forEach(auto => {
            let red = document.createElement("tr");
            red.value = auto.id;
            red.className = "trTabela";
            host.appendChild(red);

            let proizvodjac = document.createElement("td");
            proizvodjac.innerHTML = auto.proizvodjac;
            red.appendChild(proizvodjac);

            let naziv = document.createElement("td");
            naziv.innerHTML = auto.naziv;
            red.appendChild(naziv);

            let godina = document.createElement("td");
            godina.innerHTML = auto.godinaProizvodnje;
            red.appendChild(godina);

            let boja = document.createElement("td");
            boja.innerHTML = auto.boja;
            red.appendChild(boja);

            let cena = document.createElement("td");
            cena.innerHTML = auto.cenaPoDanuRSD;
            red.appendChild(cena);


            red.addEventListener("click", (ev) => {
                let redovi = host.querySelectorAll(".trTabela");
                redovi.forEach(r => {
                    r.className = "trTabela";
                })
                red.className = "trTabela trSelektovanTabela";
            });

        });
    }

    crtajTabeluAutomobila(host) {
        while (host.firstChild)
            host.removeChild(host.firstChild);
        this.crtajZaglavljeAutomobila(host);
        this.crtajRedoveAutommobila(host);
    }


    crtaj(host) {
        this.host = host;
        let divDodavanje = document.createElement("div");
        divDodavanje.className = "divUPrikazu";
        host.appendChild(divDodavanje);

        let divTabelaKorisnika = document.createElement("div");
        divTabelaKorisnika.className = "divUPrikazu";
        host.appendChild(divTabelaKorisnika);

        let tabela1 = document.createElement("table");
        tabela1.className = "trTabela";
        divTabelaKorisnika.appendChild(tabela1);
        this.crtajTabeluKorisika(tabela1);

        let divTabela2 = document.createElement("div");
        divTabela2.className = "divUPrikazu";
        host.appendChild(divTabela2);

        let tabela2 = document.createElement("table");
        tabela2.className = "trTabela";
        divTabela2.appendChild(tabela2);
        this.crtajTabeluAutomobila(tabela2);

        //treba nam boksevi za upis datuma
        //pocetni datum
        let divDatumOd = document.createElement("div");
        divDatumOd.className = "divRed";

        let lblOd = document.createElement("label");
        lblOd.className = "lblRed";
        lblOd.innerHTML = "Od";
        divDatumOd.appendChild(lblOd);

        let tbxDatumOd = document.createElement("input");
        tbxDatumOd.type = "datetime-local";
        divDatumOd.appendChild(tbxDatumOd);

        divDodavanje.appendChild(divDatumOd);

        //za krajnji datum
        let divDatumDo = document.createElement("div");
        divDatumDo.className = "divRed";

        let lblDo = document.createElement("label");
        lblDo.className = "lblRed";
        lblDo.innerHTML = "Do";
        divDatumDo.appendChild(lblDo);

        let tbxDatumDo = document.createElement("input");
        tbxDatumDo.type = "datetime-local";
        divDatumDo.appendChild(tbxDatumDo);

        divDodavanje.appendChild(divDatumDo);

        let divPretrazi = document.createElement("div");
        divPretrazi.className = "divRed";

        let btnPretrazi = document.createElement("button");
        btnPretrazi.innerHTML = "Pretrazi";
        btnPretrazi.className = "btnPrikaz";
        divPretrazi.appendChild(btnPretrazi);

        divDodavanje.appendChild(divPretrazi);

        //dugme
        let divIznajmi = document.createElement("div");
        divIznajmi.className = "divRed";

        let btnIznajmi = document.createElement("button");
        btnIznajmi.innerHTML = "Iznajmi";
        btnIznajmi.className = "btnPrikaz";
        divIznajmi.appendChild(btnIznajmi);

        divDodavanje.appendChild(divIznajmi);

        btnPretrazi.onclick = (ev) => {
            let ddo = tbxDatumDo.value;
            let dod = tbxDatumOd.value;
            if (!dod || !ddo) {
                window.alert("Unesite datume!");
            } else {
                this.pretraziDostupnost(dod, ddo, tabela2);
            }
        }

        btnIznajmi.onclick = (ev) => {
            let korisnikId = divTabelaKorisnika.querySelector(".trSelektovanTabela").value;
            if (!korisnikId) {
                window.alert("Selektujte korisnika!");
                return;
            }
            let automobilId = divTabela2.querySelector(".trSelektovanTabela").value;
            if (!automobilId) {
                window.alert("Selektujte Automobil!");
                return;
            }
            let ddo = tbxDatumDo.value;
            let dod = tbxDatumOd.value;
            if (!dod || !ddo) {
                window.alert("Unesite datume!");
                return;
            }
            tbxDatumDo.value = "";
            tbxDatumOd.value = "";
            this.listaAutomobila.length = 0;
            this.iznajmiAutomobil(korisnikId, automobilId, dod, ddo);
            this.crtajTabeluKorisika(tabela1);
            this.crtajTabeluAutomobila(tabela2);
        }
    }
}