import { Artikl } from './../../../models/artikl';
import { ArtiklService } from './../../../services/artikl.service';
import { Component, OnInit, Inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-artikl-dialog',
  templateUrl: './artikl-dialog.component.html',
  styleUrls: ['./artikl-dialog.component.css']
})
export class ArtiklDialogComponent implements OnInit {
  public flag: number;
  constructor(public snackBar: MatSnackBar,
              public dialogRef: MatDialogRef<ArtiklDialogComponent>,
              @Inject (MAT_DIALOG_DATA) public data: Artikl,
              public artiklService: ArtiklService
  ) { }

  ngOnInit() {
  }

  public add(): void{
    this.artiklService.addArtikl(this.data);
    this.snackBar.open('Uspešno dodat artikl: ' + this.data.naziv, 'U redu', {
      duration: 2500
    });
  }

  public update(): void{
    this.artiklService.updateArtikl(this.data);
    this.snackBar.open('Uspešno modifikovan artikl: ' + this.data.naziv, 'U redu', {
      duration: 1500
    });
  }

  public delete(): void{
    console.log('brisem artikl sa id: ' + this.data.id);
    this.artiklService.deleteArtikl(this.data.id);
    this.snackBar.open('Uspešno obrisan artikl: ' + this.data.naziv, 'U redu', {
      duration: 1500
    });
  }

  public cancel(): void{
    this.dialogRef.close();
    this.snackBar.open('Odustali ste', 'U redu', {
      duration: 500
    });
  }
}
