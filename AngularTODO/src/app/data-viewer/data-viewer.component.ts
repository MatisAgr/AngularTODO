import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

interface Item {
  id: number;
  firstName: string;
  lastName: string;
}

@Component({
  selector: 'app-data-viewer',
  template: `
    <div *ngIf="data">
      <pre>{{ data | json }}</pre>
      <button (click)="downloadJson()">Télécharger JSON</button>

      <table class="table">
        <thead>
          <tr>
            <th scope="col">Clé</th>
            <th scope="col">Valeur</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let key of objectKeys(data)">
            <td>{{ key }}</td>
            <td>{{ data[key] }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  `
})
export class DataViewerComponent implements OnInit {

  data: any;

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.dataService.getData().subscribe((response: any) => {
      this.data = response;
    });
  }

  objectKeys(item: any) {
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