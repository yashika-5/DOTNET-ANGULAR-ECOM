import { FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  
  isSelect : boolean;
  constructor(private router:Router) { }

  ngOnInit(): void {
    
  }

  // funtion to proceed with the choosed select option
  proceed(value){
    console.log(value)
    this.router.navigateByUrl('/'+value)
  }

}

