import { defineStore } from "pinia";
import {createUserWithEmailAndPassword, onAuthStateChanged, sendEmailVerification, signInWithEmailAndPassword, signOut, updateProfile,GoogleAuthProvider, signInWithPopup,sendPasswordResetEmail} from 'firebase/auth'
import { auth, db, storage } from "../firebaseConfig";
import router from "../router/router";
import { useDataBaseStore } from "./database";
import { getDoc,doc, setDoc } from "firebase/firestore/lite";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";


export const useUserStore=defineStore("user",{
    state:()=>({
        userData:null,
        loadingUser:false,
        loadingSession:false
    }),
    actions:{
        async registerUser(email,password){
            this.loadingUser=true
            try{
                 await createUserWithEmailAndPassword(
                     auth,email,password
                 )
                 await sendEmailVerification(auth.currentUser)
                 router.push("/login")
            }catch(error){
                return error.code
            }finally{
                this.loadingUser=false
            }
        },
        async loginUser(email,password){
            this.loadingUser=true
            try{
                const { user }= await signInWithEmailAndPassword(auth,email,password)
                await this.setUser(user)
                 router.push("/")
            }catch(error){
          console.log(error.code)
          
            }finally{
                this.loadingUser=false
            }
        },
        async singInWithGoogle(){
            try{
                this.loadingUser=true
                const googleProvider = new GoogleAuthProvider();
                await signInWithPopup(auth, googleProvider)
                 
            }
            catch(error){
                return error.code
            }
            finally{
                 this.loadingUser=false
            }
        },
        async resetPass(email){
            this.loadingUser=true
            try{
                await sendPasswordResetEmail(auth, email)
                
            }
            catch(error){
return error.code
            }
            finally{
              this.loadingUser=false
            }
        },
        async logoutUser(){
            this.loadingUser=true
            const database=useDataBaseStore()
           try{ 
            router.push("/")
            await signOut(auth)
      
        }catch(error){
            console.log(error)
        }finally{
            this.loadingUser=false
            this.userData=null,
            database.$reset()
        }
    },
    async setUser(user){
        try{
              const docref=doc(db,'users',user.uid)
              
              this.userData = {
                email: user.email,
                uid: user.uid,
                displayName: user.displayName,
                photoURL: user.photoURL,
            }
             await setDoc(docref,this.userData)

              
        }catch(error){
                console.log(error)
        }
    },
    async currentUser(){
        const database=useDataBaseStore()
        return new Promise((resolve,reject)=>{
           const unsuscribe= onAuthStateChanged(auth,async(user)=>{
            if(user){
               this.userData= {
                email: user.email,
                uid: user.uid,
                displayName: user.displayName,
                photoURL: user.photoURL,
            }
               console.log(user)
            }
            else{
                this.userData=null
                database.$reset()
            }
            resolve(user)
            },
            (e)=>reject(e)
            )
            unsuscribe()
        })
    },
    async upDateUser(displayName,img){
        this.loadingUser=true
        try{
          await updateProfile(auth.currentUser,{
            displayName,
        })

        if(img){
            const storageRef=ref(storage,`profiles/${this.userData.uid}`)
            await uploadBytes(storageRef,img.originFileObj)
            const photoURL=await getDownloadURL(storageRef)
            await updateProfile(auth.currentUser,{
                photoURL
            })
        }
        this.setUser(auth.currentUser)
        }catch(error){
        return error.code
        }finally {
            this.loadingUser=false
        }
    }
}
})