import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-all-post',
  templateUrl: './all-post.component.html',
  styleUrls: ['./all-post.component.css']
})
export class AllPostComponent  {

  postArray?: Array<any> ;

  constructor(private postService: PostService){
  
  }


  
  ngOnInit(){
    this.postService.loadData().subscribe(val=>{
      console.log(val)
      this.postArray=val
    })
  }

  onDelete(imgPost:string, id:string ){
this.postService.deleteImg(imgPost,id)
  }

  onFeatured(id:any, value:any){
const featuredData={
  isFeatured: value
}

this.postService.updateFeturedStatus(id,featuredData)
  }
}
