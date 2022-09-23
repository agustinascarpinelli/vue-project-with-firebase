import { collection, getDocs, query } from "firebase/firestore/lite";
import { defineStore } from "pinia";
import { db } from "../firebaseConfig";

export const useDataBaseStore=defineStore('database', {
    state:()=>({
        documents:[],
        loading:false,
        loadingDocs:false,
    }),
    actions:{
        async getUrls(){
            try{
const q=query(collection(db, 'urls'),
where())
const querySnapshot=await getDocs(q)
querySnapshot.forEach((doc)=>{
    this.documents.push({
        id:doc.id,
        ...doc.data()
    })
})
            }
            catch(error){
                console.log(error)
            }
            finally{

            }
        }
    }
})