import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import {FirestoreAdapter} from "@next-auth/firebase-adapter"

export default NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
    ],
    pages: {
        signIn: '/auth/signin',
    },
    callbacks: {
        async session({session, token, user}) {
            session.user.username = session.user?.name?.split(" ").join("").toLocaleLowerCase();
            session.user.uid = token.sub;
            return session;
        }
    }
    /*adapter: FirestoreAdapter({
        apiKey: process.env.FIREBASE_API_KEY,
        appId: process.env.FIREBASE_APP_ID,
        authDomain: process.env.FIREBASE_AUTH_DOMAIN,
        databaseURL: process.env.FIREBASE_DATABASE_URL,
        projectId: process.env.FIREBASE_PROJECT_ID,
        storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
        messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
        // Optional emulator config (see below for options)
        emulator: {},
    }),*/
    // ...
});