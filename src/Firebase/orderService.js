import { collection, addDoc, doc, deleteDoc, getDoc, query, where, getDocs, updateDoc } from 'firebase/firestore';
import { Firestore } from './Config/Configuration'; // Ensure this imports your Firestore instance

export class Service {
  constructor() {
    this.db = Firestore;
    this.collectionName = 'Order';
  }

  //   deliveryStatus - [
//     1 - Delivered,
//     2 - Pending,
//     3 - Cancelled,
//     4 - Not Delivered
//     5 - Delivery Schedule
// ]

  async createOrder({ orderDetails, customerDetails, userId }) {
    try {
      const docRef = await addDoc(collection(this.db, this.collectionName), {
        orderId: this.generateOrderId(),
        orderDetails,
        customerDetails: customerDetails,
        orderDate: this.getDateAndTime(),
        deliveryDate: "",
        deliveryCancelledDate: "",
        deliveryStatus: 2,
        userId,
      });
      return docRef;
    } catch (error) {
      console.log("Error occurred while Placing Order", error);
    }
  }

  async updateOrderStatus(id, { deliveryStatus, deliveryDate }) {
    try {
      const docRef = doc(this.db, this.collectionName, id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        await updateDoc(docRef, {
          deliveryStatus,
          deliveryDate,
        });
        return true;
      } else {
        console.log("No such document!");
        return false;
      }
    } catch (error) {
      console.log("Error occurred while Updating Order", error);
    }
  }

  async deleteOrder(id) {
    try {
      await deleteDoc(doc(this.db, this.collectionName, id));
      return true;
    } catch (error) {
      console.log("Error occurred while deleting Order", error);
    }
  }

  async getOrderByUserId(id) {
    try {
      const q = query(collection(this.db, this.collectionName), where("userId", "==", id));
      const querySnapshot = await getDocs(q);
      let Users = [];
      querySnapshot.forEach((doc) => {
        Users.push({ ...doc.data(), docId: doc.id });
      });
      return Users;
    } catch (error) {
      console.log("Error occurred while fetching Order", error);
      return false;
    }
  }

  async getAllOrders() {
    try {
      const querySnapshot = await getDocs(collection(this.db, this.collectionName));
      const Orders = [];
      querySnapshot.forEach((doc) => {
        Orders.push({ ...doc.data(), docId: doc.id });
      });
      return Orders;
    } catch (error) {
      console.log("Error occurred while fetching Orders", error);
      return false;
    }
  }

  // utilities Functions
  generateOrderId() {
    // Generate a new order ID using the new Firestore SDK methods
    const newDocRef = doc(collection(this.db, this.collectionName));
    return newDocRef.id;
  }

  getDateAndTime() {
    const now = new Date();
    return now.toLocaleString('en-US', {
      year: 'numeric',
      month: 'long', // Can use 'numeric' for numerical month
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true, // Set to false for 24-hour format
    });
  }
}

const ORDER_SERVICE = new Service();

export default ORDER_SERVICE;
