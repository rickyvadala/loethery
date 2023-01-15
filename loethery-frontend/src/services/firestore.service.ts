import {db} from "../../firebase";
import {doc, getDoc} from "firebase/firestore";

export const getLotteries = async (account) => {
    const docRef = doc(db, "users", account);
    const docSnap = await getDoc(docRef);
    return docSnap.data()
};
