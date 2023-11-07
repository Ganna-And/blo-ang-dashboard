import { Component, OnInit } from '@angular/core';
import { CategoryServiceService } from '../services/category-service.service';
import { Category } from '../models/category';

CategoryServiceService

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit{

  categoryArray?:Array<any>;
  formCategory?: string;
  statusCategory: string ="add";
  categoryId?:string;

constructor(private categoryService: CategoryServiceService ){}

ngOnInit():void{
this.categoryService.loadData().subscribe(val=>{console.log(val);
 this.categoryArray = val})

}

onSubmit(formData:any){
  let categoryData:Category ={
    category: formData.value.category
  }
if(this.statusCategory == 'add'){
  this.categoryService.onSave(categoryData)
formData.reset()
} else if(this.statusCategory =='edit'){
  this.categoryService.updateData(this.categoryId,categoryData);
  formData.reset();
  this.statusCategory = 'add'
}
  
  
}


onEdit(category:string, id:string){
  this.formCategory = category;
  this.statusCategory = 'edit';
  this.categoryId = id
}
onDelete(categoryId:string){
  this.categoryService.deleteData(categoryId)
  
}
}
