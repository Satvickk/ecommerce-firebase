import { collection, addDoc, doc, deleteDoc, getDoc, query, where, getDocs, updateDoc } from "firebase/firestore";
import { Firestore } from "./Config/Configuration";
export class Service {
  db;
  collectionName;
  constructor() {
    this.db = Firestore;
    this.collectionName = "Checkout";
  }
  async createCheckout({ selectedProducts, totalCost }) {
    try {
      const docRef = await addDoc(collection(this.db, this.collectionName), {
        selectedProducts,
        totalCost
      });
      return docRef;
    } catch (error) {
      console.log("Error occurred while Checking Out", error);
      return null;
    }
  }
  async updateCheckout(id, { name, address, contact, pincode }) {
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
      console.log("Error occurred while Unable to change Cart", error);
      return false;
    }
  }
  async deleteCheckout(id) {
    try {
      await deleteDoc(doc(this.db, this.collectionName, id));
      return true;
    } catch (error) {
      console.log("Error occurred while removing Checkout", error);
      return false;
    }
  }
  async getCheckoutById(id) {
    try {
      const q = query(collection(this.db, this.collectionName), where("userId", "==", id));
      const querySnapshot = await getDocs(q);
      let checkout = null;
      querySnapshot.forEach((docSnap) => {
        checkout = { ...docSnap.data(), checkoutDocId: docSnap.id };
      });
      return checkout;
    } catch (error) {
      console.log("Error occurred while fetching Products", error);
      return null;
    }
  }
  async getCheckout() {
    try {
      const q = query(collection(this.db, this.collectionName), where("totalCost", ">", 0));
      const querySnapshot = await getDocs(q);
      const checkouts = [];
      querySnapshot.forEach((docSnap) => {
        checkouts.push({ ...docSnap.data(), checkoutDocId: docSnap.id });
      });
      return checkouts[0] || null;
    } catch (error) {
      console.log("Error occurred while fetching Products", error);
      return null;
    }
  }
}
const CHECKOUT_SERVICE = new Service();
export default CHECKOUT_SERVICE;
