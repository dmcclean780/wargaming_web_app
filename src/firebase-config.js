import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyARdLTdzdrtd44toGAd2eW3fJjoBUHovzY",
    authDomain: "wargaming-web-app.firebaseapp.com",
    projectId: "wargaming-web-app",
    storageBucket: "wargaming-web-app.appspot.com",
    messagingSenderId: "611600759065",
    appId: "1:611600759065:web:8f4dd960177d6d4cc2ed88",
    measurementId: "G-YSW7WPWH96"
  };
export const app = initializeApp(firebaseConfig);