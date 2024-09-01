import { collection, addDoc, doc, deleteDoc, getDoc, query, where, getDocs, updateDoc } from 'firebase/firestore';
import { Firestore } from './Config/Configuration';

export class Service {
  constructor() {
    this.db = Firestore;
    this.collectionName = 'Checkout';
  }

  async createCheckout({selectedProducts, totalCost }) {
    try {
      const docRef = await addDoc(collection(this.db, this.collectionName), {
        selectedProducts,
        totalCost
      });
      return docRef;
    } catch (error) {
      console.log("Error occurred while Checking Out", error);
    }
  }

  async updateCheckout(id, { name, address, contact, pincode }) {
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
      console.log("Error occurred while Unable to change Cart", error);
    }
  }

  async deleteCheckout(id) {
    try {
      await deleteDoc(doc(this.db, this.collectionName, id));
      return true;
    } catch (error) {
      console.log("Error occurred while removing Checkout", error);
    }
  }

  async getCheckoutById(id) {
    try {
      const q = query(collection(this.db, this.collectionName), where("userId", "==", id));
      const querySnapshot = await getDocs(q);
      let Users = {};
      querySnapshot.forEach((doc) => {
        Users = {...doc.data(), docId: doc.id}
      });
      return Users;
    } catch (error) {
      console.log("Error occurred while fetching Products", error);
      return false;
    }
  }

  async getCheckout() {
    try {
      const q = query(collection(this.db, this.collectionName), where("totalCost", ">", 0));
      const querySnapshot = await getDocs(q);
      const Users = [];
      querySnapshot.forEach((doc) => {
        Users.push({...doc.data(), checkoutDocId: doc.id});
      });
      return Users[0];
    } catch (error) {
      console.log("Error occurred while fetching Products", error);
    }
  }
}

const CHECKOUT_SERVICE = new Service();

export default CHECKOUT_SERVICE;
