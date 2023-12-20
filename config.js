import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

export const firebaseConfig = {
	apiKey: "AIzaSyCjzR0Apd08cMpBdioUNUqteFORqNN68wY",
	authDomain: "your-fusion.firebaseapp.com",
	projectId: "your-fusion",
	storageBucket: "your-fusion.appspot.com",
	messagingSenderId: "929719748628",
	appId: "1:929719748628:web:ea3a2e0ff152a473b5bf01",
	measurementId: "G-PTN7BMMHEW",
};

if (!firebase.apps.length) {
	firebase.initializeApp(firebaseConfig);
}
