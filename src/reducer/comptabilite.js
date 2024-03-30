import {createSlice,createAsyncThunk} from '@reduxjs/toolkit'
import { fetchWrapper } from '../helper/helper'
const url = "https://astcomptabiliteserver.onrender.com/api/comptabilites"

const name = "comptabilites";
const initialState = createInitialState();
const reducers = createReducers();
const extraActions = createExtraActions();
const extraReducers = createExtraReducers();
const slice = createSlice({ name, initialState, reducers, extraReducers });

export const comptabiliteActions = { ...slice.actions, ...extraActions };
export const comptabiliteReducer = slice.reducer;

function createInitialState() {
    return {
      facture: null,
      resultat:0,
      factures:[],
      bilan: null,
      bilans:[],
      charge: null,
      charges:[],
      recue: null,
      recues:[],
      commissions:[],
    };
  };
  function createReducers() {
    return {
      logout,
    };
    
    function logout(state) {
      //  state.comptabilite = null;
       // state.comptabiliteToken = null;
    }
  }

  
    function createExtraActions() {
        return {
        creerFacture:createAsyncThunk(`${name}/creerFacture`,
        async (body)=>{
            console.log(body)
            return await fetchWrapper.post(`${url}/creerFacture`,body)
          }
          ),
        creerCharge:createAsyncThunk(`${name}/creerCharge`,
        async (body)=>{
            console.log(body)
            return await fetchWrapper.post(`${url}/creerCharge`,body)
          }
          ),
          voirByIdBilan:createAsyncThunk(`${name}/voirByIdBilan`,
        async (body)=>{
            console.log(body,`${url}/voirByIdBilan/${body}`)
            return await fetchWrapper.get(`${url}/voirByIdBilan/${body}`)
          }
          ),
            partager:createAsyncThunk(`${name}/partager`,
        async (body)=>{
            console.log(body,`${url}/partager/${body}`)
            return await fetchWrapper.post(`${url}/partager`,body)
          }
          ),
        listeFacture:createAsyncThunk(`${name}/listeFacture`,
        async ()=>{
            return await fetchWrapper.get(`${url}/listeFacture`)
          }
          ),
        listeCharge:createAsyncThunk(`${name}/listeCharge`,
        async ()=>{
            return await fetchWrapper.get(`${url}/listeCharge`)
          }
          ),
        listeBilan:createAsyncThunk(`${name}/listeBilan`,
        async ()=>{
            return await fetchWrapper.get(`${url}/listeBilan`)
          }
          ),
        creerRecue:createAsyncThunk(`${name}/creerRecue`,
        async (body)=>{
            console.log(body)
            return await fetchWrapper.post(`${url}/creerRecue`,body)
          }
          ),
        listeRecue:createAsyncThunk(`${name}/listeRecue`,
        async ()=>{
            return await fetchWrapper.get(`${url}/listeRecue`)
          }
          ),
        listeCommission:createAsyncThunk(`${name}/listeComission`,
        async ()=>{
            return await fetchWrapper.get(`${url}/listeComission`)
          }
          ),
        payerFacture:createAsyncThunk(`${name}/payerFacture`,
        async (body)=>{
            console.log(body)
            return await fetchWrapper.post(`${url}/payerFacture`,body)
          }
          ),
         
  }
  }

