import { defineStore } from "pinia";
import {createUserWithaEmailAndPassword} from 'firebase/auth'
import { auth } from "../firebaseConfig";
import router from "../router/router";
export const useUserStore=defineStore("user",{
    state:()=>({
        userData:null,
    }),
    actions:{
        async registerUser(email,password){
            try{
                 const {user}=await createUserWithaEmailAndPassword(
                     auth,email,password
                 )
                 this.userData={email:user.email,uid:user.uid}
                 router.push("/")
            }catch(error){
                console.log(error)
            }
        }
    }
    
})