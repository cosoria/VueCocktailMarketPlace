import {
  // useCollection,
  useFirestore
  // useDocument
} from 'vuefire'
import { collection, doc, getDoc, getDocs, addDoc, updateDoc, deleteDoc } from 'firebase/firestore'

export async function getAll() {
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
  const docRef = doc(useFirestore(), 'cocktails', id)

  await deleteDoc(docRef)
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
