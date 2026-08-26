import {
  collection,
  addDoc,
  doc,
  deleteDoc,
  getDoc,
  getDocs,
  updateDoc,
  Firestore as FirebaseFirestore
} from "firebase/firestore";
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
  FirebaseStorage
} from "firebase/storage";
import { Firestore, Storage, CloudFunction } from "./Config/Configuration";
import { httpsCallable, Functions as FirebaseFunctions } from "firebase/functions";
import { Product } from "../types";

export class ProductService {
  private db: FirebaseFirestore;
  private storage: FirebaseStorage;
  private cloudFunction: FirebaseFunctions;
  private collectionName: string;
  private storageFolderName: string;
  private createStripeProduct: any;
  private updateStripeProduct: any;
  private deleteStripeProduct: any;

  constructor() {
    this.db = Firestore;
    this.storage = Storage;
    this.cloudFunction = CloudFunction;
    this.collectionName = "Products";
    this.storageFolderName = "ProductsImages";

    this.createStripeProduct = httpsCallable(this.cloudFunction, "createProduct");
    this.updateStripeProduct = httpsCallable(this.cloudFunction, "updateProduct");
    this.deleteStripeProduct = httpsCallable(this.cloudFunction, "deleteProduct");
  }

  async createProduct(payload: Omit<Product, "docId">) {
    try {
      const docRef = await addDoc(collection(this.db, this.collectionName), {
        ...payload,
      });
      return docRef;
    } catch (error) {
      console.log("Error occurred while creating Product", error);
      return false;
    }
  }

  async createProductInStripe(data: Product) {
    const payload = {
      name: data.title,
      description: data.description,
      images: [data.featuredImage],
      price: data.price,
    };

    try {
      const stripeResponse: any = await this.createStripeProduct({ ...payload });
      const docRef = doc(this.db, this.collectionName, data.docId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        await updateDoc(docRef, {
          ...data,
          stripeProductId: stripeResponse.data.product,
          stripePriceId: stripeResponse.data.id,
        });
        return {
          ...data,
          stripeProductId: stripeResponse.data.product,
          stripePriceId: stripeResponse.data.id,
        };
      } else {
        console.log("No such document! Cannot add Stripe data to the database");
        return false;
      }
    } catch (error: any) {
      console.error("Error creating product in Stripe:", error.message);
      return false;
    }
  }

  async updateProduct(id: string, payload: Partial<Product>) {
    try {
      const docRef = doc(this.db, this.collectionName, id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        await updateDoc(docRef, {
          ...payload,
        });
        return true;
      } else {
        console.log("No such document!");
        return false;
      }
    } catch (error) {
      console.log("Error occurred while updating Product", error);
      return false;
    }
  }

  async updateProductInStripe(payload: Product) {
    const { stripeProductId } = payload;
    try {
      await this.updateStripeProduct({
        stripeProductId,
        updates: {
          name: payload.title,
          description: payload.description,
          images: payload.featuredImage,
          price: payload.price,
        },
      });

      return true;
    } catch (error: any) {
      console.error("Error updating product:", error.message);
      return false;
    }
  }

  async deleteProduct(id: string) {
    try {
      await deleteDoc(doc(this.db, this.collectionName, id));
      return true;
    } catch (error) {
      console.log("Error occurred while deleting Product", error);
      return false;
    }
  }

  async deleteProductInStripe(id: string) {
    try {
      const resp: any = await this.deleteStripeProduct({ id });
      return resp.data;
    } catch (error: any) {
      console.error("Error deleting product in Stripe:", error.message);
      return false;
    }
  }

  async getProductById(id: string): Promise<Product | false> {
    try {
      const docRef = doc(this.db, this.collectionName, id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        return { ...(docSnap.data() as Product), docId: docSnap.id };
      } else {
        console.log("No such document!");
        return false;
      }
    } catch (error) {
      console.log("Error occurred while fetching Product", error);
      return false;
    }
  }

  async getProducts(): Promise<Product[]> {
    try {
      const querySnapshot = await getDocs(collection(this.db, this.collectionName));
      const Products: Product[] = [];
      querySnapshot.forEach((docSnap) => {
        Products.push({ ...(docSnap.data() as Product), docId: docSnap.id });
      });
      return Products;
    } catch (error) {
      console.log("Error occurred while fetching Products", error);
      return [];
    }
  }

  async uploadFile(file: File): Promise<{ downloadURL: string; fileId: string } | false> {
    try {
      const fileId = file.name;
      const storageRef = ref(this.storage, `${this.storageFolderName}/${fileId}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      return new Promise((resolve, reject) => {
        uploadTask.on(
          "state_changed",
          null,
          (error) => {
            console.log("Error occurred while uploading file", error);
            reject(error);
          },
          async () => {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            resolve({ downloadURL, fileId });
          }
        );
      });
    } catch (error) {
      console.log("Error occurred while uploading file", error);
      return false;
    }
  }

  async deleteFile(fileId: string): Promise<boolean> {
    try {
      const fileRef = ref(this.storage, `${this.storageFolderName}/${fileId}`);
      await deleteObject(fileRef);
      return true;
    } catch (error) {
      console.log("Error occurred while deleting File", error);
      return false;
    }
  }

  async getFilePreview(fileId: string): Promise<string> {
    try {
      const fileRef = ref(this.storage, `${this.storageFolderName}/${fileId}`);
      const downloadURL = await getDownloadURL(fileRef);
      return downloadURL;
    } catch (error) {
      console.log("Error occurred while getting file preview", error);
      return "#";
    }
  }
}

const PRODUCT_SERVICE = new ProductService();
export default PRODUCT_SERVICE;