function createExtraReducers() {
    return (builder) => {
        creerFacture();
        partager();
        creerRecue();
        creerCharge();
        payerFacture();
        listeFacture();
        listeRecue();
        listeCharge();
        listeBilan();
        voirByIdBilan();
        listeCommission();
        function creerCharge() {
            var { pending, fulfilled, rejected } = extraActions.creerCharge;
            builder
              .addCase(pending, (state) => {
                state.error = null;
                state.isLoader = true;
              })
              .addCase(fulfilled, (state, action) => {
               const charge = action.payload;
                state.charge=charge
                state.isLoader = false;
              })
              .addCase(rejected, (state, action) => {
                state.isLoader = false;
                state.error = action.error;
              });
          }
        function creerFacture() {
            var { pending, fulfilled, rejected } = extraActions.creerFacture;
            builder
              .addCase(pending, (state) => {
                state.error = null;
                state.isLoader = true;
              })
              .addCase(fulfilled, (state, action) => {
               const facture = action.payload;
                state.facture=facture
                state.isLoader = false;
              })
              .addCase(rejected, (state, action) => {
                state.isLoader = false;
                state.error = action.error;
              });
          }
        function voirByIdBilan() {
            var { pending, fulfilled, rejected } = extraActions.voirByIdBilan;
            builder
              .addCase(pending, (state) => {
                state.error = null;
                state.isLoader = true;
              })
              .addCase(fulfilled, (state, action) => {
               const bilan = action.payload;
               console.log('le bilan:',bilan);
                state.bilan=bilan;
                state.resultat=bilan.recette-bilan.charge
                state.isLoader = false;
              })
              .addCase(rejected, (state, action) => {
                state.isLoader = false;
                state.error = action.error;
              });
          }
        function partager() {
            var { pending, fulfilled, rejected } = extraActions.partager;
            builder
              .addCase(pending, (state) => {
                state.error = null;
                state.isLoader = true;
              })
              .addCase(fulfilled, (state, action) => {
               const message = action.payload;
               console.log('message',message);
                state.isLoader = false;
              })
              .addCase(rejected, (state, action) => {
                state.isLoader = false;
                state.error = action.error;
              });
          }
        function creerRecue() {
            var { pending, fulfilled, rejected } = extraActions.creerRecue;
            builder
              .addCase(pending, (state) => {
                state.error = null;
                state.isLoader = true;
              })
              .addCase(fulfilled, (state, action) => {
               const recue = action.payload;
                state.recue=recue
                state.isLoader = false;
              })
              .addCase(rejected, (state, action) => {
                state.isLoader = false;
                state.error = action.error;
              });
          }
          
        function payerFacture() {
            var { pending, fulfilled, rejected } = extraActions.payerFacture;
            builder
              .addCase(pending, (state) => {
                state.error = null;
                state.isLoader = true;
              })
              .addCase(fulfilled, (state, action) => {
               const facture = action.payload;
                state.facture=facture
                state.isLoader = false;
              })
              .addCase(rejected, (state, action) => {
                state.isLoader = false;
                state.error = action.error;
              });
          }
          
        function listeFacture() {
            var { pending, fulfilled, rejected } = extraActions.listeFacture;
            builder
              .addCase(pending, (state) => {
                state.error = null;
                state.isLoader = true;
              })
              .addCase(fulfilled, (state, action) => {
               const facture = action.payload;
                state.factures=facture
                state.isLoader = false;
              })
              .addCase(rejected, (state, action) => {
                state.isLoader = false;
                state.error = action.error;
              });
          }
        function listeBilan() {
            var { pending, fulfilled, rejected } = extraActions.listeBilan;
            builder
              .addCase(pending, (state) => {
                state.error = null;
                state.isLoader = true;
              })
              .addCase(fulfilled, (state, action) => {
               const bilan = action.payload;
                state.bilans=bilan
                state.isLoader = false;
              })
              .addCase(rejected, (state, action) => {
                state.isLoader = false;
                state.error = action.error;
              });
          }
        function listeCharge() {
            var { pending, fulfilled, rejected } = extraActions.listeCharge;
            builder
              .addCase(pending, (state) => {
                state.error = null;
                state.isLoader = true;
              })
              .addCase(fulfilled, (state, action) => {
               const charge = action.payload;
               console.log(charge)
                state.charges=charge
                state.isLoader = false;
              })
              .addCase(rejected, (state, action) => {
                state.isLoader = false;
                state.error = action.error;
              });
          }
        function listeCommission() {
            var { pending, fulfilled, rejected } = extraActions.listeCommission;
            builder
              .addCase(pending, (state) => {
                state.error = null;
                state.isLoader = true;
              })
              .addCase(fulfilled, (state, action) => {
               const commission = action.payload;
                state.commissions=commission
                state.isLoader = false;
              })
              .addCase(rejected, (state, action) => {
                state.isLoader = false;
                state.error = action.error;
              });
          }
        function listeRecue() {
            var { pending, fulfilled, rejected } = extraActions.listeRecue;
            builder
              .addCase(pending, (state) => {
                state.error = null;
                state.isLoader = true;
              })
              .addCase(fulfilled, (state, action) => {
               const recue = action.payload;
                state.recues=recue
                state.isLoader = false;
              })
              .addCase(rejected, (state, action) => {
                state.isLoader = false;
                state.error = action.error;
              });
          }
          
    }
    }





