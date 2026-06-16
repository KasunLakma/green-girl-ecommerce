"use client";

import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

let app;
let auth;
let db;

// Safe internal validation statement: If apiKey is missing, undefined, or matches a mock pattern, print a clean log and load safely
if (!firebaseConfig.apiKey || firebaseConfig.apiKey === "undefined" || firebaseConfig.apiKey.includes("mock")) {
  console.log("Firebase API Key is missing, undefined, or mock. Initializing in sandbox simulation mode.");
  const fallbackConfig = {
    apiKey: "AIzaSyFakeKeyForLocalSandboxVerificationOnly",
    authDomain: firebaseConfig.authDomain || "mock-domain.firebaseapp.com",
    projectId: firebaseConfig.projectId || "mock-project-id",
    storageBucket: firebaseConfig.storageBucket,
    messagingSenderId: firebaseConfig.messagingSenderId,
    appId: firebaseConfig.appId
  };
  app = getApps().length > 0 ? getApp() : initializeApp(fallbackConfig);
} else {
  try {
    app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
  } catch (error) {
    console.warn("Firebase initialization failed, falling back to sandbox: ", error);
    const fallbackConfig = {
      apiKey: "AIzaSyFakeKeyForLocalSandboxVerificationOnly",
      authDomain: "mock-domain.firebaseapp.com",
      projectId: "mock-project-id"
    };
    app = getApps().length > 0 ? getApp() : initializeApp(fallbackConfig);
  }
}

auth = getAuth(app);
db = getFirestore(app);

export { app, auth, db };
