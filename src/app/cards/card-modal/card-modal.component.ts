import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Card} from "../../models/card";
import {CardService} from "../../service/card.service";

@Component({
  selector: 'app-card-modal',
  templateUrl: './card-modal.component.html',
  styleUrls: ['./card-modal.component.scss']
})
export class CardModalComponent implements OnInit {

  cardForm : FormGroup;

  constructor(
    private fb: FormBuilder,
    private cardService: CardService
  ) { }

  ngOnInit(): void {
    this.cardForm = this.fb.group({
      name:['', Validators.max(50)],
      title:['', [Validators.required, Validators.max(255)]],
      phone:['', [Validators.required, Validators.maxLength(20)]],
      email:['', [Validators.email, Validators.max(50)]],
      address:['', Validators.max(255)]
    });
  }

  addCard() {
    console.log(this.cardForm.value);
    this.cardService.addCard(this.cardForm.value)
      .subscribe((res:any) => {console.log(res)})

  }
}
