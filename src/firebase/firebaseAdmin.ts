'use server'

export async function initializeAdmin(){
    const admin = require('firebase-admin')
    const serviceAccount = require("./pseudotranslator-47755-firebase-adminsdk-2vhqy-561c971298.json")
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
    });
    return admin
}
