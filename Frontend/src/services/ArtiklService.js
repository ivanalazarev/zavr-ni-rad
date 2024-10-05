import { HttpService } from "./HttpService";



async function get(){
    return await HttpService.get('/Artikl')
    .then((odgovor)=>{
        //console.log(odgovor.data)
        //console.table(odgovor.data)
        return {greska: false, poruka: odgovor.data}
    })
    .catch((e)=>{
        //console.log(e)
        return {greska: true, poruka: 'Problem kod dohvaćanja Artiklova'}   
    })
}

async function brisanje(sifra){
    return await HttpService.delete('/Artikl/' + sifra)
    .then(()=>{
        return {greska: false, poruka: 'Obrisano'}
    })
    .catch(()=>{
        return {greska: true, poruka: 'Problem kod brisanja Artikla'}   
    })
}

async function dodaj(Artikl){
    return await HttpService.post('/Artikl',Artikl)
    .then(()=>{
        return {greska: false, poruka: 'Dodano'}
    })
    .catch(()=>{
        return {greska: true, poruka: 'Problem kod dodavanja Artikla'}   
    })
}

async function promjena(idArtikl,Artikl){
    return await HttpService.put('/Artikl/' + idArtikl,Artikl)
    .then(()=>{
        return {greska: false, poruka: 'Dodano'}
    })
    .catch(()=>{
        return {greska: true, poruka: 'Problem kod dodavanja Artikla'}   
    })
}

async function getBySifra(idArtikl){
    return await HttpService.get('/Artikl/'+idArtikl)
    .then((odgovor)=>{
        return {greska: false, poruka: odgovor.data}
    })
    .catch((e)=>{
        return {greska: true, poruka: 'Problem kod dohvaćanja Artikla s šifrom '+sifra}   
    })
}


export default {
    get,
    brisanje,
    dodaj,
    getBySifra,
    promjena
}
