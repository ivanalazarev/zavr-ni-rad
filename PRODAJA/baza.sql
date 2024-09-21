
-- Zamjeniti db_a98acf_edunovawp5 s imenom svoje baze

SELECT name, collation_name FROM sys.databases;
GO
ALTER DATABASE db_aad67b_prodaja SET SINGLE_USER WITH
ROLLBACK IMMEDIATE;
GO
ALTER DATABASE db_aad67b_prodaja COLLATE Croatian_CI_AS;
GO
ALTER DATABASE db_aad67b_prodaja SET MULTI_USER;
GO
SELECT name, db_aad67b_prodaja FROM sys.databases;
GO


create table Restorani(
idrestoran int not null primary key identity(1,1),
sifra numeric not null,
ime varchar(50) not null,
adresa varchar(150) not null,
oib char(11) not null, 
vrsta varchar(50) null
);

create table Artikli(
idartikl int not null primary key identity(1,1),
sifra int not null,
naziv varchar(100) not null,
vrsta varchar(50) null
);

create table Racuni(
idracun int not null primary key identity(1,1),
idrestoran int not null,
datum datetime not null,
brojracuna varchar(50) not null
);

create table StavkeRacuna(
idstavkeracuna int not null primary key identity(1,1),
idracun int not null,
idartikl int not null,
cijena decimal(18,2) null,
kolicina decimal(18,4) null
);


alter table Racuni add foreign key (idrestoran) references Restorani(idrestoran);
alter table StavkeRacuna add foreign key (idracun) references Racuni(idracun);
alter table StavkeRacuna add foreign key (idartikl) references Artikli(idartikl);


insert into restorani(sifra,ime,adresa,oib,vrsta)values
('1','Kod Ivane','Trg Tomislava 22,31000 Osijek','12345678910','Bistro')


insert into artikli(sifra,naziv,vrsta)values
('1','Teletina ispod peke','jela po narudžbi')
insert into artikli(sifra,naziv,vrsta)values
('2','Janjetina iz krušne peæi','jela iz krušne piæe')
insert into artikli(sifra,naziv,vrsta)values
('3','Šaran na rašljama','riblji specijaliteti')

insert into racuni(idrestoran,datum,brojracuna)values
(1,'20240616','1/01/1')
insert into racuni(idrestoran,datum,brojracuna)values
(1,'20240616','2/01/1')


insert into stavkeracuna(idracun,idartikl,cijena,kolicina)values
(1,1,17.55,3.00)
insert into stavkeracuna(idracun,idartikl,cijena,kolicina)values
(1,2,19.99,2.00)
