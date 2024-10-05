import ArtiklService from "../../services/ArtiklService"
import { Button, Row, Col, Form } from "react-bootstrap";
import moment from "moment";
import { Link, useNavigate, useParams } from "react-router-dom";
import { RouteNames } from "../../constants";
import { useEffect, useState } from "react";


export default function ArtikliPromjena(){

    const [artikl,setArtikl] = useState({})
    const navigate = useNavigate()
    const routeParams = useParams()

    async function dohvatiartikl(){
        const odgovor = await ArtiklService.getBySifra(routeParams.idArtikl);
        if(odgovor.greska){
            alert(odgovor.poruka)
            return
        }
        //debugger; // ovo radi u Chrome inspect (ali i ostali preglednici)
        let s = odgovor.poruka
        setArtikl(s)
    } 

    useEffect(()=>{
        dohvatiartikl();
     },[])

     async function promjena(artikl) {
        //console.log(artikl)
        //console.log(JSON.stringify(artikl))
        const odgovor = await ArtiklService.promjena(routeParams.idArtikl,artikl)
        if(odgovor.greska){
            alert(odgovor.poruka)
            return;
        }
        navigate(RouteNames.ARTIKL_PREGLED)
    }

    function obradiSubmit(e){ // e je event
        e.preventDefault(); // nemoj odraditi zahtjev na server
        let podaci = new FormData(e.target)
        //console.log(podaci.get('naziv'))
        promjena({
            naziv: podaci.get('naziv'),
            vrsta: podaci.get('vrsta'),
            sifra: parseInt(podaci.get('sifra'))
        })
    }

    return(
        <>
        Promjena artikla
        <Form onSubmit={obradiSubmit}>

        <Form.Group controlId="naziv">
                <Form.Label>Naziv</Form.Label>
                <Form.Control type="text" name="naziv" required defaultValue={artikl.naziv}/>
            </Form.Group>

            <Form.Group controlId="vrsta">
                <Form.Label>Vrsta</Form.Label>
                <Form.Control type="text" name="vrsta" required defaultValue={artikl.vrsta}/>
            </Form.Group>

            <Form.Group controlId="sifra">
                <Form.Label>Šifra artikla</Form.Label>
                <Form.Control type="number" min={10} max={500} name="sifra" required defaultValue={artikl.sifra}/>
            </Form.Group>

        <Row className="akcije">
            <Col xs={6} sm={12} md={3} lg={6} xl={6} xxl={6}>
            <Link to={RouteNames.ARTIKL_PREGLED} 
            className="btn btn-danger siroko">Odustani</Link>
            </Col>
            <Col xs={6} sm={12} md={9} lg={6} xl={6} xxl={6}>
            <Button variant="success"
            type="submit"
            className="siroko">Promjeni artikl</Button>
            </Col>
        </Row>
        </Form>
        </>
    )
}