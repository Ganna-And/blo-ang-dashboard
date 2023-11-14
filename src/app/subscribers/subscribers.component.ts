import { Component } from '@angular/core';
import { SubService } from '../services/sub.service';

@Component({
  selector: 'app-subscribers',
  templateUrl: './subscribers.component.html',
  styleUrls: ['./subscribers.component.css']
})
export class SubscribersComponent {

  subArray!: Array<any>;
  constructor(private subService: SubService){}


  ngOnInit(){
   this.loadSubscribers()
  }

  loadSubscribers(){
    this.subService.loadData().subscribe(val=>{
this.subArray = val
    })
  }

  onDelete(subId:string){
this.subService.subDelete(subId)
  }

}
