import { Automobil } from "./Automobil.js";

export class PrikazAutomobili {
    constructor(idAgencije) {
        this.idAgencije = idAgencije;
        this.host = null;
        this.listaAutomobila = [];
    }

    dodajAutomobil(tablice, proizvodjac, godina, potrosnja, naziv, snaga, boja, cena) {
        fetch(`https://localhost:5001/Automobil/DodajAutomobil/${tablice}/${proizvodjac}/${godina}/${potrosnja}/${naziv}/${snaga}/${boja}/${cena}/${this.idAgencije}`, { method: "POST" }).then(p => {
            if (!p.ok) {
                window.alert("Automobil nije dodat! Greska!");
            } else {
                this.crtajTabeluAutomobila(document.querySelector(".tblForma"));
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

        });
    }

    crtajTabeluAutomobila(host) {
        while (host.firstChild)
            host.removeChild(host.firstChild);
        this.crtajZaglavljeAutomobila(host);
        fetch("https://localhost:5001/Automobil/PreuzmiAutomobilIzAgencijeSve/" + this.idAgencije).then(p => {
            if (!p.ok) {
                window.alert("Nije moguce pribaviti automobile!");
            } else {
                p.json().then(automobili => {
                    this.listaAutomobila.length = 0;
                    automobili.forEach(a => {
                        this.listaAutomobila.push(new Automobil(a.id, a.tablice, a.proizvodjac, a.godinaProizvodnje, a.naziv, a.potrosnjaPoKm, a.snagaMotora, a.boja, a.cenaPoDanuRSD));
                    });
                    this.crtajRedoveAutommobila(host);
                })
            }
        });
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
        this.crtajTabeluAutomobila(tabela);

        //tablice
        let divTablice = document.createElement("div");
        divTablice.className = "divRed";

        let lblTablice = document.createElement("label");
        lblTablice.className = "lblRed";
        lblTablice.innerHTML = "Tablice";
        divTablice.appendChild(lblTablice);

        let tbxTablice = document.createElement("input");
        tbxTablice.type = "text";
        tbxTablice.className = "tbxRed";
        divTablice.appendChild(tbxTablice);

        divDodavanje.appendChild(divTablice);

        //proizvodac
        let divProizvodjac = document.createElement("div");
        divProizvodjac.className = "divRed";

        let lblProizvodjac = document.createElement("label");
        lblProizvodjac.className = "lblRed";
        lblProizvodjac.innerHTML = "Proizvodjac";
        divProizvodjac.appendChild(lblProizvodjac);

        let tbxProizvodjac = document.createElement("input");
        tbxProizvodjac.type = "text";
        tbxProizvodjac.className = "tbxRed";
        divProizvodjac.appendChild(tbxProizvodjac);

        divDodavanje.appendChild(divProizvodjac);

        //godina
        let divGodina = document.createElement("div");
        divGodina.className = "divRed";

        let lblGodina = document.createElement("label");
        lblGodina.className = "lblRed";
        lblGodina.innerHTML = "Godina";
        divGodina.appendChild(lblGodina);

        let tbxGodina = document.createElement("input");
        tbxGodina.type = "text";
        tbxGodina.className = "tbxRed";
        divGodina.appendChild(tbxGodina);

        divDodavanje.appendChild(divGodina);

        //potrosnja
        let divPotrosnja = document.createElement("div");
        divPotrosnja.className = "divRed";

        let lblPotrosnja = document.createElement("label");
        lblPotrosnja.className = "lblRed";
        lblPotrosnja.innerHTML = "Potrosnja";
        divPotrosnja.appendChild(lblPotrosnja);

        let tbxPotrosnja = document.createElement("input");
        tbxPotrosnja.type = "text";
        tbxPotrosnja.className = "tbxRed";
        divPotrosnja.appendChild(tbxPotrosnja);

        divDodavanje.appendChild(divPotrosnja);

        //naziv
        let divNaziv = document.createElement("div");
        divNaziv.className = "divRed";

        let lblNaziv = document.createElement("label");
        lblNaziv.className = "lblRed";
        lblNaziv.innerHTML = "Naziv";
        divNaziv.appendChild(lblNaziv);

        let tbxNaziv = document.createElement("input");
        tbxNaziv.type = "text";
        tbxNaziv.className = "tbxRed";
        divNaziv.appendChild(tbxNaziv);

        divDodavanje.appendChild(divNaziv);

        //motor
        let divMotor = document.createElement("div");
        divMotor.className = "divRed";

        let lblMotor = document.createElement("label");
        lblMotor.className = "lblRed";
        lblMotor.innerHTML = "Motor";
        divMotor.appendChild(lblMotor);

        let tbxMotor = document.createElement("input");
        tbxMotor.type = "text";
        tbxMotor.className = "tbxRed";
        divMotor.appendChild(tbxMotor);

        divDodavanje.appendChild(divMotor);

        //boja
        let divBoja = document.createElement("div");
        divBoja.className = "divRed";

        let lblBoja = document.createElement("label");
        lblBoja.className = "lblRed";
        lblBoja.innerHTML = "Boja";
        divBoja.appendChild(lblBoja);

        let tbxBoja = document.createElement("input");
        tbxBoja.type = "text";
        tbxBoja.className = "tbxRed";
        divBoja.appendChild(tbxBoja);

        divDodavanje.appendChild(divBoja);

        //cena
        let divCena = document.createElement("div");
        divCena.className = "divRed";

        let lblCena = document.createElement("label");
        lblCena.className = "lblRed";
        lblCena.innerHTML = "Cena po danu u RSD";
        divCena.appendChild(lblCena);

        let tbxCena = document.createElement("input");
        tbxCena.type = "text";
        tbxCena.className = "tbxRed";
        divCena.appendChild(tbxCena);

        divDodavanje.appendChild(divCena);

        //dugme za dodavanje
        let divDodaj = document.createElement("div");
        divDodaj.className = "divRed";

        let btnDodaj = document.createElement("button");
        btnDodaj.innerHTML = "Dodaj Automobil";
        btnDodaj.className = "btnPrikaz";
        divDodaj.appendChild(btnDodaj);

        divDodavanje.appendChild(divDodaj);

        btnDodaj.onclick = (ev) => {
            this.dodajAutomobil(tbxTablice.value, tbxProizvodjac.value, tbxGodina.value, tbxPotrosnja.value, tbxNaziv.value, tbxMotor.value, tbxBoja.value, tbxCena.value);
            tbxTablice.value = "";
            tbxProizvodjac.value = "";
            tbxGodina.value = "";
            tbxPotrosnja.value = "";
            tbxNaziv.value = "";
            tbxBoja.value = "";
            tbxCena.value = "";
        }

    }
}