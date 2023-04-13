import { 
    getAuth, 
    createUserWithEmailAndPassword, 
    signOut, 
    signInWithEmailAndPassword,
    updateProfile,
} from "firebase/auth";

export async function register(email, password) {
    const auth = getAuth();
    const cred = await createUserWithEmailAndPassword(auth, email, password);
    if(cred.user) {
        return cred.user;
    } else {
        return null;
    }
}

export async function login(email, password) {
    const auth = getAuth();
    const cred = await signInWithEmailAndPassword(auth, email, password);
    return cred.user;
}

export async function logout() {
    const auth = getAuth();
    await signOut(auth);
}

export async function update(firstname, lastname) {
    const auth = getAuth();
    await updateProfile(auth.currentUser, {
        displayName: `${firstname} ${lastname}`, 
    });
}