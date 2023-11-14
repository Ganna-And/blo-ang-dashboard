import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class SubService {

  constructor(private afc: AngularFirestore, private toastr: ToastrService) { }

  loadData(){
    return this.afc.collection('subscriptions').snapshotChanges().pipe(map(actions=>{
      return actions.map(a=>{
        const data = a.payload.doc.data();
        const id = a.payload.doc.id
        return{id, data}
      })
    }))
  }

  subDelete(id:string){
this.afc.doc(`subscriptions/${id}`).delete().then(()=>{
  this.toastr.success('Subscriber deleted from the list')
})
  }
}
