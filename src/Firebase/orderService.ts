import { collection, addDoc, doc, deleteDoc, getDoc, query, where, getDocs, updateDoc, Firestore as FirebaseFirestore } from 'firebase/firestore';
import { Firestore } from './Config/Configuration';
import { CreateOrderPayload, Order } from '../types';

export class Service {
  private db: FirebaseFirestore;
  private collectionName: string;

  constructor() {
    this.db = Firestore;
    this.collectionName = 'Order';
  }

  async createOrder({ orderDetails, customerDetails, userId }: CreateOrderPayload) {
    try {
      const docRef = await addDoc(collection(this.db, this.collectionName), {
        orderId: this.generateOrderId(),
        orderDetails,
        customerDetails,
        orderDate: this.getDateAndTime(),
        deliveryDate: "",
        deliveryCancelledDate: "",
        deliveryStatus: 2,
        userId,
      });
      return docRef;
    } catch (error) {
      console.log("Error occurred while Placing Order", error);
      return null;
    }
  }

  async updateOrderStatus(id: string, { deliveryStatus, deliveryDate }: { deliveryStatus: number; deliveryDate?: string }) {
    try {
      const docRef = doc(this.db, this.collectionName, id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        await updateDoc(docRef, {
          deliveryStatus,
          ...(deliveryDate && { deliveryDate }),
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

  async deleteOrder(id: string): Promise<boolean> {
    try {
      await deleteDoc(doc(this.db, this.collectionName, id));
      return true;
    } catch (error) {
      console.log("Error occurred while deleting Order", error);
      return false;
    }
  }

  async getOrderByUserId(id: string): Promise<Order[]> {
    try {
      const q = query(collection(this.db, this.collectionName), where("userId", "==", id));
      const querySnapshot = await getDocs(q);
      const orders: Order[] = [];
      querySnapshot.forEach((docSnap) => {
        orders.push({ ...(docSnap.data() as Order), docId: docSnap.id });
      });
      return orders;
    } catch (error) {
      console.log("Error occurred while fetching Order", error);
      return [];
    }
  }

  async getAllOrders(): Promise<Order[]> {
    try {
      const querySnapshot = await getDocs(collection(this.db, this.collectionName));
      const orders: Order[] = [];
      querySnapshot.forEach((docSnap) => {
        orders.push({ ...(docSnap.data() as Order), docId: docSnap.id });
      });
      return orders;
    } catch (error) {
      console.log("Error occurred while fetching Orders", error);
      return [];
    }
  }

  generateOrderId(): string {
    const newDocRef = doc(collection(this.db, this.collectionName));
    return newDocRef.id;
  }

  getDateAndTime(): string {
    const now = new Date();
    return now.toLocaleString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    });
  }
}

const ORDER_SERVICE = new Service();
export default ORDER_SERVICE;
