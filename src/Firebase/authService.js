/* eslint-disable no-useless-catch */
   
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { Auth } from "./config/Configuration";

export class AuthService {
    constructor() {
        this.auth = Auth;
    }

    async createAccount({ email, password, name }) {
        try {
            const userCredential = await createUserWithEmailAndPassword(this.auth, email, password);
            const user = userCredential.user;
            if (user) {
                // Optionally update user profile with name
                await user.updateProfile({ displayName: name });
                // call another method
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
            return await signInWithEmailAndPassword(this.auth, email, password);
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
        } catch (error) {
            console.log("Firebase service :: logout :: error", error);
        }
    }
}

const authService = new AuthService();

export default authService

