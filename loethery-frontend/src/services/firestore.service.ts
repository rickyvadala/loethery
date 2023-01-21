import {db} from "../../firebase";
import {doc, getDoc, setDoc, arrayUnion} from "firebase/firestore";

export const fetchLotteries = async (account) => {
    try {
        const docRef = doc(db, "users", account);
        const docSnap = await getDoc(docRef);
        return docSnap.exists() ? docSnap.data().lotteries : []
    } catch (e) {
        throw new Error(e)
    }

};

export const addLottery = async (account, address) => {
    const docRef = doc(db, "users", account);
    return await setDoc(docRef, { lotteries: arrayUnion(address) }, {merge: true});
};


