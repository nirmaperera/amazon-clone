import firebase from 'firebase';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: "AIzaSyB8SHPZWqFz0aw2gDlJvi8ECXGYAI7i6lI",
	authDomain: "fir-2a086.firebaseapp.com",
	databaseURL: "https://fir-2a086.firebaseio.com",
	projectId: "fir-2a086",
	storageBucket: "fir-2a086.appspot.com",
	messagingSenderId: "51520487678",
	appId: "1:51520487678:web:8fbb491a87361d850be5af",
	measurementId: "G-9HFY6112J4"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();

export { db, auth };
