import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  User as FirebaseUser,
  Auth as FirebaseAuth
} from "firebase/auth";
import { Auth } from "./Config/Configuration";

export class AuthService {
  private auth: FirebaseAuth;

  constructor() {
    this.auth = Auth;
  }

  async createAccount({ email, password, name }: { email: string; password: string; name: string }): Promise<FirebaseUser | null> {
    try {
      const userCredential = await createUserWithEmailAndPassword(this.auth, email, password);
      const user = userCredential.user;
      if (user) {
        await updateProfile(user, { displayName: name });
        return this.login({ email, password });
      } else {
        return user;
      }
    } catch (error) {
      throw error;
    }
  }

  async login({ email, password }: { email: string; password: string }): Promise<FirebaseUser> {
    try {
      const data = await signInWithEmailAndPassword(this.auth, email, password);
      return data.user;
    } catch (error) {
      throw error;
    }
  }

  async getCurrentUser(): Promise<FirebaseUser | null> {
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

  async logout(): Promise<boolean> {
    try {
      await signOut(this.auth);
      return true;
    } catch (error) {
      console.log("Firebase service :: logout :: error", error);
      return false;
    }
  }
}

const AUTH_SERVICE = new AuthService();
export default AUTH_SERVICE;
