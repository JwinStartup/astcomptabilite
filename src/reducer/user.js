import {createSlice,createAsyncThunk} from '@reduxjs/toolkit'
import { fetchWrapper } from '../helper/helper'
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
      parent:null,
      personnel:null,
      parents:[],
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
          listeParent:createAsyncThunk(`${name}/listeParent`,
          async ()=>{
             return  await fetchWrapper.get(`${url}/listeParent`)
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
        inscriptionParent();
        inscriptionPersonnel();
        listeParent();
        listePersonnel();
        login();
        deconnecte();
        function inscriptionPersonnel() {
            var { pending, fulfilled, rejected } = extraActions.inscriptionPersonnel;
            builder
              .addCase(pending, (state) => {
                state.error = null;
                state.isLoader = true;
              })
              .addCase(fulfilled, (state, action) => {
               const personnel = action.payload;
                state.personnel=personnel
                state.isLoader = false;
              })
              .addCase(rejected, (state, action) => {
                state.isLoader = false;
                state.error = action.error;
              });
          }
        function inscriptionParent() {
            var { pending, fulfilled, rejected } = extraActions.inscriptionParent;
            builder
              .addCase(pending, (state) => {
                state.error = null;
                state.isLoader = true;
              })
              .addCase(fulfilled, (state, action) => {
               const parent = action.payload;
                state.parent=parent;
                state.isLoader = false;
              })
              .addCase(rejected, (state, action) => {
                state.isLoader = false;
                state.error = action.error;
              });
          }
        function listePersonnel() {
            var { pending, fulfilled, rejected } = extraActions.listePersonnel;
            builder
              .addCase(pending, (state) => {
                state.error = null;
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
                state.error = action.error;
              });
          }
        function listeParent() {
            var { pending, fulfilled, rejected } = extraActions.listeParent;
            builder
              .addCase(pending, (state) => {
                state.error = null;
                state.isLoader = true;
    
              })
              .addCase(fulfilled, (state, action) => {
               const parent = action.payload;
                state.parents=parent;
                state.isLoader = false;

              })
              .addCase(rejected, (state, action) => {
                state.isLoader = false;
                state.error = action.error;

              });
          }
        function deconnecte() {
            var { pending, fulfilled, rejected } = extraActions.deconnecte;
            builder
              .addCase(pending, (state) => {
                state.error = null;
                state.isLoader = true;
              })
              .addCase(fulfilled, (state, action) => {
              //  const user = action.payload;
               state.user = null;
                state.isLoader = false;
              })
              .addCase(rejected, (state, action) => {
                state.isLoader = false;
                state.error = action.error;
              });
          }
        function login() {
            var { pending, fulfilled, rejected } = extraActions.login;
            builder
              .addCase(pending, (state) => {
                state.error = null;
                state.isLoader = true;
              })
              .addCase(fulfilled, (state, action) => {
                const user = action.payload;
                state.user = user;
                state.isLoader = false;
              })
              .addCase(rejected, (state, action) => {
                state.isLoader = false;
                state.error = action.error;
              });
          }
        function inscription() {
            var {pending,fulfilled,rejected}=extraActions.inscription
            builder
            .addCase(pending, (state) => {
              state.error = null;
              state.isLoader = true;
            })
            .addCase(fulfilled, (state, action) => {
              const user = action.payload;
              state.user = user;
              state.isLoader = false;
            })
            .addCase(rejected, (state, action) => {
              state.isLoader = false;
              state.error = action.error;
            });
          }
          
    }

}

