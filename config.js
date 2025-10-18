// Firebase Configuration
const firebaseConfig = {
    apiKey: "AIzaSyARdIkRXsDg-PC6GMgXzNrpfFHuFg_QSMs", 
    authDomain: "lakhra-fabrics.firebaseapp.com",
    projectId: "lakhra-fabrics",
    storageBucket: "lakhra-fabrics.firebasestorage.app",
    messagingSenderId: "940319313961",
    appId: "1:940319313961:web:a51299bc19a7aa1dadcc38",
    measurementId: "G-CLLLGFEPDK"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Export for use in other files
window.db = db;