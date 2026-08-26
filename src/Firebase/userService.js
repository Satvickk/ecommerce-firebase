import {
  collection,
  addDoc,
  doc,
  deleteDoc,
  getDoc,
  query,
  where,
  getDocs,
  updateDoc
} from "firebase/firestore";
import { Firestore } from "./Config/Configuration";
export class Service {
  db;
  collectionName;
  constructor() {
    this.db = Firestore;
    this.collectionName = "Users";
  }
  async createUser({ name, email, address, contact, pincode, userId }) {
    try {
      const docRef = await addDoc(collection(this.db, this.collectionName), {
        name,
        email,
        address,
        contact,
        pincode,
        userId,
        userRole: 1
      });
      return docRef;
    } catch (error) {
      console.log("Error occurred while creating User", error);
      return null;
    }
  }
  async updateUser(id, { name, address, contact, pincode }) {
    try {
      const docRef = doc(this.db, this.collectionName, id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        await updateDoc(docRef, {
          ...name && { name },
          ...address && { address },
          ...contact && { contact },
          ...pincode && { pincode }
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
  async deleteUser(id) {
    try {
      await deleteDoc(doc(this.db, this.collectionName, id));
      return true;
    } catch (error) {
      console.log("Error occurred while deleting User", error);
      return false;
    }
  }
  async getUserById(id) {
    try {
      const q = query(collection(this.db, this.collectionName), where("userId", "==", id));
      const querySnapshot = await getDocs(q);
      let user = null;
      querySnapshot.forEach((docSnap) => {
        user = { ...docSnap.data(), docId: docSnap.id };
      });
      return user;
    } catch (error) {
      console.log("Error occurred while fetching User", error);
      return null;
    }
  }
  async getUsers() {
    try {
      const q = query(collection(this.db, this.collectionName), where("userRole", "==", 1));
      const querySnapshot = await getDocs(q);
      const users = [];
      querySnapshot.forEach((docSnap) => {
        users.push({ ...docSnap.data(), docId: docSnap.id });
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
