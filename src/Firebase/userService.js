import { collection, addDoc, doc, deleteDoc, getDoc, query, where, getDocs, updateDoc } from 'firebase/firestore';
import { Firestore } from './Config/Configuration';

export class Service {
  constructor() {
    this.db = Firestore;
    this.collectionName = 'Users';
  }

  async createUser({ name, email, address, contact, password, pincode, userId }) {
    try {
      const docRef = await addDoc(collection(this.db, this.collectionName), {
        name,
        email,
        address,
        contact,
        password,
        pincode,
        userId,
        // user Role 1 = customer
        // user Role 2 = admin
        userRole: 1,
      });
      return docRef;
    } catch (error) {
      console.log("Error occurred while creating User", error);
    }
  }

  async updateUser(id, { name, address, contact, pincode }) {
    try {
      const docRef = doc(this.db, this.collectionName, id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        await updateDoc(docRef, {
          name,
          address,
          contact,
          pincode,
        });
        return true;
      } else {
        console.log("No such document!");
        return false;
      }
    } catch (error) {
      console.log("Error occurred while updating User", error);
    }
  }

  async deleteUser(id) {
    try {
      await deleteDoc(doc(this.db, this.collectionName, id));
      return true;
    } catch (error) {
      console.log("Error occurred while deleting User", error);
    }
  }

  async getUserById(id) {
    try {
      const q = query(collection(this.db, this.collectionName), where("userId", "==", id));
      const querySnapshot = await getDocs(q);
      let Users = {};
      querySnapshot.forEach((doc) => {
        Users = {...doc.data(), docId: doc.id}
      });
      return Users;
    } catch (error) {
      console.log("Error occurred while fetching User", error);
      return false;
    }
  }

  async getUsers() {
    try {
      const q = query(collection(this.db, this.collectionName), where("userRole", "==", 1));
      const querySnapshot = await getDocs(q);
      const Users = [];
      querySnapshot.forEach((doc) => {
        Users.push({...doc.data(), docId: doc.id});
      });
      return Users;
    } catch (error) {
      console.log("Error occurred while fetching Users", error);
    }
  }
}

const USER_SERVICE = new Service();

export default USER_SERVICE;
