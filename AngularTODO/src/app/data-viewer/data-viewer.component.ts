import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

interface Item {
  id: number;
  firstName: string;
  lastName: string;
}

@Component({
  selector: 'app-data-viewer',
  template: `<button (click)="downloadJson()">Télécharger JSON</button>`
})
export class DataViewerComponent implements OnInit {

  data: any;

  constructor(private dataService: DataService) { }

ngOnInit() {
  this.dataService.getData().subscribe((response: any) => {
    this.data = response;
  });
}

objectKeys(item: Item) {
  return Object.keys(item);
}

  downloadJson() {
    const fileName = "data.json";
    const json = JSON.stringify(this.data);
    const blob = new Blob([json], { type: 'application/json' });
    const href = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = href;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(href);
  }
}