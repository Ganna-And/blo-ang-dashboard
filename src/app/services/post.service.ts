import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Router } from '@angular/router';
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
  }else if(formStatus=='add new'){
  this.saveData(postData)}
})
 })
 }



 saveData(postData:any){
  this.afc.collection('post').add(postData).then(docRef=>{
    this.toastr.success('Data uploaded sucsesfully')
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

loadOneData(id:string){
return this.afc.doc(`post/${id}`).valueChanges();
}
 
updateData(id:string, postData:any){
this.afc.doc(`post/${id}`).update(postData).then(()=>{
  this.toastr.success('Data updated sucsessfuly!');
  this.router.navigate(['/posts'])
  
})
}
}
