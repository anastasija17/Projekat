INSERT INTO Agencija(Lokacija, Naziv) VALUES('Nis', 'Agencija Nis');
INSERT INTO Agencija(Lokacija, Naziv) VALUES('Beograd', 'Agencija Beograd');

INSERT INTO Automobil(Tablice,Proizvodjac,GodinaPrizvodnje,Naziv,PotrosnjaPoKm,SnagaMotora,Boja,CenaPoDanuRSD,AgencijaAutombila) VALUES('NI_123NW','Mercedes',2016,'Benz Gle Coupe',0.02,3000,'crna',2500,1);
INSERT INTO Automobil(Tablice,Proizvodjac,GodinaPrizvodnje,Naziv,PotrosnjaPoKm,SnagaMotora,Boja,CenaPoDanuRSD,AgencijaAutombila) VALUES('NI_345DV','Audi',2005,'Q7 Hybrid',0.03,2800,'bela',1800,1);
INSERT INTO Automobil(Tablice,Proizvodjac,GodinaPrizvodnje,Naziv,PotrosnjaPoKm,SnagaMotora,Boja,CenaPoDanuRSD,AgencijaAutombila) VALUES('NI_676XY','Hyndai',2010,'Azera',0.089,1800,'crvena',1000,1);
INSERT INTO Automobil(Tablice,Proizvodjac,GodinaPrizvodnje,Naziv,PotrosnjaPoKm,SnagaMotora,Boja,CenaPoDanuRSD,AgencijaAutombila) VALUES('NI_459BH','Opel',2003,'Astra',0.03,1600,'siva',800,1);
INSERT INTO Automobil(Tablice,Proizvodjac,GodinaPrizvodnje,Naziv,PotrosnjaPoKm,SnagaMotora,Boja,CenaPoDanuRSD,AgencijaAutombila) VALUES('NI_370CF','Chevrolet',2013,'Malibu',0.09,2300,'siva',1500,1);
INSERT INTO Automobil(Tablice,Proizvodjac,GodinaPrizvodnje,Naziv,PotrosnjaPoKm,SnagaMotora,Boja,CenaPoDanuRSD,AgencijaAutombila) VALUES('BG_892XZ','Toyota',2015,'Yaris',0.021,2000,'plava',2000,2);
INSERT INTO Automobil(Tablice,Proizvodjac,GodinaPrizvodnje,Naziv,PotrosnjaPoKm,SnagaMotora,Boja,CenaPoDanuRSD,AgencijaAutombila) VALUES('BG_345FR','Mercedes',2004,'Benz C-Class',0.04,3400,'bela',1200,2);
INSERT INTO Automobil(Tablice,Proizvodjac,GodinaPrizvodnje,Naziv,PotrosnjaPoKm,SnagaMotora,Boja,CenaPoDanuRSD,AgencijaAutombila) VALUES('BG_900CG','Audi',2015,'A4',0.01,3500,'crna',4000,2);
INSERT INTO Automobil(Tablice,Proizvodjac,GodinaPrizvodnje,Naziv,PotrosnjaPoKm,SnagaMotora,Boja,CenaPoDanuRSD,AgencijaAutombila) VALUES('BG_340BG','Opel',2012,'Corsa',0.04,2000,'oranz',2000,2);
INSERT INTO Automobil(Tablice,Proizvodjac,GodinaPrizvodnje,Naziv,PotrosnjaPoKm,SnagaMotora,Boja,CenaPoDanuRSD,AgencijaAutombila) VALUES('BG_456FR','Honda',2017,'CR-V',0.06,3000,'siva',3000,2);
INSERT INTO Automobil(Tablice,Proizvodjac,GodinaPrizvodnje,Naziv,PotrosnjaPoKm,SnagaMotora,Boja,CenaPoDanuRSD,AgencijaAutombila) VALUES('NI_198SD','Audi',2017,'Q5 Premium',0.04,2800,'plava',7600,1);
INSERT INTO Automobil(Tablice,Proizvodjac,GodinaPrizvodnje,Naziv,PotrosnjaPoKm,SnagaMotora,Boja,CenaPoDanuRSD,AgencijaAutombila) VALUES('BG_266VJ','Toyota',2013,'Corolla',0.09,3000,'crvena',2000,2);
INSERT INTO Automobil(Tablice,Proizvodjac,GodinaPrizvodnje,Naziv,PotrosnjaPoKm,SnagaMotora,Boja,CenaPoDanuRSD,AgencijaAutombila) VALUES('NI_354TR','Audi',2013,'A5',0.08,3000,'zlatna',1600,1);

INSERT INTO Korisnik(Ime,Prezime,Telefon,PripadaAgenciji) VALUES('Filip','Veljkovic','0628195205',1);
INSERT INTO Korisnik(Ime,Prezime,Telefon,PripadaAgenciji) VALUES('Petar','Nikolic','0678958904',1);
INSERT INTO Korisnik(Ime,Prezime,Telefon,PripadaAgenciji) VALUES('Marija','Janjic','0639071592',2);
INSERT INTO Korisnik(Ime,Prezime,Telefon,PripadaAgenciji) VALUES('Helena','Vijic','0631839029',2);
INSERT INTO Korisnik(Ime,Prezime,Telefon,PripadaAgenciji) VALUES('Julija','Mitrovic','0649012387',1);
INSERT INTO Korisnik(Ime,Prezime,Telefon,PripadaAgenciji) VALUES('Jovan','Petrovic','0659105602',1);
INSERT INTO Korisnik(Ime,Prezime,Telefon,PripadaAgenciji) VALUES('Jovana','Jankovic','0639016754',2);

INSERT INTO Iznajmljivanje(KorisnikID,AutomobilID,Datum_Iznajmljivanja,Datum_Vracanja) VALUES(10,17,'2022-03-20 11:00','2022-03-25 12:00');
INSERT INTO Iznajmljivanje(KorisnikID,AutomobilID,Datum_Iznajmljivanja,Datum_Vracanja) VALUES(9,12,'2022-03-24 11:00','2022-03-24 11:00');
INSERT INTO Iznajmljivanje(KorisnikID,AutomobilID,Datum_Iznajmljivanja,Datum_Vracanja) VALUES(1,5,'2022-03-10 21:00','2022-03-30 11:00');
INSERT INTO Iznajmljivanje(KorisnikID,AutomobilID,Datum_Iznajmljivanja,Datum_Vracanja) VALUES(7,6,'2022-03-21 22:00','2022-03-31 14:00');
INSERT INTO Iznajmljivanje(KorisnikID,AutomobilID,Datum_Iznajmljivanja,Datum_Vracanja) VALUES(10,17,'2022-03-28 22:00','2022-03-30 19:30');
INSERT INTO Iznajmljivanje(KorisnikID,AutomobilID,Datum_Iznajmljivanja,Datum_Vracanja) VALUES(12,10, '2022-03-26 10:00','2022-04-30 10:00');
INSERT INTO Iznajmljivanje(KorisnikID,AutomobilID,Datum_Iznajmljivanja,Datum_Vracanja) VALUES(7,7,'2022-03-25 12:00','2022-04-09 12:00');