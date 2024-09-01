/* eslint-disable no-useless-catch */
   
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";
import { Auth } from "./Config/Configuration";

export class AuthService {
    constructor() {
        this.auth = Auth;
    }

    async createAccount({ email, password, name }) {
        try {
            const userCredential = await createUserWithEmailAndPassword(this.auth, email, password);
            const user = userCredential.user;
            if (user) {
                await updateProfile(user, { displayName: name });
                // call Login method
                return this.login({ email, password });
            } else {
                return user;
            }
        } catch (error) {
            throw error;
        }
    }

    async login({ email, password }) {
        try {
            const data = await signInWithEmailAndPassword(this.auth, email, password);
            return data.user;
        } catch (error) {
            throw error;
        }
    }

    async getCurrentUser() {
        try {
            return new Promise((resolve, reject) => {
                onAuthStateChanged(this.auth, (user) => {
                    if (user) {
                        resolve(user);
                    } else {
                        resolve(null);
                    }
                }, (error) => {
                    reject(error);
                });
            });
        } catch (error) {
            console.log("Firebase service :: getCurrentUser :: error", error);
        }

        return null;
    }

    async logout() {
        try {
            await signOut(this.auth);
            return true
        } catch (error) {
            console.log("Firebase service :: logout :: error", error);
        }
    }
}

const AUTH_SERVICE = new AuthService();

export default AUTH_SERVICE

