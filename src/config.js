import firebase from 'firebase/app';

const firebaseConfig = {
    apiKey: "AIzaSyAcAxl1Q9lLs2ymp1MJ6WVO-wNQEyB4feA",
    authDomain: "the-break-online.firebaseapp.com",
    projectId: "the-break-online",
    storageBucket: "the-break-online.appspot.com",
    databaseURL: "https://the-break-online.firebaseio.com",
    messagingSenderId: "579966862829",
    appId: "1:579966862829:web:98ae654f53ade0a39593e4",
    measurementId: "G-ZS5XZM7S3K"
}

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export { firebase };