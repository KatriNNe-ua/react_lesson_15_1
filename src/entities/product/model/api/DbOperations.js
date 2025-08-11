import db from '@/shared/config/firebase-config'
import {
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  deleteDoc,
  updateDoc,
  query,
  orderBy,
  limit,
  startAfter,
  where
} from 'firebase/firestore/lite'

class DbOperations {
  constructor(name) {
    this.collectionRef = collection(db, name);
  }

  async getAllPaginated({
    page = 1,
    perPage = 6,
    cursors = [],
    searchValue = "",
  }) {
    let q;
    const realLimit = perPage + 1; // беремо на 1 більше

    const orderField = "title";

    if (page === 1) {
      q = searchValue
        ? query(
            this.collectionRef,
            where(orderField, ">=", searchValue),
            where(orderField, "<=", searchValue + "\uf8ff"),
            orderBy(orderField),
            limit(realLimit)
          )
        : query(this.collectionRef, orderBy(orderField), limit(realLimit));
    } else {
      const cursor = cursors[page - 1];
      if (!cursor) throw new Error("Cursor not found");

      q = searchValue
        ? query(
            this.collectionRef,
            where(orderField, ">=", searchValue),
            where(orderField, "<=", searchValue + "\uf8ff"),
            orderBy(orderField),
            startAfter(cursor),
            limit(realLimit)
          )
        : query(
            this.collectionRef,
            orderBy(orderField),
            startAfter(cursor),
            limit(realLimit)
          );
    }

    const snapshot = await getDocs(q);
    const docs = snapshot.docs;
    const hasMore = docs.length > perPage;

    const data = docs.slice(0, perPage).map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    const lastVisible = docs.length > 0 ? docs[perPage - 1] : null;

    return { data, cursor: lastVisible, hasMore };
  }

  //   async getAllPaginated({ page = 1, perPage = 6, cursors = [] }) {
  //     let q;

  //     const realLimit = perPage + 1; // беремо на 1 більше

  //     if (page === 1) {
  //       q = query(this.collectionRef, orderBy("title"), limit(realLimit));
  //     } else {
  //       const cursor = cursors[page - 2];
  //       if (!cursor) throw new Error("Cursor not found");
  //       q = query(
  //         this.collectionRef,
  //         orderBy("title"),
  //         startAfter(cursor),
  //         limit(realLimit)
  //       );
  //     }

  //     const snapshot = await getDocs(q);
  //     const docs = snapshot.docs;

  //     const hasMore = docs.length > perPage;

  //     const data = docs
  //       .slice(0, perPage)
  //       .map((doc) => ({ id: doc.id, ...doc.data() }));
  //     const lastVisible = docs[docs.length - 2] || null;

  //     return { data, cursor: lastVisible, hasMore };
  //   }

  async getById(id) {
    const snap = await getDoc(doc(this.collectionRef, id));
    return { id: snap.id, ...snap.data() };
  }

  async add(data) {
    await addDoc(this.collectionRef, data);
    return true;
  }
  async update(id, data) {
    await updateDoc(doc(this.collectionRef, id), data);
    return true;
  }
  async delete(id) {
    await deleteDoc(doc(this.collectionRef, id));
    return true;
  }
    // async filteredData({ fieldTitle, compareOperator, valueToCompare }) {
    //   try {
    //     const filter = where(fieldTitle, compareOperator, valueToCompare);
    //     const q = query(this.collectionRef, filter);
    //     const snapshot = await getDocs(q);
    //     const docs = snapshot.docs.map((doc) => ({
    //       id: doc.id,
    //       ...doc.data(),
    //     }));
    //     return docs;
    //   } catch (error) {
    //     console.error(error);
    //     throw error;
    //   }
    // }
  //===================================================================
    // async filteredData({ fieldTitle, compareOperator, valueToCompare }) {
    //   try {
    //     let q;

    //     if (compareOperator === "startsWith") {

    //       const endValue = valueToCompare + "\uf8ff";
    //       q = query(
    //         this.collectionRef,
    //         orderBy(fieldTitle),
    //         where(fieldTitle, ">=", valueToCompare),
    //         where(fieldTitle, "<=", endValue)
    //       );
    //     } else {

    //       const filter = where(fieldTitle, compareOperator, valueToCompare);
    //       q = query(this.collectionRef, filter);
    //     }

    //     const snapshot = await getDocs(q);
    //     return snapshot.docs.map((doc) => ({
    //       id: doc.id,
    //       ...doc.data(),
    //     }));
    //   } catch (error) {
    //     console.error(error);
    //     throw error;
    //   }
    // }
}

export default DbOperations
