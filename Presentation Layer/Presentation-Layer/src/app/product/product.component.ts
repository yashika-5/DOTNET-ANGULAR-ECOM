import { ShoppingCartService } from './../shared/shopping-cart.service';
import { Products, Category } from './../shared/order.model';
import { CategoryService } from './../shared/category.service';
import { ProductsService } from './../shared/products.service';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { FormBuilder, Validators } from '@angular/forms';  
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  addForm: FormGroup;
  updateForm: FormGroup;
  imageUrl: any;
  newImageUrl: any;
  allProducts: Observable<Products[]>;
  allCategories: Observable<Category[]>;
  constructor(private productService:ProductsService, private categoryService: CategoryService, 
   ) { 
    this.addForm = new FormGroup({
      productId: new FormControl(null),
      productName: new FormControl(null),
      categoryId: new FormControl(null),
      price: new FormControl(null),
      description: new FormControl(null),
      imagePath: new FormControl(null)
    });
    this.updateForm = new FormGroup({
      newProductId: new FormControl(null),
      newProductName: new FormControl(null),
      newCategoryId: new FormControl(null),
      newPrice: new FormControl(null),
      newDescription: new FormControl(null),
      newImagePath: new FormControl(null)
    });
  }

  ngOnInit() {
    this.loadData();
  }

  loadData(){
    this.allProducts = this.productService.getProducts();
    this.allCategories = this.categoryService.getCategory();
  }

  //file uplaod change event method
  //for add product
  onUpload(event){
    if(event.target.files.length > 0) 
    {
      this.imageUrl = "assets/images/" + event.target.files[0].name;
    }
  }

  //for update product
  onUploadNew(event){
    if(event.target.files.length > 0) 
    {
      this.newImageUrl = "assets/images/" + event.target.files[0].name;
    }
  }

  addProduct(){
    let newProduct = new Products();
    newProduct.productId = this.addForm.value.productId;
    newProduct.productName = this.addForm.value.productName;
    newProduct.categoryId = this.addForm.value.categoryId;
    newProduct.price = this.addForm.value.price;
    newProduct.description = this.addForm.value.description;
    newProduct.imageUrl = this.imageUrl;

    //service call to add product
    this.productService.addProduct(newProduct).subscribe(
      (response) =>{
      alert("Product Details Added Successfully!!");
      this.loadData();
      },
      (error:any) =>{
        console.log(error);
        alert("Product Id already exists!!please fill correct id!");
      }
    );

    this.addForm.reset();
  }

  //service call to search product
  searchProduct(productId: number){
    
    this.productService.getProductById(productId).subscribe(
      (product) =>{
      this.updateForm.get("newProductId").setValue(product.productId);
      this.updateForm.get("newProductName").setValue(product.productName);
      this.updateForm.get("newCategoryId").setValue(product.categoryId);
      this.updateForm.get("newPrice").setValue(product.price);
      this.updateForm.get("newDescription").setValue(product.description);
      
      },
      (error) =>{
        console.log(error);
        alert("No such product id found!");
      }
    );
  }

  updateProduct(){
    //service call to update product
    this.productService.getProductById(this.updateForm.get("newProductId").value).subscribe(
      (product) =>{
      product.productName = this.updateForm.get("newProductName").value;
      product.categoryId = this.updateForm.get("newCategoryId").value;
      product.price = this.updateForm.get("newPrice").value;
      product.description = this.updateForm.get("newDescription").value;
      product.imageUrl = this.newImageUrl;

      this.productService.updateProduct(product).subscribe(
        (response) =>{
          this.loadData();
          alert("Product Details Updated Successfully!!");
          this.updateForm.reset();
        },
        (error) =>{
          console.log(error);
          alert("Product details cannot be updated!Please try again.");
        }
      );
    },
    (error) =>{
      console.log(error);
      alert("No such product id found!!");
    }
    );  
  }

  //service call to delete product
  deleteProduct(productId: number){
    if (confirm("Are you sure you want to delete this ?")) {
      this.productService.deleteProduct(productId).subscribe(
        (response) =>{
          this.loadData();
          alert(response);
        },
        (error) =>{
          alert(error);
        }
      
      );
    }
    
  }
}
