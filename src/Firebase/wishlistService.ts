import { collection, addDoc, doc, getDoc, query, where, getDocs, updateDoc, Firestore as FirebaseFirestore } from 'firebase/firestore';
import { Firestore } from './Config/Configuration';
import { Product, WishlistState } from '../types';

export class Service {
  private db: FirebaseFirestore;
  private collectionName: string;

  constructor() {
    this.db = Firestore;
    this.collectionName = 'Wishlist';
  }

  async createWishList(customerId: string) {
    try {
      const docRef = await addDoc(collection(this.db, this.collectionName), {
        customerId,
        selectedProducts: [],
      });
      return docRef;
    } catch (error) {
      console.log("Error occurred while creating customer to Wishlist", error);
      return null;
    }
  }

  async updateWishlist(id: string, { selectedProducts }: { selectedProducts: Product[] }) {
    try {
      const docRef = doc(this.db, this.collectionName, id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        await updateDoc(docRef, {
          selectedProducts
        });
        return true;
      } else {
        console.log("No such document!");
        return false;
      }
    } catch (error) {
      console.log("Error occurred while Unable to Add Product to Wishlist", error);
      return false;
    }
  }

  async emptyWishlist(id: string, { customerId }: { customerId: string }) {
    try {
      const docRef = doc(this.db, this.collectionName, id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        await updateDoc(docRef, {
          customerId,
          selectedProducts: [],
        });
        return true;
      } else {
        console.log("No such document!");
        return false;
      }
    } catch (error) {
      console.log("Error occurred while Unable to Empty Wishlist", error);
      return false;
    }
  }

  async getUserWishlist(id: string): Promise<WishlistState | null> {
    try {
      const q = query(collection(this.db, this.collectionName), where("customerId", "==", id));
      const querySnapshot = await getDocs(q);
      const wishlists: WishlistState[] = [];
      querySnapshot.forEach((docSnap) => {
        wishlists.push({ ...(docSnap.data() as WishlistState), wishlistDocId: docSnap.id });
      });
      return wishlists[0] || null;
    } catch (error) {
      console.log("Error occurred while fetching Wishlist", error);
      return null;
    }
  }
}

const WISHLIST_SERVICE = new Service();
export default WISHLIST_SERVICE;
