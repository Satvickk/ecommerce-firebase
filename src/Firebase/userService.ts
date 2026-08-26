import {
  collection,
  addDoc,
  doc,
  deleteDoc,
  getDoc,
  query,
  where,
  getDocs,
  updateDoc,
  Firestore as FirebaseFirestore
} from 'firebase/firestore';
import { Firestore } from './Config/Configuration';
import { UserProfile } from '../types';

export class Service {
  private db: FirebaseFirestore;
  private collectionName: string;

  constructor() {
    this.db = Firestore;
    this.collectionName = 'Users';
  }

  async createUser({ name, email, address, contact, pincode, userId }: Omit<UserProfile, 'docId' | 'userRole'>) {
    try {
      const docRef = await addDoc(collection(this.db, this.collectionName), {
        name,
        email,
        address,
        contact,
        pincode,
        userId,
        userRole: 1,
      });
      return docRef;
    } catch (error) {
      console.log("Error occurred while creating User", error);
      return null;
    }
  }

  async updateUser(id: string, { name, address, contact, pincode }: Partial<UserProfile>) {
    try {
      const docRef = doc(this.db, this.collectionName, id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        await updateDoc(docRef, {
          ...(name && { name }),
          ...(address && { address }),
          ...(contact && { contact }),
          ...(pincode && { pincode }),
        });
        return true;
      } else {
        console.log("No such document!");
        return false;
      }
    } catch (error) {
      console.log("Error occurred while updating User", error);
      return false;
    }
  }

  async deleteUser(id: string): Promise<boolean> {
    try {
      await deleteDoc(doc(this.db, this.collectionName, id));
      return true;
    } catch (error) {
      console.log("Error occurred while deleting User", error);
      return false;
    }
  }

  async getUserById(id: string): Promise<UserProfile | null> {
    try {
      const q = query(collection(this.db, this.collectionName), where("userId", "==", id));
      const querySnapshot = await getDocs(q);
      let user: UserProfile | null = null;
      querySnapshot.forEach((docSnap) => {
        user = { ...(docSnap.data() as UserProfile), docId: docSnap.id };
      });
      return user;
    } catch (error) {
      console.log("Error occurred while fetching User", error);
      return null;
    }
  }

  async getUsers(): Promise<UserProfile[]> {
    try {
      const q = query(collection(this.db, this.collectionName), where("userRole", "==", 1));
      const querySnapshot = await getDocs(q);
      const users: UserProfile[] = [];
      querySnapshot.forEach((docSnap) => {
        users.push({ ...(docSnap.data() as UserProfile), docId: docSnap.id });
      });
      return users;
    } catch (error) {
      console.log("Error occurred while fetching Users", error);
      return [];
    }
  }
}

const USER_SERVICE = new Service();
export default USER_SERVICE;
