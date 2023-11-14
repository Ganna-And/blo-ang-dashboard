import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Router } from '@angular/router';
import { error } from 'console';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private storage: AngularFireStorage,
     private afc: AngularFirestore,
     private toastr: ToastrService,
     private router: Router) { }


  onPostSubmit(selectedImage:string, postData:any, formStatus:string, docId:string){
const filePath =  `pathIMG/${Date.now()}`
 console.log(filePath);

 this.storage.upload(filePath, selectedImage).then(()=>{
  console.log('data uploaded sucsessfuly');

  this.storage.ref(filePath).getDownloadURL().subscribe(URL=>{
  postData.pathPostImg = URL;
  console.log(postData);

  if(formStatus=='edit'){
  this.updateData(docId,postData);
  }else {
  this.saveData(postData)}
})
 })
 }



 saveData(postData:any){
  this.afc.collection('post').add(postData).then(docRef=>{
    this.toastr.success('Data uploaded sucsesfully');
    this.router.navigate(['/posts'])
  })
 }

 loadData(){
  return this.afc.collection('post').snapshotChanges().pipe(map(actions=>{
    return actions.map(a=>{
      const data = a.payload.doc.data();
      const id = a.payload.doc.id
      return{id, data}
    })
  }))
}

loadOneData(id:any){
return this.afc.doc(`post/${id}`).valueChanges();
}
 
updateData(id:any, postData:any){
this.afc.doc(`post/${id}`).update(postData).then(()=>{
  this.toastr.success('Data updated sucsessfuly!');
  this.router.navigate(['/posts']) 
})
}

deleteImg(img:any, id:string){
  this.storage.storage.refFromURL(img).delete().then(()=>{
   this.deleteData(id)
  }).catch(error=> this.toastr.error(`${error.message}`)
  )
}

deleteData(id:string){
  this.afc.doc(`post/${id}`).delete().then(()=>{
    this.toastr.warning('Post is removed')
  })
}

updateFeturedStatus(id:string, featuredData:any){

  this.afc.doc(`post/${id}`).update(featuredData).then(()=>{
    this.toastr.info('Fetured status updated')
  })
}
}
