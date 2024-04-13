import {createSlice,createAsyncThunk} from '@reduxjs/toolkit'
import { fetchWrapper,history } from '../helper/helper'
const url = "https://astcomptabiliteserver.onrender.com/api/users"

const name = "users";
const initialState = createInitialState();
const reducers = createReducers();
const extraActions = createExtraActions();
const extraReducers = createExtraReducers();
const slice = createSlice({ name, initialState, reducers, extraReducers });

export const userActions = { ...slice.actions, ...extraActions };
export const userReducer = slice.reducer;

function createInitialState() {
    return {
      user: null,
      auth: JSON.parse(localStorage.getItem('user')),
      users:[] ,
      parent:null,
      enfant:null,
      personnel:null,
      message:"",
      errors:null,
      parents:[],
      enfants:[],
      personnels:[],
      isloader:false,
    };
  };
  function createReducers() {
    return {
      logout,
    };
    
    function logout(state) {
        state.user = null;
        state.userToken = null;
        localStorage.removeItem('user')
    }
  }

  
    function createExtraActions() {
        return {
        inscription:createAsyncThunk(`${name}/inscription`,
        async (body)=>{
            console.log(body)
            return await fetchWrapper.post(`${url}/inscription`,body).then((r)=>console.log(r))
          }
          ),
          login:createAsyncThunk(`${name}/connexion`,
          async (body)=>{
              console.log(body)
             return  await fetchWrapper.post(`${url}/connexion`,body)
            }
            ),
          deconnecte:createAsyncThunk(`${name}/deconnexion`,
          async ()=>{
             return  await fetchWrapper.get(`${url}/deconnexion`).then((r)=>console.log(r))
            }
            ),
          inscriptionParent:createAsyncThunk(`${name}/inscriptionParent`,
          async (body)=>{
             return  await fetchWrapper.post(`${url}/inscriptionParent`,body).then((r)=>console.log(r))
            }
            ),
              inscriptionPersonnel:createAsyncThunk(`${name}/inscriptionPersonnel`,
          async (body)=>{
             return  await fetchWrapper.post(`${url}/inscriptionPersonnel`,body).then((r)=>console.log(r))
            }
            ),
          modifierPersonnel:createAsyncThunk(`${name}/modifierPersonnel`,
          async (body)=>{
             return  await fetchWrapper.post(`${url}/modifierPersonnel`,body).then((r)=>console.log(r))
            }
            ),
          modifierParent:createAsyncThunk(`${name}/modifierParent`,
          async (body)=>{
             return  await fetchWrapper.post(`${url}/modifierParent`,body).then((r)=>console.log(r))
            }
            ),
         inscriptionEnfant:createAsyncThunk(`${name}/inscriptionEnfant`,
          async (body)=>{
             return  await fetchWrapper.post(`${url}/inscriptionEnfant`,body).then((r)=>console.log(r))
            }
            ),
            modifierEnfant:createAsyncThunk(`${name}/modifierEnfant`,
          async (body)=>{
             return  await fetchWrapper.post(`${url}/modifierEnfant`,body).then((r)=>console.log(r))
            }
            ),
            modifier:createAsyncThunk(`${name}/modifier`,
          async (body)=>{
             return  await fetchWrapper.post(`${url}/modifier`,body).then((r)=>console.log(r))
            }
            ),
            listeParent:createAsyncThunk(`${name}/listeParent`,
          async ()=>{
             return  await fetchWrapper.get(`${url}/listeParent`)
            }
            ),
             listeEnfant:createAsyncThunk(`${name}/listeEnfant`,
          async ()=>{
             return  await fetchWrapper.get(`${url}/listeEnfant`)
            }
            ),
            supprimerEnfant:createAsyncThunk(`${name}/supprimerEnfant`,
          async (body)=>{
              console.log(body)
             return  await fetchWrapper.get(`${url}/supprimerEnfant/${body}`)
            }
            ),
            voirEnfant:createAsyncThunk(`${name}/voirEnfant`,
          async (body)=>{
             return  await fetchWrapper.get(`${url}/voirEnfant/${body}`)
            }
            ),
            voirUser:createAsyncThunk(`${name}/voirUser`,
          async (body)=>{
             return  await fetchWrapper.get(`${url}/voir/${body}`)
            }
            ),
            voirParent:createAsyncThunk(`${name}/voirParent`,
          async (body)=>{
             return  await fetchWrapper.get(`${url}/voirParent/${body}`)
            }
            ),
            liste:createAsyncThunk(`${name}/liste`,
          async (body)=>{
             return  await fetchWrapper.get(`${url}/liste`)
            }
            ),
            voirPersonnel:createAsyncThunk(`${name}/voirPersonnel`,
          async (body)=>{
             return  await fetchWrapper.get(`${url}/voirPersonnel/${body}`)
            }
            ),
            supprimerParent:createAsyncThunk(`${name}/supprimerParent`,
          async (body)=>{
             return  await fetchWrapper.get(`${url}/supprimerParent/${body}`)
            }
            ),
            supprimerPersonnel:createAsyncThunk(`${name}/supprimerPersonnel`,
          async (body)=>{
             return  await fetchWrapper.get(`${url}/supprimerPersonnel/${body}`)
            }
            ),
            supprimer:createAsyncThunk(`${name}/supprimer`,
          async (body)=>{
              console.log(body)
             return  await fetchWrapper.get(`${url}/supprimer/${body}`)
            }
            ),
          listePersonnel:createAsyncThunk(`${name}/listePersonnel`,
          async ()=>{
             return  await fetchWrapper.get(`${url}/listePersonnel`)
            }
            )
    }
  }


  
