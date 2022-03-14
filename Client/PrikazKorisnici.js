import { Korisnik } from "./Korisnik.js";


export class PrikazKorisnici {
    constructor(idAgencije) {
        this.idAgencije = idAgencije;
        this.host = null;
        this.listaKorisnika = [];
        this.listaIznajmljivanja = [];
        this.trKorisnik = null;
    }
    promeniDatum(id, datum) {
        fetch("https://localhost:5001/Korisnik/PromeniDatum/" + id + "/" + datum, { method: "PUT" }).then(p => {
            if (!p.ok) {
                window.alert("Nije moguca promena datuma!");
            } else {
                this.crtajTabeluIznajmljivanja(this.trKorisnik, this.host.querySelector(".tblForma"));
            }
        });
    }
    brisiIznajmljivanje(id) {
        fetch(`https://localhost:5001/Korisnik/ObrisiIznajmljivanje/${id}`, { method: "DELETE" }).then(p => {
            if (!p.ok) {
                window.alert("Nije moguce brisanje!");
            } else {
                let tabela = this.host.querySelector(".tblForma");
                this.crtajTabeluIznajmljivanja(this.trKorisnik, tabela);
            }
        })
    }

    brisiKorisnika(id) {
        fetch(`https://localhost:5001/Korisnik/ObrisiKorisnika/${id}`, { method: "DELETE" }).then(p => {
            if (!p.ok) {
                window.alert("Nije moguce brisanje!");
            } else {
                this.crtajTabeluKorisika(document.querySelector(".tblForma"));
            }
        })
    }

