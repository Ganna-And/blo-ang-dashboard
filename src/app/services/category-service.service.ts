import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class CategoryServiceService {

  constructor(private afs:AngularFirestore, private toastr: ToastrService) { }

  onSave(data:any){
    this.afs.collection('categories').add(data).then(docRef=> this.toastr.success('Data inserted sucsessfully')).catch(error=>console.log(error));
  }
loadData(){
  return this.afs.collection('categories').snapshotChanges().pipe(map(actions=>{
    return actions.map(a=>{
      const data = a.payload.doc.data();
      const id = a.payload.doc.id
      return{id, data}
    })
  }))
}

updateData(id?:string, categoryData?:any){
this.afs.doc(`categories/${id}`).update(categoryData).then(docRef=> console.log(docRef));
this.toastr.success('Data uptdated sucsessfuly!')

}

deleteData(id?:string){
  this.afs.doc(`categories/${id}`).delete();
  this.toastr.success('Data sucsessfuly removed')
}

}
