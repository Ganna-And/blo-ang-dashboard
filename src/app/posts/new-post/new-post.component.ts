import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Post } from 'src/app/models/post';
import { CategoryServiceService } from 'src/app/services/category-service.service';
import { PostService } from 'src/app/services/post.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.css']
})
export class NewPostComponent  {

imgSrc:any='./assets/placeholder-image.jpg';
permalink:string ='';
selectedImage:any;
categories?:Array<any>;
post: any;
postForm!: FormGroup;
formStatus: string ='add new';
docId:string=''


 constructor(private categoryService: CategoryServiceService, 
  private fc:FormBuilder, private postService:PostService,
  private route: ActivatedRoute){
 this.categoryService.loadData().subscribe(val=>{
      this.categories = val
    });
this.route.queryParams.subscribe(val=>{
  this.docId = val['id'];
  this.postService.loadOneData(val['id']).subscribe(post=>{
    this.post = post;
    console.log(post)
    this.postForm = this.fc.group({
  title:[this.post.title, [Validators.required, Validators.minLength(6)]],
  permalink:[this.post.permalink, Validators.required],
  excerpt:[this.post.excerpt, [Validators.required,Validators.minLength(30)]],
  category:[`${this.post.category.categoryId}-${this.post.category.category}`, Validators.required],
  content:[this.post.content,Validators.required],
    })
    this.imgSrc = this.post.pathPostImg
    this.formStatus='edit'
  })
  
})



this.postForm =this.fc.group({
  title:['', [Validators.required, Validators.minLength(6)]],
  permalink:['', Validators.required],
  excerpt:['', [Validators.required,Validators.minLength(30)]],
  category:['', Validators.required],
  imgSrc:['', Validators.required],
  content:['',Validators.required],
})

  }

  

 get f_c(){
  return this.postForm.controls
 }
  onTitleChange(event:any ){
const title = event.target.value;
this.permalink = title.replace(/\s/g,'-')
  }

 

  onImgPreview(event:any){

    const reader = new FileReader()

    reader.onload=(e)=>{
    this.imgSrc =e?.target?.result
    }

    reader.readAsDataURL(event.target.files[0])
    this.selectedImage = event.target.files[0]
  }

  onSubmit(){
    const splitted = this.postForm.value.category.split('-')
    const post: Post = {
title:this.postForm.value.title,
permalink:this.postForm.value.permalink,
excerpt:this.postForm.value.excerpt,
category:{
    categoryId: splitted[0],
    category:splitted[1]
},
content: this.postForm.value.content,
pathPostImg: '',
isFeatured: false,
views: 0,
status:'new',
createdAt: new Date
    }
    
    console.log(post);
    this.postService.onPostSubmit(this.selectedImage,post, this.formStatus,this.docId);
    this.postForm.reset()
    this.imgSrc = './assets/placeholder-image.jpg';
    
  }

  

}
