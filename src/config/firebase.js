import firebase from 'firebase';

const config = {
  apiKey: 'AIzaSyBFYfUkmt-lInbqGDXlSAR5ik4kTytrj6o',
  authDomain: 'covid-19-82a05.firebaseapp.com',
  databaseURL: 'https://covid-19-82a05-default-rtdb.firebaseio.com',
  projectId: 'covid-19-82a05',
  storageBucket: 'covid-19-82a05.appspot.com',
  messagingSenderId: '109816880050',
  appId: '1:109816880050:web:adaf77d71f793a1ac4e2ab',
  measurementId: 'G-GGTJDVQRZ9',
};
firebase.initializeApp(config);
export default firebase;
