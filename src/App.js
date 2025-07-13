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
import CoursDomicile from './pages/CoursDomicile.js'
import FormulaireCours from './pages/FormCoursDomicile.js'
import Recues from './pages/Recues.js'
import CreerCharge from './pages/creerCharge.js'
import FacturesCommissions from './pages/FacturesCommussions.js'
import FacturesImpayes from './pages/FacturesImpayes.js'
import Charges from './pages/Charges.js'
import Bilan from './pages/Bilan.js'
import BilanCloture from './pages/BilanCloture.js'
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
import FormulaireCreerFacture from './pages/formulaireCreerFacture.js';
import BilanAnneeAcademique from "./pages/BilanAnneeAcademique.js";
function App() {
     history.navigate = useNavigate();
    history.location = useLocation();
  return (
    <div className="App">
      <Routes>
      <Route path='*' element={<Navigate to='/' />} />
         <Route path="/login" element={<Login/>}/>
  
        <Route path="/factures" 
                element={
                            <PrivateRouter>
                                <FacturesImpayes/>
                            </PrivateRouter>
                        }
                />
        <Route path="/cd" 
                element={
                            <PrivateRouter>
                                <CoursDomicile/>
                            </PrivateRouter>
                        }
                />
        <Route path="/cd/nouveau" 
                element={
                            <PrivateRouter>
                                <FormulaireCours/>
                            </PrivateRouter>
                        }
                />
        <Route path="/modifier/enfants/:id" 
                element={
                            <PrivateRouter>
                                <ModifierEnfants/>
                            </PrivateRouter>
                        }
                />
        <Route path="/modifier/personnels/:id" 
                element={
                            <PrivateRouter>
                                <ModifierPersonnels/>
                            </PrivateRouter>
                        }
                />
        <Route path="/modifier/charge/:id" 
                element={
                            <PrivateRouter>
                                <ModifierCharge/>
                            </PrivateRouter>
                        }
                />
        <Route path="/modifier/users/:id" 
                element={
                            <PrivateRouter>
                              <ModifierUsers/>
                            </PrivateRouter>
                        }
                />
        <Route path="/modifier/parents/:id" 
                element={
                            <PrivateRouter>
                                <ModifierParents/>
                            </PrivateRouter>
                        }
                />
        <Route path="/inscription/parents" 
                element={
                            <PrivateRouter>
                              <Parents/>
                            </PrivateRouter>
                        }
                />
        <Route path="/cp/ListeEnfant" 
                element={
                            <PrivateRouter>
                               <ListeEnfant/>
                            </PrivateRouter>
                        }
                />
        <Route path="/cp/ListeParent" 
                element={
                            <PrivateRouter>
                               <ListeParents/>
                            </PrivateRouter>
                        }
                />
        
        <Route path="/factures/commissions" 
                element={
                            <PrivateRouter>
                               <FacturesCommissions/>
                            </PrivateRouter>
                        }
                />
        <Route path="/creerCharge" 
                element={
                            <PrivateRouter>
                                <CreerCharge/>
                            </PrivateRouter>
                        }
                />
        <Route path="/charges" 
                element={
                            <PrivateRouter>
                                <Charges/>
                            </PrivateRouter>
                        }
                />
        <Route path="/bilan" 
                element={
                            <PrivateRouter>
                               <Bilan/>
                            </PrivateRouter>
                        }
                />
        <Route path="/bilan/:anneeAcademique" 
                element={
                            <PrivateRouter>
                               <BilanAnneeAcademique/>
                            </PrivateRouter>
                        }
                />
        <Route path="/bilan/cloture/:id" 
                element={
                            <PrivateRouter>
                               <BilanCloture/>
                            </PrivateRouter>
                        }
                />
        <Route path="/cp" 
                element={
                            <PrivateRouter>
                                <ClientsPersonnels/>
                            </PrivateRouter>
                        }
                />
        <Route path="/factures/recues" 
                element={
                            <PrivateRouter>
                                <Recues/>
                            </PrivateRouter>
                        }
                />
        <Route path="/inscription/enfants" 
                element={
                            <PrivateRouter>
                               <Enfants/>
                            </PrivateRouter>
                        }
                />
        <Route path="/inscription/personnels" 
                element={
                            <PrivateRouter>
                               <Personnels/>
                            </PrivateRouter>
                        }
                />
        <Route path="/profil" 
                element={
                            <PrivateRouter>
                              <ProfilPage/>
                            </PrivateRouter>
                        }
                />
        <Route path="/userAdmin" 
                element={
                            <PrivateRouter>
                             <UserAdmin/>
                            </PrivateRouter>
                        }
                />
        <Route path="/" element={<Home/>}/>
        <Route path="/userAdmin/inscriptionUser" element={<InscriptionUser/>}/>
        <Route path="/factures/nouveau" element={<FormulaireCreerFacture />} />
        <Route path="/factures/:id" element={<Recues />} />
        </Routes>
    </div>
  );
}
  

export default App;
