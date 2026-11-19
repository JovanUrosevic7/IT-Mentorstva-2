import { addDoc, collection, deleteDoc, doc, getDocs, query, serverTimestamp, where } from "firebase/firestore";
import { db } from "../firebase/config";

const METRICS_COLLECTION = "healthMetrics";


export async function addHealthMetric(userId, metricData){

    const docRef = await addDoc(collection(db, METRICS_COLLECTION),{
        ...metricData,
        userId,
        createdAp: serverTimestamp()
    })

    return docRef.id

}

export async function getUserMetrics(userId){

    const q = query(
        collection(db, METRICS_COLLECTION),
        where("userId", "==", userId)
    )

    const querySnapshot = await getDocs(q)
    const metrics = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
    }))

    return metrics.sort((a,b) => new Date(a.date) - new Date(b.date))

}

export async function deleteHealthMetric(metricId){
    const docRef = doc(db, METRICS_COLLECTION, metricId)
    await deleteDoc(docRef)
}





