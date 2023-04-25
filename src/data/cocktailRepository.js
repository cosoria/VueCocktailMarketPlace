import {
  // useCollection,
  useFirestore
  // useDocument
} from 'vuefire'

import { 
  collection, 
  doc, 
  getDoc, 
  getDocs, 
  addDoc, 
  updateDoc, 
  deleteDoc,
  query, 
  orderBy, 
  startAfter, 
  limit,
  where,
  endBefore,
  limitToLast
} from 'firebase/firestore';

// import { endBefore, limitToLast,where  } from 'firebase/database';

function _delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export async function getAll() {
  await _delay(3000);
  const cocktails = []
  const querySnapshot = await getDocs(collection(useFirestore(), 'cocktails'))
  querySnapshot.forEach((doc) => {
    cocktails.push({ id: doc.id, ...doc.data() })
  })
  return cocktails
}

export async function getById(id) {
  const docRef = doc(useFirestore(), 'cocktails', id)
  const docSnap = await getDoc(docRef)

  if (docSnap.exists()) {
    return { id: docSnap.id, ...docSnap.data() }
  } else {
    return null
  }
}

export async function add(cocktail) {
  const payload = _createCocktail(cocktail)
  const docRef = await addDoc(collection(useFirestore(), 'cocktails'), payload)

  return { id: docRef.id, ...payload }
}

export async function update(cocktail) {
  const payload = _createCocktail(cocktail)
  const docRef = doc(useFirestore(), 'cocktails', cocktail.id)

  await updateDoc(docRef, payload)

  return { id: cocktail.id, ...payload }
}

export async function remove(id) {
  const docRef = doc(useFirestore(), 'cocktails', id);

  await deleteDoc(docRef);
}

export async function previousPage(bookmark, pageSize) {
  const cocktails = [];
  let documentsQuery = null;

  if(bookmark) {
    console.log('bookmark', bookmark);
    documentsQuery = query(collection(useFirestore(), 'cocktails'), 
                        orderBy('name'), 
                        endBefore(bookmark), 
                        limitToLast(pageSize));
    // documentsQuery = query(collection(useFirestore(), 'cocktails'), 
    //                     orderBy('name'), 
    //                     endBefore(bookmark));
  } else {
    documentsQuery = query(collection(useFirestore(), 'cocktails'), 
                        orderBy('name'), 
                        limit(pageSize));
  }

  const querySnapshot = await getDocs(documentsQuery);
  querySnapshot.forEach((doc) => {
    cocktails.push({ id: doc.id, ...doc.data() });
  });

  return cocktails;
}

export async function nextPage(bookmark = '', pageSize = 4) {
  const cocktails = [];
  let docmentsQuery = null;

  if(bookmark) {
    docmentsQuery = query(collection(useFirestore(), 'cocktails'), 
                        // where("userid","==", "dasdsdfsdfsd"),
                        orderBy('name'), 
                        startAfter(bookmark), 
                        limit(pageSize));
  } else {
    docmentsQuery = query(collection(useFirestore(), 'cocktails'), 
                        orderBy('name'), 
                        limit(pageSize));
  }

  const querySnapshot = await getDocs(docmentsQuery);
  querySnapshot.forEach((doc) => {
    cocktails.push({ id: doc.id, ...doc.data() });
  });

  return cocktails;
}

export async function gotoPage() {

}

function _createCocktail(cocktail) {
  const payload = {
    name: cocktail.name,
    instructions: cocktail.instructions,
    imgUrl: cocktail.imgUrl,
    inventoryCount: parseInt(cocktail.inventoryCount),
    price: parseFloat(cocktail.price),
    salePrice: parseFloat(cocktail.salePrice)
  }

  return payload
}
