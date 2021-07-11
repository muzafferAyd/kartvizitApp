import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { config } from 'rxjs';
import { CardModalComponent } from './card-modal/card-modal.component';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss']
})
export class CardsComponent implements OnInit {

cardItem = {
  title: 'Frontend Developer',
  name: 'Muzaffer AYDOĞDU',
  phone:'5427777777',
  email : 'ay@gmail.com',
  address : 'Osmangazi Bursa'
}


  constructor(
    public dialog : MatDialog
  ) { }

  ngOnInit(): void {
  }

  openAddCardModal() {
    this.dialog.open(CardModalComponent,{width:"400px"})

  }

}
