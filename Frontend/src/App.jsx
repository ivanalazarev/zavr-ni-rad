import 'bootstrap/dist/css/bootstrap.min.css'
import Container from 'react-bootstrap/Container';
import './App.css'
import NavBarEdunova from './components/NavBarEdunova';
import { Route, Routes } from 'react-router-dom';
import { RouteNames } from './constants';
import Pocetna from './pages/Pocetna';
import ArtikliPregled from './pages/artikli/ArtikliPregled';
import ArtikliDodaj from './pages/artikli/ArtikliDodaj';
import ArtikliPromjena from './pages/artikli/ArtikliPromjena';


function App() {

  return (
    <>
    <Container>
      <NavBarEdunova />
      <Routes>
        <Route path={RouteNames.HOME} element={<Pocetna/>} />

        <Route path={RouteNames.ARTIKL_PREGLED} element={<ArtikliPregled/>}/>
        <Route path={RouteNames.ARTIKL_NOVI} element={<ArtikliDodaj/>}/>
        <Route path={RouteNames.ARTIKL_PROMJENA} element={<ArtikliPromjena/>}/>

      </Routes>
      <hr/>
      &copy; Ivana
    </Container>
    
    </>
  )
}

export default App
