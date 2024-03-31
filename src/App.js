import React from "react";
import {
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from './pages/Home.js'
import Recues from './pages/Recues.js'
import Factures from './pages/Factures.js'
import FacturesCommissions from './pages/FacturesCommussions.js'
import FacturesImpayes from './pages/FacturesImpayes.js'
import Charges from './pages/Charges.js'
import Bilan from './pages/Bilan.js'
import ClientsPersonnels from './pages/clientspersonnels.js'
import Parents from './pages/Parents.js'
import Personnels from './pages/Personnels.js'
import Enfants from './pages/Enfants.js'
import Login from './pages/Login.js'
import InscriptionUser from "./pages/InscriptionUser.js";
import ListeParents from "./pages/ListeParents.js";
import ListePersonnel from "./pages/ListePersonnels.js";
import ListeEnfant from "./pages/ListeEnfants.js";
import PrivateRouter from "./context/PrivateRouter.js";
function App() {
  return (
    <div className="App">
      <Routes>
      <Route path='*' element={<Navigate to='/' />} />
      
         <Route path="/login" element={<Login/>}/>
  {/*<Route element={<PrivateRouter/>}></Route>*/}
        
        <Route path="/cp" element={<ClientsPersonnels/>}/>
        <Route path="/factures" element={<Factures/>}/>
        <Route path="/bilan" element={<Bilan/>}/>
        <Route path="/charges" element={<Charges/>}/>
        <Route path="/factures/commissions" element={<FacturesCommissions/>}/>
        <Route path="/factures/impayes" element={<FacturesImpayes/>}/>
        <Route path="/cp/ListeParent" element={<ListeParents/>}/>
           <Route path="/cp/ListeEnfant" element={<ListeEnfant/>}/>
        <Route path="/cp/ListePersonnel" element={<ListePersonnel/>}/>
        <Route path="/inscription/parents" element={<Parents/>}/>
        <Route path="/inscription/personnels" element={<Personnels/>}/>
           <Route path="/inscription/enfants" element={<Enfants/>}/>
        <Route path="/factures/recues" element={<Recues/>}/>
        
        <Route path="/" element={<Home/>}/>
        <Route path="/inscriptionUser" element={<InscriptionUser/>}/>
        </Routes>
    </div>
  );
}
  

export default App;
