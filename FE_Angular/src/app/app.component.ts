import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApplicationConfigService } from 'src/config/application-config.service';
import { AppService } from './service/app.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private appService: AppService) {}
  
  title = 'Angular Ft Nestjs ';
 

  async ngOnInit() {
   await this.getAll();
   await this.getById();
  }

  async getAll() {
    await firstValueFrom(this.appService.getAllProduct())
  }

  async getById() {
    await firstValueFrom(this.appService.getById(1))
  }

  async createProduct() {
    const product = {
      id: 2,
      category: 2,
      productName: "Mouse",
      price: 100000
  }
    await firstValueFrom(this.appService.createProduct(product))
  }

  async updateProduct() {
    const product = {
      id: 1,
      category: 1,
      productName: "Ahihi",
      price: 80000
  }
    await firstValueFrom(this.appService.updateProduct(1, product))
  }

  async deleteProduct() {
    await firstValueFrom(this.appService.deleteProduct(2))
  }
}
