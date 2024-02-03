import * as admin from "firebase-admin";
import { initializeApp, getApps, cert } from 'firebase-admin/app';
import serviceAccountJson from './pseudotranslator-47755-firebase-adminsdk-2vhqy-beb1eb6575.json'
import { getAuth } from "firebase-admin/auth";

const serviceAccount = serviceAccountJson as admin.ServiceAccount;

const firebaseAdminConfig = {
    credential: cert(serviceAccount)
}

export function customInitApp() {
  if (getApps().length <= 0) {
    return initializeApp(firebaseAdminConfig);
  } else {  
    return getApps()[0];
  }
}
export const adminAuth = customInitApp();