import { addDoc, collection, deleteDoc, doc, getDocs, query, serverTimestamp, where } from "firebase/firestore"
import { db } from "../firebase/config"

const RECORDS_COLLECTION = "records"

export async function addHealthRecord(userId, recordData){
    const docRef = await addDoc(collection(db, RECORDS_COLLECTION), {
        ...recordData,
        userId,
        createdAt: serverTimestamp(),
    })

    return docRef.id
}


export async function getUserRecords(userId){
    const q = query(
        collection,(db, RECORDS_COLLECTION),
        where("userId", "==", userId)
    )

    const querySnapshot = await getDocs(q)
    const records = querySnapshot.docs.map((document) => ({
        id: document.id,
        ...document.data()
    }))

    return records.sort((a,b) => new Date(b.date) - new Date(a.date))
}

export async function deleteHealthRecord(recordId){
    const docRef = doc(db, RECORDS_COLLECTION, recordId)
    await deleteDoc(docRef)
}


