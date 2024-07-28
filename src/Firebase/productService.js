import { collection, addDoc, doc, deleteDoc, getDoc, query, where, getDocs, updateDoc } from 'firebase/firestore';
import { ref, uploadBytesResumable, getDownloadURL, deleteObject } from 'firebase/storage';
import { Firestore, Storage } from './config/Configuration';

export class Service {
  constructor() {
    this.db = Firestore;
    this.storage = Storage;
    this.collectionName = 'Products';
    this.storageFolderName = 'ProductsImages';
  }

  async createProduct({ title, content, featuredImage, status, userId }) {
    console.log({ title, content, featuredImage, status, userId });
    try {
      const docRef = await addDoc(collection(this.db, this.collectionName), {
        title,
        content,
        featuredImage,
        status,
        userId,
      });
      return docRef;
    } catch (error) {
      console.log("Error occurred while creating Product", error);
    }
  }

  async updateProduct(id, { title, content, featuredImage, status }) {
    try {
      const docRef = doc(this.db, this.collectionName, id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const resp = await updateDoc(docRef, {
          title,
          content,
          featuredImage,
          status,
        });
        return resp;
      } else {
        console.log("No such document!");
        return false;
      }
    } catch (error) {
      console.log("Error occurred while updating Product", error);
    }
  }

  async deleteProduct(id) {
    try {
      await deleteDoc(doc(this.db, this.collectionName, id));
      return true;
    } catch (error) {
      console.log("Error occurred while deleting Product", error);
    }
  }

  async getProductById(id) {
    try {
      const docRef = doc(this.db, this.collectionName, id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        return docSnap.data();
      } else {
        console.log("No such document!");
        return false;
      }
    } catch (error) {
      console.log("Error occurred while fetching Product", error);
      return false;
    }
  }

  async getProducts() {
    try {
      const q = query(collection(this.db, this.collectionName), where("status", "==", "active"));
      const querySnapshot = await getDocs(q);
      const Products = [];
      querySnapshot.forEach((doc) => {
        Products.push(doc.data());
      });
      return Products;
    } catch (error) {
      console.log("Error occurred while fetching Products", error);
    }
  }

  // File upload service
  async uploadFile(file) {
    try {
      const storageRef = ref(this.storage, `${this.storageFolderName}/${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);
      return new Promise((resolve, reject) => {
        uploadTask.on(
          'state_changed',
          null,
          (error) => {
            console.log("Error occurred while uploading file", error);
            reject(error);
          },
          async () => {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            resolve(downloadURL);
          }
        );
      });
    } catch (error) {
      console.log("Error occurred while uploading file", error);
      return false;
    }
  }

  async deleteFile(fileId) {
    try {
      const fileRef = ref(this.storage, `${this.storageFolderName}/${fileId}`);
      await deleteObject(fileRef);
      return true;
    } catch (error) {
      console.log("Error occurred while deleting File", error);
    }
  }

  async getFilePreview(fileId) {
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

const service = new Service();

export default service;
