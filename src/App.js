import React from "react";
import { history } from './helper/helper';
import {
  Routes,
  Route,
  Navigate,
  useNavigate,
  useLocation
} from "react-router-dom";
import Home from './pages/Home.js'
import Recues from './pages/Recues.js'
import CreerCharge from './pages/creerCharge.js'
import Factures from './pages/Factures.js'
import FacturesCommissions from './pages/FacturesCommussions.js'
import FacturesImpayes from './pages/FacturesImpayes.js'
import Charges from './pages/Charges.js'
import Bilan from './pages/Bilan.js'
import ClientsPersonnels from './pages/clientspersonnels.js'
import Parents from './pages/Parents.js'
import UserAdmin from './pages/UserAdmin.js'
import ModifierParents from './pages/modifierParent.js'
import Personnels from './pages/Personnels.js'
import ModifierPersonnels from './pages/modifierPersonnel.js'
import ModifierUsers from './pages/modifierUser.js'
import ModifierCharge from './pages/modifierCharge.js'
import ModifierEnfants from './pages/modifierEnfant.js'
import Enfants from './pages/Enfants.js'
import Login from './pages/Login.js'
import InscriptionUser from "./pages/InscriptionUser.js";
import ProfilPage from "./pages/profilPage.js";
import ListeParents from "./pages/ListeParents.js";
import ListePersonnel from "./pages/ListePersonnels.js";
import ListeEnfant from "./pages/ListeEnfants.js";
import PrivateRouter from "./context/PrivateRouter.js";
function App() {
     history.navigate = useNavigate();
    history.location = useLocation();
  return (
    <div className="App">
      <Routes>
      <Route path='*' element={<Navigate to='/' />} />
         <Route path="/login" element={<Login/>}/>
  
        <Route element={<PrivateRouter/>}>
        <Route path="/factures" element={<FacturesImpayes/>}/>
        <Route path="/cp" element={<ClientsPersonnels/>}/>
        <Route path="/bilan" element={<Bilan/>}/>
        <Route path="/charges" element={<Charges/>}/>
        <Route path="/creerCharge" element={<CreerCharge/>}/>
        <Route path="/factures/commissions" element={<FacturesCommissions/>}/>
        <Route path="/factures/impayes" element={<FacturesImpayes/>}/>
        <Route path="/cp/ListeParent" element={<ListeParents/>}/>
           <Route path="/cp/ListeEnfant" element={<ListeEnfant/>}/>
        <Route path="/cp/ListePersonnel" element={<ListePersonnel/>}/>
        <Route path="/inscription/parents" element={<Parents/>}/>
          <Route path="/modifier/parents/:id" element={<ModifierParents/>}/>
          <Route path="/modifier/charge/:id" element={<ModifierCharge/>}/>
          <Route path="/modifier/users/:id" element={<ModifierUsers/>}/>
          <Route path="/modifier/personnels/:id" element={<ModifierPersonnels/>}/>
          <Route path="/modifier/enfants/:id" element={<ModifierEnfants/>}/>
        <Route path="/inscription/personnels" element={<Personnels/>}/>
           <Route path="/inscription/enfants" element={<Enfants/>}/>
        <Route path="/factures/recues" element={<Recues/>}/>
        <Route path="/profil" element={<ProfilPage/>}/>
        </Route>
        <Route path="/" element={<Home/>}/>
        <Route path="/userAdmin" element={<UserAdmin/>}/>
        <Route path="/userAdmin/inscriptionUser" element={<InscriptionUser/>}/>
        </Routes>
    </div>
  );
}
  

export default App;
