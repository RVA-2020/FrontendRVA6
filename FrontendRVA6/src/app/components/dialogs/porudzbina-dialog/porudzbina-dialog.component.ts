import { Component, OnInit, Inject } from '@angular/core';
import { Dobavljac } from 'src/app/models/dobavljac';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Porudzbina } from 'src/app/models/porudzbina';
import { PorudzbinaService } from 'src/app/services/porudzbina.service';
import { DobavljacService } from 'src/app/services/dobavljac.service';

@Component({
  selector: 'app-porudzbina-dialog',
  templateUrl: './porudzbina-dialog.component.html',
  styleUrls: ['./porudzbina-dialog.component.css']
})
export class PorudzbinaDialogComponent implements OnInit {
  dobavljaci: Dobavljac[];
  public flag: number;

  constructor(public snackBar: MatSnackBar,
              public dialogRef: MatDialogRef<PorudzbinaDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: Porudzbina,
              public porudzbinaService: PorudzbinaService,
              public dobavljacService: DobavljacService
  ) { }

  ngOnInit() {
    this.dobavljacService.getAllDobavljac().subscribe(dobavljaci =>
      this.dobavljaci = dobavljaci
    );
  }
  compareTo(a, b) {
    return a.id == b.id;
  }

  public add(): void {
    this.data.id = -1;
    this.porudzbinaService.addPorudzbina(this.data);
    this.snackBar.open('Uspešno dodata porudžbina', 'U redu', { duration: 1500 });
  }

  public update(): void {
    this.porudzbinaService.updatePorudzbina(this.data);
    this.snackBar.open('Uspešno modifikovana porudžbina', 'U redu', { duration: 1500 });
  }

  public delete(): void {
    this.porudzbinaService.deletePorudzbina(this.data.id);
    this.snackBar.open('Uspešno obrisana porudžbina', 'U redu', { duration: 1500 });
  }

  public cancel(): void {
    this.dialogRef.close();
    this.snackBar.open('Odustali ste', 'U redu', { duration: 500 });
  }
}
