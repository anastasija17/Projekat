# Projekat
## Web projekat Renta Car agencija
### O projektu:
Aplikacija koja se koristi za evidenciju u agencijama za iznajmljivanje automobila.
U gornjem delu aplikacije postoji mogućnost selekcije zeljene agencije.
Sledeća je selekcija prikaza. Postoje 3 prikaza:

>1.**Korisnici**-U sdredisnjem delu ekrana se prikazuje tabela sa korisnicima u agenciji.Tabela sadrzi osnovne podatke o korisnicima.
>Klikom na nekog od korisnika u tabeli i klikom na dugme Prikaz Iznajmljivanja prikazace se iznajmljivanja za selektovanog korisnika.
>Unosom  trazenih podataka u data polja i klikom na dugme Dodaj korisnika dodaje se novi korisnik u predhodno selektovanu agenciju.
>Sa leve strane se nalazi dugme Izbrisi korisnika koje brise selektovanog korisnika iz agencije.Odabirom datuma u levo delu prikaza 
>i klikom na dugme Produzi iznajmljivanje,moguce je produziti tekuce iznajmljivanje selektovanog korisnika.

![korisnici](Client/Slike/korisnici.png)

>2.**Automobili**-U desnom delu ekrana prikazuje se tabela sa korisnicima koji su registrovani u predhodno selektovanoj agenciji.
>Unosom  validnh podataka i klikom na dugme Dodaj Automobil moguce je dodati novi automobil u predhodno selektovanu agenciju.

![korisnici](Client/Slike/automobili.png)

>3.**Iznajmljivanja**-Sa leve strane prikaza na ekranu se prikazuju dva polja sa pruzanjem mogucnosti unosa datuma i vremena.
>Po unosu datuma i vremena u data polja i klikom na dugme Pretrazi,prikazuju se u tabeli u desnom delu ekrana svi slobodni automobili u agenciji 
>za odabrani period.U sredisnjem delu ekrana prikazuju se korisnici za selektovanu agenciju. Selektovanjem jednog od korisnika iz tabele i selektovanjem
>jednog od automobila iz tabele automobila uz klik na dugme Iznajmi,iznajmljuje se selektovani automobil za selektovanog korisnika 
>u odabranom vremenskom periodu.
  
![korisnici](Client/Slike/iznajmljivanja.png)

### Problemi:
1. Problem sa pribavljanjem informacija sa servera pri pokretanju prvi put;
2. Textbox elementi nemaju ogranicenja u pogledu unosa brojeva ili sllova ali se takvi podaci pri proverama odbacuju kao nevalidni


