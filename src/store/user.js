import { defineStore } from "pinia";
import {createUserWithEmailAndPassword, onAuthStateChanged, sendEmailVerification, signInWithEmailAndPassword, signOut} from 'firebase/auth'
import { auth } from "../firebaseConfig";
import router from "../router/router";
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
                 const {user}=await createUserWithEmailAndPassword(
                     auth,email,password
                 )
                 this.userData={email:user.email,uid:user.uid}
                 router.push("/")
            }catch(error){
                console.log(error)
                this.userData={}
            }finally{
                this.loadingUser=false
            }
        },
        async loginUser(email,password){
            this.loadingUser=true
            try{
                await signInWithEmailAndPassword(auth,email,password)
                await sendEmailVerification(auth.currentUser)
                 router.push("/login")
            }catch(error){
                console.log(error)
          
            }finally{
                this.loadingUser=false
            }
        },
        async logoutUser(){
            this.loadingUser=true
           try{ 
            await signOut(auth)
            this.userData=null
            router.push("/")
        }catch(error){
            console.log(error)
        }finally{
            this.loadingUser=false
        }
    },
    async currentUser(){
        return new Promise((resolve,reject)=>{
           const unsuscribe= onAuthStateChanged(auth,user=>{
            if(user){
                this.userData={email:user.email,uid:user.uid}
            }
            else{
                this.userData=null
            }
            resolve(user)
            },
            (e)=>reject(e)
            )
            unsuscribe()
        })
    }
}
})