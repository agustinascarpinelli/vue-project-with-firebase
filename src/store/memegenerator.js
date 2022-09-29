import { defineStore } from "pinia";
import { storage } from "../firebaseConfig";
import { useUserStore } from "./user";
import { ref , getDownloadURL, uploadBytes} from "firebase/storage";



export const useMemeGenerator=defineStore('memes',{
state:()=>({
    memeData:null,
    loadingMeme:false,
    loadingMemes:false,
    download:false,
    url:' https://memebuild.com/api/1.0/generateMeme?api-key=f360d09efe975416652af893a2419d',
    memes:[]
}),
actions:{
    async createMeme(topText,bottomText,img){
 this.loadingMeme=true
 
    try{
       const photo= await this.saveImg(img)
   
    const params = {
        topText: topText,
        bottomText: bottomText,
        imgUrl:photo
    };
    const options = {
        method: 'POST',
        body: JSON.stringify(params),
    };
    
 const response=  await fetch( this.url, options )
 if (response.status === 200) {
    let data = await response.json();
    this.memeData=data.url
    

}else {
    throw 'Error fetching users list'
}


 }
 catch(error){
    return error.code

 }finally{
    this.loadingMeme=false
    this.download=true
 }
},

async saveImg(img){
    try{
        const userStore=useUserStore()

    const storageRef=ref(storage,`images/${userStore.userData.uid}`)
    await uploadBytes(storageRef,img.originFileObj)
    const photoURL=await getDownloadURL(storageRef)
    return photoURL

    }catch(error){
console.log("Couldnt save img at local storage")
    }
    
},
async getMemes(){
    this.loadingMemes=true
    const url='https://memebuild.com/api/1.0/myRecentMemes?api-key=f360d09efe975416652af893a2419d'

    try{
const response=await fetch (url)
if (response.status === 200) {
    let data = await response.json();
this.memes=[...data]

console.log(this.memes)
    

}else {
    throw 'Error fetching users list'
}
    }
    catch(error){
return error.code
    }
    finally{
        this.loadingMemes=false
    }
}




}})