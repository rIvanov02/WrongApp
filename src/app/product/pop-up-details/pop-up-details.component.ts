import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Product } from 'src/app/types/product';
import { ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-pop-up-details',
  templateUrl: './pop-up-details.component.html',
  styleUrls: ['./pop-up-details.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PopUpDetailsComponent implements OnInit{
[x: string]: any;

  product: Product | undefined;
  selectedIndex = 0;
  indicators = true;
  controls = true;

  constructor(@Inject(MAT_DIALOG_DATA) public data: Product , public dialogRef: MatDialogRef<PopUpDetailsComponent>) { 
    this.product = data
  }


  close() { 
    this.dialogRef.close()
  }

  onPrevClick() { 
    if (this.selectedIndex === 0) {
      this.selectedIndex = this.product!['img']!.length - 1;
    } else { 
      this.selectedIndex--;
    }
    
  }

  onNextClick() {
    if (this.selectedIndex === this.product!['img']!.length - 1) {
      this.selectedIndex = 0
    } else { 
      this.selectedIndex++;
    }
  }


  ngOnInit(): void {
    
  }
}
