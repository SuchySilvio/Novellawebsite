// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import firebase from "firebase/compat/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAJyqzhW7Th0rMLtHDMGM1nLJGcKXvgwCs",
    authDomain: "double-song-385922.firebaseapp.com",
    projectId: "double-song-385922",
    storageBucket: "double-song-385922.appspot.com",
    messagingSenderId: "723750334093",
    appId: "1:723750334093:web:db516c994f8c6ea87abcc4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


document.getElementById("email-form").addEventListener("submit", function(e){
    e.preventDefault();

    // Get form values
    var name = document.getElementById("name").value;
    var email = document.getElementById("email").value;
    var phoneNumber = document.getElementById("field").value;
    var dob = document.getElementById("field-2").value;
    var password = document.getElementById("field-3").value;
    var confirmPassword = document.getElementById("field-4").value;
    var accountPurpose = document.getElementById("field-5").value;

    if (password !== confirmPassword) {
        alert("Passwords do not match!");
        return;
    }

    // Sign up user
    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // User created. Now save additional information in Firestore.
            var user = userCredential.user;
            return firebase.firestore().collection('users').doc(user.uid).set({
                name: name,
                email: email,
                phoneNumber: phoneNumber,
                dob: dob,
                accountPurpose: accountPurpose
                // ... Add other fields if needed
            });
        })
        .then(() => {
            alert("User signed up and data saved!");
        })
        .catch((error) => {
            console.error("Error signing up: ", error);
        });
});


