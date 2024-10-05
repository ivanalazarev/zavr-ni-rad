import { useEffect, useState } from "react"
import ArtiklService from "../../services/ArtiklService"
import { Button, Table } from "react-bootstrap";
import { NumericFormat } from "react-number-format";
import moment from "moment";
import { GrValidate } from "react-icons/gr";
import { Link, useNavigate } from "react-router-dom";
import { RouteNames } from "../../constants";


export default function ArtikliPregled(){

    const navigate = useNavigate()

    const[artikli, setArtikli] = useState();

    async function dohvatiArtikle(){
        const odgovor = await ArtiklService.get();
        if(odgovor.greska){
            alert(odgovor.poruka)
            return
        }
        //debugger; // ovo radi u Chrome inspect (ali i ostali preglednici)
        setArtikli(odgovor.poruka)
    } 

    // Ovaj hook (kuka) se izvodi dolaskom na stranicu artikli
    useEffect(()=>{
        dohvatiArtikle();
    },[])

 

    function obrisi(sifra){
        if(!confirm('Sigurno obrisati')){
            return;
        }
        brisanjeArtikla(sifra)
    }

    async function brisanjeArtikla(sifra) {
        
        const odgovor = await ArtiklService.brisanje(sifra);
        if(odgovor.greska){
            alert(odgovor.poruka)
            return
        }
        dohvatiArtikle();
    }


    return(
        <>
        <Link to={RouteNames.ARTIKL_NOVI}
        className="btn btn-success siroko">Dodaj novi artikl</Link>
        <Table striped bordered hover responsive>
            <thead>
                <tr>
                    <th>Naziv</th>
                    <th>Vrsta</th>
                    <th>ID artikla</th>
                    <th>Akcija</th>
                </tr>
            </thead>
            <tbody>
                {artikli && artikli.map((artikl,index)=>(
                    <tr key={index}>
                        <td>
                            {artikl.naziv}
                        </td>
                        <td>
                            {artikl.vrsta}
                        </td>
                        <td>
                            {artikl.idArtikl}
                        </td>
                       
                        <td>
                            <Button
                            variant="danger"
                            onClick={()=>obrisi(artikl.idArtikl)}
                            >
                                Obriši
                            </Button>
                            &nbsp;&nbsp;&nbsp;
                            <Button
                            onClick={()=>navigate(`/artikli/${artikl.idArtikl}`)}
                            >
                                Promjena
                            </Button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </Table>
        </>
    )
}