    dodajKorisnika(ime, prezime, brojTelefona) {
        fetch(`https://localhost:5001/Korisnik/DodajKorisnika/${ime}/${prezime}/${brojTelefona}/${this.idAgencije}`, { method: "POST" }).then(p => {
            if (!p.ok) {
                window.alert("Korisnik nije dodat! Greska!");
            } else {
                this.crtajTabeluKorisika(document.querySelector(".tblForma"));
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
    crtajZaglavljeIznajmljivanja(host) {

        let zaglavlje = document.createElement("tr");
        zaglavlje.className = "trZaglavlje";
        host.appendChild(zaglavlje);

        let nazivAutomobila = document.createElement("th");
        nazivAutomobila.innerHTML = "Naziv Automobila";
        zaglavlje.appendChild(nazivAutomobila);

        let tablice = document.createElement("th");
        tablice.innerHTML = "Tablice";
        zaglavlje.appendChild(tablice);

        let od = document.createElement("th");
        od.innerHTML = "Iznajmljeno od";
        zaglavlje.appendChild(od);

        let Do = document.createElement("th");
        Do.innerHTML = "Iznajmljeno do";
        zaglavlje.appendChild(Do);
    }
    crtajRedoveIznajmljivanja(host) {
        this.listaIznajmljivanja.forEach(izn => {
            let red = document.createElement("tr");
            red.value = izn.id;
            red.className = "trTabela";
            host.appendChild(red);

            let naziv = document.createElement("td");
            naziv.innerHTML = izn.nazivAutomobila;
            red.appendChild(naziv);

            let tablice = document.createElement("td");
            tablice.innerHTML = izn.tabliceAutomobila;
            red.appendChild(tablice);

            let datumOd = document.createElement("td");
            datumOd.innerHTML = izn.datumOd;
            red.appendChild(datumOd);

            let datumDo = document.createElement("td");
            datumDo.innerHTML = izn.datumDo;
            red.appendChild(datumDo);

            red.addEventListener("click", (ev) => {
                let redovi = host.querySelectorAll(".trTabela");
                redovi.forEach(r => {
                    r.className = "trTabela";
                })
                red.className = "trTabela trSelektovanTabela";
            });
        });
    }
    crtajTabeluIznajmljivanja(idKorisnika, host) {
        while (host.firstChild)
            host.removeChild(host.firstChild);
        this.crtajZaglavljeIznajmljivanja(host);

        fetch("https://localhost:5001/Korisnik/PreuzmiIzanajmljivanjaZaKorisnika/" + idKorisnika).then(p => {
            if (!p.ok) {
                window.alert("Nije moguce preuzimanje iznajmljivanja!");
            } else {
                p.json().then(izn => {
                    this.listaIznajmljivanja.length = 0;
                    izn.forEach(iznajmljivanje => {
                        this.listaIznajmljivanja.push(iznajmljivanje);
                    });
                    this.crtajRedoveIznajmljivanja(host);
                });
            }
        })

    }
    crtaj(host) {
        this.host = host;
        let divDodavanje = document.createElement("div");
        divDodavanje.className = "divUPrikazu";
        host.appendChild(divDodavanje);

        let divTabela = document.createElement("div");
        divTabela.className = "divUPrikazu";
        host.appendChild(divTabela);

        let tabela = document.createElement("table");
        tabela.className = "tblForma";
        divTabela.appendChild(tabela);
        this.crtajTabeluKorisika(tabela);

        let divIznajmljivanje = document.createElement("div");
        divIznajmljivanje.className = "divUPrikazu";
        host.appendChild(divIznajmljivanje);

        let divIme = document.createElement("div");
        divIme.className = "divRed";

        let lblIme = document.createElement("label");
        lblIme.className = "lblRed";
        lblIme.innerHTML = "Ime";
        divIme.appendChild(lblIme);

        let tbxIme = document.createElement("input");
        tbxIme.type = "text";
        tbxIme.className = "tbxRed";
        divIme.appendChild(tbxIme);

        divDodavanje.appendChild(divIme);


        let divPrezime = document.createElement("div");
        divPrezime.className = "divRed";

        let lblPrezime = document.createElement("label");
        lblPrezime.className = "lblRed";
        lblPrezime.innerHTML = "Prezime";
        divPrezime.appendChild(lblPrezime);

        let tbxPrezime = document.createElement("input");
        tbxPrezime.type = "text";
        tbxPrezime.className = "tbxRed";
        divPrezime.appendChild(tbxPrezime);

        divDodavanje.appendChild(divPrezime);


        let divBroj = document.createElement("div");
        divBroj.className = "divRed";

        let lblBroj = document.createElement("label");
        lblBroj.className = "lblRed";
        lblBroj.innerHTML = "Broj Telefona";
        divBroj.appendChild(lblBroj);

        let tbxBroj = document.createElement("input");
        tbxBroj.type = "text";
        tbxBroj.className = "tbxRed";
        divBroj.appendChild(tbxBroj);

        divDodavanje.appendChild(divBroj);

        let divDodaj = document.createElement("div");
        divDodaj.className = "divRed";

        let btnDodaj = document.createElement("button");
        btnDodaj.innerHTML = "Dodaj Korisnika";
        btnDodaj.className = "btnPrikaz";
        divDodaj.appendChild(btnDodaj);

        divDodavanje.appendChild(divDodaj);

        let divObrisiIzmeni = document.createElement("div");
        divObrisiIzmeni.className = "divRed";

        let btnIzbrisi = document.createElement("button");
        btnIzbrisi.innerHTML = "Izbrisi Korisnika";
        btnIzbrisi.className = "btnPrikaz";
        divObrisiIzmeni.appendChild(btnIzbrisi);

        divDodavanje.appendChild(divObrisiIzmeni);


        let divIznamljivanja = document.createElement("div");
        divIznamljivanja.className = "divRed";

        let btnIznajljivanja = document.createElement("button");
        btnIznajljivanja.innerHTML = "Prikazi Iznajmljivanja";
        btnIznajljivanja.className = "btnPrikaz";
        divIznamljivanja.appendChild(btnIznajljivanja);

        divDodavanje.appendChild(divIznamljivanja);

        let divIzbrisiIznaj = document.createElement("div");
        divIzbrisiIznaj.className = "divRed";

        let btnIzbrisiIzn = document.createElement("button");
        btnIzbrisiIzn.className = "btnPrikaz btnBoja";
        btnIzbrisiIzn.innerHTML = "Izbrisi Iznajmljivanje";
        divIzbrisiIznaj.appendChild(btnIzbrisiIzn);
        divIznajmljivanje.appendChild(divIzbrisiIznaj);
        btnIzbrisiIzn.disabled = true;

        let divDatum = document.createElement("div");
        divDatum.className = "divRed";

        let lblDo = document.createElement("label");
        lblDo.className = "lblRed";
        lblDo.innerHTML = "Do";
        divDatum.appendChild(lblDo);

        let tbxDatum = document.createElement("input");
        tbxDatum.type = "datetime-local";
        divDatum.appendChild(tbxDatum);
        tbxDatum.disabled = true;

        divIznajmljivanje.appendChild(divDatum);

        let divProduzi = document.createElement("div");
        divProduzi.className = "divRed";

        let btnProduzi = document.createElement("button");
        btnProduzi.className = "btnPrikaz btnBoja";
        btnProduzi.disabled = true;
        btnProduzi.innerHTML = "Produzi Iznajmljivnaje";
        divProduzi.appendChild(btnProduzi);

        divIznajmljivanje.appendChild(divProduzi);

        let divVrati = document.createElement("div");
        divVrati.className = "divRed";

        let btnVrati = document.createElement("button");
        btnVrati.className = "btnPrikaz btnBoja";
        btnVrati.innerHTML = "Vrati prikaz korisnika";
        btnVrati.disabled = true;
        divVrati.appendChild(btnVrati);

        divIznajmljivanje.appendChild(divVrati);

        btnDodaj.onclick = (ev) => {
            this.dodajKorisnika(tbxIme.value, tbxPrezime.value, tbxBroj.value);
            tbxIme.value = "";
            tbxPrezime.value = "";
            tbxBroj.value = "";
        }
        btnIzbrisi.onclick = (ev) => {
            let korisnikRed = host.querySelector(".trSelektovanTabela");
            if (korisnikRed === undefined || korisnikRed === null) {
                window.alert("Selektuj korisnika!");
            } else {
                if (window.confirm("Da li stvarno zelite da izbrisete selektovanog korisnika?")) {
                    this.brisiKorisnika(korisnikRed.value);
                }
            }
        }
        btnIznajljivanja.onclick = (ev) => {
            let korisnikRed = host.querySelector(".trSelektovanTabela");

            if (korisnikRed === undefined || korisnikRed === null) {
                window.alert("Selektujte Korisnika!");
            } else {

                this.trKorisnik = korisnikRed.value;
                this.crtajTabeluIznajmljivanja(korisnikRed.value, tabela);
                tbxBroj.disabled = true;
                tbxIme.disabled = true;
                tbxPrezime.disabled = true;
                btnDodaj.disabled = true;
                btnIzbrisi.disabled = true;
                btnIznajljivanja.disabled = true;

                btnIzbrisiIzn.disabled = false;
                btnProduzi.disabled = false;
                btnVrati.disabled = false;
                tbxDatum.disabled = false;
            }
        }

        btnVrati.onclick = (ev) => {
            this.crtajTabeluKorisika(tabela)
            tbxBroj.disabled = false;
            tbxIme.disabled = false;
            tbxPrezime.disabled = false;
            btnDodaj.disabled = false;
            btnIzbrisi.disabled = false;
            btnIznajljivanja.disabled = false;

            btnIzbrisiIzn.disabled = true;
            btnProduzi.disabled = true;
            btnVrati.disabled = true;
            tbxDatum.disabled = true;
        }
        btnIzbrisiIzn.onclick = (ev) => {
            let izn = host.querySelector(".trSelektovanTabela");
            if (izn === undefined || izn === null) {
                window.alert("Selektuj iznajmljivanje!!");
            } else {
                if (window.confirm("Da li stvarno zelite da izbrisete selektovano iznajmljivanje?")) {
                    this.brisiIznajmljivanje(izn.value);
                }
            }
        }
        btnProduzi.onclick = (ev) => {
            let izn = host.querySelector(".trSelektovanTabela");
            if (izn === undefined || izn === null) {
                window.alert("Selektuj iznajmljivanje!!");
            } else {
                if (window.confirm("Da li stvarno zelite da produzite selektovano iznajmljivanje?")) {
                    this.promeniDatum(izn.value, tbxDatum.value);
                }
            }
        }
    }
}