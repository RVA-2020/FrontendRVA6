import { Component, OnInit, Inject } from '@angular/core';
import { Artikl } from 'src/app/models/artikl';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { StavkaPorudzbine } from 'src/app/models/stavkaPorudzbine';
import { StavkaPorudzbineService } from 'src/app/services/stavka-porudzbine.service';
import { ArtiklService } from 'src/app/services/artikl.service';

@Component({
  selector: 'app-stavka-porudzbine-dialog',
  templateUrl: './stavka-porudzbine-dialog.component.html',
  styleUrls: ['./stavka-porudzbine-dialog.component.css']
})
export class StavkaPorudzbineDialogComponent implements OnInit {
  artikli: Artikl[];
  public flag: Number;

  constructor(public snackBar: MatSnackBar,
              public dialogRef: MatDialogRef<StavkaPorudzbineDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: StavkaPorudzbine,
              public stavkaPorudzbineService: StavkaPorudzbineService,
              public artiklService: ArtiklService
  ) { }


  ngOnInit() {
    this.artiklService.getAllArtikl().subscribe(artikli =>
      this.artikli = artikli
    );
  }

  public add(): void {
    this.data.id = -1;
    this.stavkaPorudzbineService.addStavkaPorudzbine(this.data);
    this.snackBar.open('Uspešno dodata stavka porudžbine', 'U redu', { duration: 2500 });
  }

  public update(): void {
    this.stavkaPorudzbineService.updateStavkaPorudzbine(this.data);
    this.snackBar.open('Uspešno modifikovana stavka porudžbine', 'U redu', { duration: 2500 });
  }

  public delete(): void {
    this.stavkaPorudzbineService.deleteStavkaPorudzbine(this.data.id);
    this.snackBar.open('Uspešno obrisana stavka porudžbine', 'U redu', { duration: 2000 });
  }

  public cancel(): void {
    this.dialogRef.close();
    this.snackBar.open('Odustali ste', 'U redu', { duration: 1000 });
  }

  compareTo(a, b) {
    return a.id === b.id;
  }
}
