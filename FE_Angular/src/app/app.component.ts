import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApplicationConfigService } from 'src/config/application-config.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private http: HttpClient, private applicationService: ApplicationConfigService) {}
  title = 'Angular Ft Nestjs ';
  apiUrl = this.applicationService.API_URL + 'api/products'

  ngOnInit(): void {
    this.http.get(this.apiUrl).subscribe(data => console.log(data))
  }
}
