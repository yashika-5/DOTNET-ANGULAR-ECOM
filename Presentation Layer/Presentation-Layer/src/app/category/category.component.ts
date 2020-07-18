import { Category } from './../shared/order.model';
import { CategoryService } from './../shared/category.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  public categories: Category[];
  categoryForm: FormGroup;
  message = null;
  isSubmitted = false;
  isEdit = false;
  index: number;
  allCategory: Observable<Category[]>

  constructor(private categoryService: CategoryService) {
    this.categories = [];
  }

  ngOnInit(): void {
    this.getCategory();
    this.initialise();
  }

  //Category form initialised
  initialise() {
    this.categoryForm = new FormGroup({
      CategoryID: new FormControl('', [Validators.required,]),
      CategoryName: new FormControl('', [Validators.required,
      Validators.maxLength(50),
      Validators.pattern('^[a-zA-Z ]*$')])
    });
  }

  //Get all the category
  getCategory() {
    this.categoryService.getCategory()
      .subscribe(categories => {
        categories.forEach(category => {
          // console.log(category);
          this.categories.push(category);
        });
      });
  }
  // Add Category
  onAddClick() {
    this.categoryForm.markAllAsTouched();
    if (this.categoryForm.valid == true) {
     // console.log(this.categoryForm.value.CategoryID);
      var category = new Category(this.categoryForm.value.CategoryID, this.categoryForm.value.CategoryName);
      this.categoryService.postCategory(category)
        .subscribe(
          (response) => {
            console.log(response);
            this.categories.push(category);
            alert("Category added successfully");
          },
          (error : any) => {
            console.log(error);
            alert("Id exists!!Please Enter correct Id!");
          });
      this.categoryForm.reset();
    }
  }
  // Update category
  onUpdateClick() {
    this.categoryForm.markAllAsTouched();
    this.isEdit = false;
    if (this.categoryForm.valid == true) {

      console.log(this.categoryForm.value)
      console.log(this.categoryForm.value.CategoryID);
      var category = new Category(this.categoryForm.value.CategoryID, this.categoryForm.value.CategoryName);
      this.categoryService.putCategory(category)
        .subscribe(
          (response) => {
            console.log(response);
            this.categories.splice(this.index, 0, response)
            alert("Category updated successfully");
          },
          (error) => {
            console.log(error);
          });
      this.categoryForm.reset();
    }
  }

  // Edit Category
  onEditClick(category) {
    const index = this.categories.indexOf(category);
    this.index = index;
    this.categories.splice(index, 1);
    this.isEdit = true;
    this.categoryForm.controls['CategoryID'].setValue(category.categoryId)
    this.categoryForm.controls['CategoryName'].setValue(category.categoryName)
  }

  //Delete Category
  onRemoveClick(category) {
    if (confirm("Do you want to delete " + category.categoryName + " ?")) {
      // console.log(category)
      const index = this.categories.indexOf(category)
      this.categories.splice(index, 1);
      this.categoryService.deleteCategory(category.categoryId)
        .subscribe((response) => {
          console.log(response);
          alert("Category deleted successfully");
        })
    }
  }
}
