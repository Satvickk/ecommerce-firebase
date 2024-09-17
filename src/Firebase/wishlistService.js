import { collection, addDoc, doc, getDoc, query, where, getDocs, updateDoc } from 'firebase/firestore';
import { Firestore } from './Config/Configuration';

export class Service {
  constructor() {
    this.db = Firestore;
    this.collectionName = 'Wishlist';
  }

  async createWishList({customerId}) {
    try {
      const docRef = await addDoc(collection(this.db, this.collectionName), {
        customerId,
        selectedProducts : [],
      });
      return docRef;
    } catch (error) {
      console.log("Error occurred while creating customer to Wishlist", error);
    }
  }

  async updateWishlist(id, {selectedProducts }) {
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
      console.log("Error occurred while Unable to Add Product to Wishliat", error);
    }
  }

  async emptyWishlist(id, {customerId}) {
    try {
      const docRef = doc(this.db, this.collectionName, id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        await updateDoc(docRef, {
         customerId: customerId,
         selectedProducts: [],
        });
        return true;
      } else {
        console.log("No such document!");
        return false;
      }
    } catch (error) {
      console.log("Error occurred while Unable to Empty Wishliat", error);
    }
  }


  async getUserWishlist(id) {
    try {
      const q = query(collection(this.db, this.collectionName), where("userId", "==", id));
      const querySnapshot = await getDocs(q);
      let Wishlist = [];
      querySnapshot.forEach((doc) => {
        Wishlist.push({...doc.data(), WishListDocId: doc.id})
      });
      return Wishlist[0]
    } catch (error) {
      console.log("Error occurred while fetching Wishlist", error);
      return false;
    }
  }
}

const WISHLIST_SERVICE = new Service();

export default WISHLIST_SERVICE;
