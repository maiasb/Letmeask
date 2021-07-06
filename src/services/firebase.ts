import firebase from 'firebase/app'

// IMPORTANDO FUNÇÕES DO FIREBASE
import 'firebase/auth'
import 'firebase/database'

const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_DATABASE_URL,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGIN_SENDER_ID,
    appId: process.env.REACT_APP_APP_ID
};

// FUNÇÃO QUE INICIA O FIREBASE COM AS CONFIGURAÇÕES PASSADAS
firebase.initializeApp(firebaseConfig);

// EXPORTANDO FUNÇÕES DO FIREBASE PARA O APP
const auth = firebase.auth;
const datebase = firebase.database;

export { firebase, auth, datebase };