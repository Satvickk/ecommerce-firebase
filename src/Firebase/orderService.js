import { collection, addDoc, doc, deleteDoc, getDoc, query, where, getDocs, updateDoc } from "firebase/firestore";
import { Firestore } from "./Config/Configuration";
export class Service {
  db;
  collectionName;
  constructor() {
    this.db = Firestore;
    this.collectionName = "Order";
  }
  async createOrder({ orderDetails, customerDetails, userId }) {
    try {
      const docRef = await addDoc(collection(this.db, this.collectionName), {
        orderId: this.generateOrderId(),
        orderDetails,
        customerDetails,
        orderDate: this.getDateAndTime(),
        deliveryDate: "",
        deliveryCancelledDate: "",
        deliveryStatus: 2,
        userId
      });
      return docRef;
    } catch (error) {
      console.log("Error occurred while Placing Order", error);
      return null;
    }
  }
  async updateOrderStatus(id, { deliveryStatus, deliveryDate }) {
    try {
      const docRef = doc(this.db, this.collectionName, id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        await updateDoc(docRef, {
          deliveryStatus,
          ...deliveryDate && { deliveryDate }
        });
        return true;
      } else {
        console.log("No such document!");
        return false;
      }
    } catch (error) {
      console.log("Error occurred while Updating Order", error);
      return false;
    }
  }
  async deleteOrder(id) {
    try {
      await deleteDoc(doc(this.db, this.collectionName, id));
      return true;
    } catch (error) {
      console.log("Error occurred while deleting Order", error);
      return false;
    }
  }
  async getOrderByUserId(id) {
    try {
      const q = query(collection(this.db, this.collectionName), where("userId", "==", id));
      const querySnapshot = await getDocs(q);
      const orders = [];
      querySnapshot.forEach((docSnap) => {
        orders.push({ ...docSnap.data(), docId: docSnap.id });
      });
      return orders;
    } catch (error) {
      console.log("Error occurred while fetching Order", error);
      return [];
    }
  }
  async getAllOrders() {
    try {
      const querySnapshot = await getDocs(collection(this.db, this.collectionName));
      const orders = [];
      querySnapshot.forEach((docSnap) => {
        orders.push({ ...docSnap.data(), docId: docSnap.id });
      });
      return orders;
    } catch (error) {
      console.log("Error occurred while fetching Orders", error);
      return [];
    }
  }
  generateOrderId() {
    const newDocRef = doc(collection(this.db, this.collectionName));
    return newDocRef.id;
  }
  getDateAndTime() {
    const now = /* @__PURE__ */ new Date();
    return now.toLocaleString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true
    });
  }
}
const ORDER_SERVICE = new Service();
export default ORDER_SERVICE;
