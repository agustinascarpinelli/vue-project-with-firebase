import {  collection, deleteDoc, getDoc, getDocs, query, updateDoc ,where,doc, setDoc} from "firebase/firestore/lite";
import { defineStore } from "pinia";
import { auth, db } from "../firebaseConfig";
import {nanoid} from 'nanoid'
import router from "../router/router";
export const useDataBaseStore=defineStore('database', {
    state:()=>({
        documents:[],
        loading:false,
        loadingDocs:false,
        loadingDoc:false,
        loadingDel:false,
    }),
    actions:{
        async getURL(id) {
            try {
                const docRef = doc(db, "urls", id);
                const docSnap = await getDoc(docRef);

                if (!docSnap.exists()) {
                    return false;
                }

                return docSnap.data().name;
            } catch (error) {
                console.log(error.message);
                return false;
            } finally {
            }
        },
        async getUrls(){
            if (this.documents.length!==0){
                return
            }
            this.loading=true
            this.documents=[]
            const q=query(collection(db, 'urls'),
where("user","==",auth.currentUser.uid))
            try{
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
                this.loading=false

            }
        },
        async addUrl(name){
            this.loadingDel=true
            try{
                const docObj={
                    name:name,
                    short:nanoid(5),
                    user:auth.currentUser.uid
                }
                await setDoc(doc(db,'urls',docObj.short),docObj)
                this.documents.push({
                    ...docObj,
                    id:docObj.short
                })
            }catch(error){
                console.log(error)
            }finally{
                this.loadingDel=false
            }
                },
        async deleteUrl(id){
            this.loadingDoc=true
            try{
                const docref=doc(db,'urls',id)
                const docSnap=await getDoc(docref)
                if(!docSnap.exists()){
                    throw new Error("The doc does not exists")
                }
                if (docSnap.data().user !== auth.currentUser.uid) {
                    throw new Error("no le pertenece ese documento");
                }

                await deleteDoc(docref);
                this.documents = this.documents.filter(
                    (item) => item.id !== id
                );
            }
            catch(error){
                console.log(error.message)
            }finally{
                this.loadingDoc=false
            }
        },
        async readDoc(id){
            this.loadingDocs=true
            try{
                const docref=doc(db,'urls',id)
                const docSnap=await getDoc(docref)
            if (!docSnap.exists()){
                throw new Error("The doc does not exits")
            }
            if(docSnap.data().user===auth.currentUser.uid){
                return docSnap.data().name
            }else{
                throw new Error("Not authorized")
            }
            }catch(error){
                console.log(error.message)
            }finally{
                this.loadingDocs=false
            }
        },
        async updateUrl(id,name){
            this.loading=true
            try{
                const docref=doc(db,'urls',id)
                const docSnap=await getDoc(docref)

                if(!docSnap.exists()){
                    throw new Error ("The document does not exits")
                }
                if(docSnap.data().user===auth.currentUser.uid){
                    await updateDoc(docref,{
                        name:name,
                    })
                    this.documents = this.documents.map((item) =>
                    item.id === id ? { ...item, name: name } : item
                );
                router.push("/");

                }else{
                    throw new Error ("Not authorized")
                        
                    }
                }catch(error){
                    console.log(error.message)
                }finally{
                    this.loading=false
                }
            }
        }

    
})