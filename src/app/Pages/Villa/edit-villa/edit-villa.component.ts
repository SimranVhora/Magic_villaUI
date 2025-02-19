import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-villa',
  imports: [],
  templateUrl: './edit-villa.component.html',
  standalone:true,
  styleUrl: './edit-villa.component.css'
})
export class EditVillaComponent implements OnInit {
  villaId!: number;
  constructor(private router:ActivatedRoute){

  }
  ngOnInit(){
    this.villaId = parseInt(atob(this.router.snapshot.paramMap.get('id') || "0"));
    console.log(this.villaId);
  }
}
