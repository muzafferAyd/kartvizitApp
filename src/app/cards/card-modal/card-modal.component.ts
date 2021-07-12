import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Card} from "../../models/card";
import {CardService} from "../../service/card.service";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar';

@Component({
  selector: 'app-card-modal',
  templateUrl: './card-modal.component.html',
  styleUrls: ['./card-modal.component.scss']
})
export class CardModalComponent implements OnInit {

  cardForm: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<CardModalComponent>,
    private fb: FormBuilder,
    private cardService: CardService,
    private _snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: Card
  ) {
  }

  ngOnInit(): void {
    console.log(this.data)
    this.cardForm = this.fb.group({
      name: [this.data?.name || '', Validators.max(50)],
      title: [this.data?.title || '', [Validators.required, Validators.max(255)]],
      phone: [this.data?.phone || '', [Validators.required, Validators.maxLength(20)]],
      email: [this.data?.email || '', [Validators.email, Validators.max(50)]],
      address: [this.data?.address || '', Validators.max(255)],

    });
  }

  addCard() {
    console.log(this.cardForm.value);
    this.cardService.addCard(this.cardForm.value)
      .subscribe((res: any) => {
        console.log(res);

        this._snackBar.open(res || 'KartVizit Başarıyla Eklendi', '', {
          duration: 4000,
        });
        this.cardService.getCards();
        this.dialogRef.close()

      });


  }


  updateCard(): void {
    this.cardService.updateCard(this.cardForm.value, this.data.id)
      .subscribe((res: any) => {
        console.log(res)

        this._snackBar.open(res || 'KartVizit Başarıyla Güncellendi', '', {
          duration: 4000,
        });
        this.cardService.getCards()
        this.dialogRef.close()
      })
  }

  deleteCard () {
    this.cardService.deleteCard(this.data.id)
      .subscribe((res:any) =>{
        this._snackBar.open(res || 'KartVizit Başarıyla Silindi', '', {
          duration: 4000,
        });
      })

    this.cardService.getCards()
    this.dialogRef.close()
  }

}