function createExtraReducers() {
    return (builder) => {
        inscription();
        supprimer();
        modifier();
        liste();
        inscriptionParent();
        inscriptionPersonnel();
        listeParent();
        inscriptionEnfant();
        supprimerEnfant();
        voirEnfant();
        voirUser();
        voirParent();
        voirPersonnel();
        modifierEnfant();
        supprimerParent();
        modifierParent();
        supprimerPersonnel();
        modifierPersonnel();
        listeEnfant();
        listePersonnel();
        login();
        deconnecte();
        function inscriptionPersonnel() {
            var { pending, fulfilled, rejected } = extraActions.inscriptionPersonnel;
            builder
              .addCase(pending, (state) => {
                state.errors = null;
                state.isLoader = true;
              })
              .addCase(fulfilled, (state, action) => {
               const personnel = action.payload;
                state.personnel=personnel
                state.isLoader = false;
              })
              .addCase(rejected, (state, action) => {
                state.isLoader = false;
                state.errors = action.errors;
              });
          }
        function modifierPersonnel() {
            var { pending, fulfilled, rejected } = extraActions.modifierPersonnel;
            builder
              .addCase(pending, (state) => {
                state.errors = null;
                state.isLoader = true;
              })
              .addCase(fulfilled, (state, action) => {
               const personnel = action.payload;
                state.personnel=personnel
                state.isLoader = false;
              })
              .addCase(rejected, (state, action) => {
                state.isLoader = false;
                state.errors = action.errors;
              });
          }
        function supprimerPersonnel() {
            var { pending, fulfilled, rejected } = extraActions.supprimerPersonnel;
            builder
              .addCase(pending, (state) => {
                state.errors = null;
                state.isLoader = true;
              })
              .addCase(fulfilled, (state, action) => {
               const message = action.payload;
                state.message=message;
                state.isLoader = false;
              })
              .addCase(rejected, (state, action) => {
                state.isLoader = false;
                state.errors = action.errors;
              });
          }
        function inscriptionParent() {
            var { pending, fulfilled, rejected } = extraActions.inscriptionParent;
            builder
              .addCase(pending, (state) => {
                state.errors = null;
                state.isLoader = true;
              })
              .addCase(fulfilled, (state, action) => {
               const parent = action.payload;
                state.parent=parent;
                state.isLoader = false;
              })
              .addCase(rejected, (state, action) => {
                state.isLoader = false;
                state.errors = action.errors;
              });
          }
        function supprimerParent() {
            var { pending, fulfilled, rejected } = extraActions.supprimerParent;
            builder
              .addCase(pending, (state) => {
                state.errors = null;
                state.isLoader = true;
              })
              .addCase(fulfilled, (state, action) => {
               const message = action.payload;
                state.message=message;
                state.isLoader = false;
              })
              .addCase(rejected, (state, action) => {
                state.isLoader = false;
                state.errors = action.errors;
              });
          }
        function modifierParent() {
            var { pending, fulfilled, rejected } = extraActions.modifierParent;
            builder
              .addCase(pending, (state) => {
                state.errors = null;
                state.isLoader = true;
              })
              .addCase(fulfilled, (state, action) => {
               const parent = action.payload;
                state.parent=parent;
                state.isLoader = false;
              })
              .addCase(rejected, (state, action) => {
                state.isLoader = false;
                state.errors = action.errors;
              });
          }
         function modifierEnfant() {
            var { pending, fulfilled, rejected } = extraActions.modifierEnfant;
            builder
              .addCase(pending, (state) => {
                state.errors = null;
                state.isLoader = true;
              })
              .addCase(fulfilled, (state, action) => {
               const enfant = action.payload;
                state.enfant=enfant;
                state.isLoader = false;
              })
              .addCase(rejected, (state, action) => {
                state.isLoader = false;
                state.errors = action.errors;
              });
          }
         function supprimerEnfant() {
            var { pending, fulfilled, rejected } = extraActions.supprimerEnfant;
            builder
              .addCase(pending, (state) => {
                state.errors = null;
                state.isLoader = true;
              })
              .addCase(fulfilled, (state, action) => {
               const message = action.payload;
                state.message=message;
                state.isLoader = false;
              })
              .addCase(rejected, (state, action) => {
                state.isLoader = false;
                state.errors = action.errors;
              });
          }
         function inscriptionEnfant() {
            var { pending, fulfilled, rejected } = extraActions.inscriptionEnfant;
            builder
              .addCase(pending, (state) => {
                state.errors = null;
                state.isLoader = true;
              })
              .addCase(fulfilled, (state, action) => {
               const enfant = action.payload;
                state.enfant=enfant;
                state.isLoader = false;
              })
              .addCase(rejected, (state, action) => {
                state.isLoader = false;
                state.errors = action.errors;
              });
          }
        function listePersonnel() {
            var { pending, fulfilled, rejected } = extraActions.listePersonnel;
            builder
              .addCase(pending, (state) => {
                state.errors = null;
                state.isLoader = true;
              })
              .addCase(fulfilled, (state, action) => {
               const personnel = action.payload;
               console.log(personnel)
                state.personnels=personnel;
                state.isLoader = false;
              })
              .addCase(rejected, (state, action) => {
                state.isLoader = false;
                state.errors = action.errors;
              });
          }
         function listeEnfant() {
            var { pending, fulfilled, rejected } = extraActions.listeEnfant;
            builder
              .addCase(pending, (state) => {
                state.errors = null;
                state.isLoader = true;
    
              })
              .addCase(fulfilled, (state, action) => {
               const enfant = action.payload;
                state.enfants=enfant;
                state.isLoader = false;

              })
              .addCase(rejected, (state, action) => {
                state.isLoader = false;
                state.errors = action.errors;

              });
          }
        function listeParent() {
            var { pending, fulfilled, rejected } = extraActions.listeParent;
            builder
              .addCase(pending, (state) => {
                state.errors = null;
                state.isLoader = true;
    
              })
              .addCase(fulfilled, (state, action) => {
               const parent = action.payload;
                state.parents=parent;
                state.isLoader = false;

              })
              .addCase(rejected, (state, action) => {
                state.isLoader = false;
                state.errors = action.errors;

              });
          }
        function deconnecte() {
            var { pending, fulfilled, rejected } = extraActions.deconnecte;
            builder
              .addCase(pending, (state) => {
                state.errors = null;
                state.isLoader = true;
              })
              .addCase(fulfilled, (state, action) => {
              //  const user = action.payload;
               state.user = null;
                state.isLoader = false;
              })
              .addCase(rejected, (state, action) => {
                state.isLoader = false;
                state.errors = action.errors;
              });
          }
        function login() {
            var { pending, fulfilled, rejected } = extraActions.login;
            builder
              .addCase(pending, (state) => {
                state.errors = null;
                state.isLoader = true;
              })
              .addCase(fulfilled, (state, action) => {
                const user = action.payload;
                state.user = user;
                  localStorage.setItem('user', JSON.stringify(user));
                const { from } = history.location.state || { from: { pathname: '/' } };
                history.navigate(from);
                state.isLoader = false;
              })
              .addCase(rejected, (state, action) => {
                state.isLoader = false;
                  console.log("error:",action.errors,"payload:",action.payload)
                state.errors = action.errors;
              });
          }
        function inscription() {
            var {pending,fulfilled,rejected}=extraActions.inscription
            builder
            .addCase(pending, (state) => {
              state.errors = null;
              state.isLoader = true;
            })
            .addCase(fulfilled, (state, action) => {
              const user = action.payload;
              state.user = user;
              state.isLoader = false;
            })
            .addCase(rejected, (state, action) => {
              state.isLoader = false;
              state.errors = action.errors;
            });
          }
      
        function modifier() {
            var {pending,fulfilled,rejected}=extraActions.modifier
            builder
            .addCase(pending, (state) => {
              state.errors = null;
              state.isLoader = true;
            })
            .addCase(fulfilled, (state, action) => {
              const user = action.payload;
              state.user = user;
              state.isLoader = false;
            })
            .addCase(rejected, (state, action) => {
              state.isLoader = false;
              state.errors = action.errors;
            });
          }
        function supprimer() {
            var {pending,fulfilled,rejected}=extraActions.supprimer
            builder
            .addCase(pending, (state) => {
              state.errors = null;
              state.isLoader = true;
            })
            .addCase(fulfilled, (state, action) => {
              const message = action.payload;
              state.message = message;
              state.isLoader = false;
            })
            .addCase(rejected, (state, action) => {
              state.isLoader = false;
              state.errors = action.errors;
            });
          }
        function liste() {
            var {pending,fulfilled,rejected}=extraActions.liste
            builder
            .addCase(pending, (state) => {
              state.errors = null;
              state.isLoader = true;
            })
            .addCase(fulfilled, (state, action) => {
              const users = action.payload;
              state.users = users;
              state.isLoader = false;
            })
            .addCase(rejected, (state, action) => {
              state.isLoader = false;
              state.errors = action.errors;
            });
          }
        function voirEnfant() {
            var {pending,fulfilled,rejected}=extraActions.voirEnfant
            builder
            .addCase(pending, (state) => {
              state.errors = null;
              state.isLoader = true;
            })
            .addCase(fulfilled, (state, action) => {
              const enfant = action.payload;
              state.enfant = enfant;
              state.isLoader = false;
            })
            .addCase(rejected, (state, action) => {
              state.isLoader = false;
              state.errors = action.errors;
            });
          }
        function voirPersonnel() {
            var {pending,fulfilled,rejected}=extraActions.voirPersonnel
            builder
            .addCase(pending, (state) => {
              state.errors = null;
              state.isLoader = true;
            })
            .addCase(fulfilled, (state, action) => {
              const personnel = action.payload;
              state.personnel = personnel;
              state.isLoader = false;
            })
            .addCase(rejected, (state, action) => {
              state.isLoader = false;
              state.errors = action.errors;
            });
          }
        function voirUser() {
            var {pending,fulfilled,rejected}=extraActions.voirUser
            builder
            .addCase(pending, (state) => {
              state.errors = null;
              state.isLoader = true;
            })
            .addCase(fulfilled, (state, action) => {
              const user = action.payload;
              state.user = user;
              state.isLoader = false;
            })
            .addCase(rejected, (state, action) => {
              state.isLoader = false;
              state.errors = action.errors;
            });
          }
        function voirParent() {
            var {pending,fulfilled,rejected}=extraActions.voirParent
            builder
            .addCase(pending, (state) => {
              state.errors = null;
              state.isLoader = true;
            })
            .addCase(fulfilled, (state, action) => {
              const parent = action.payload;
              state.parent = parent;
              state.isLoader = false;
            })
            .addCase(rejected, (state, action) => {
              state.isLoader = false;
              state.errors = action.errors;
            });
          }
          
    }

}

