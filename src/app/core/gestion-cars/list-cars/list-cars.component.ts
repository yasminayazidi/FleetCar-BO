import { Component } from '@angular/core';
import { CarService } from '../car.service';
import { Car } from '../car';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
@Component({
  selector: 'app-list-cars',
  templateUrl: './list-cars.component.html',
  styleUrls: ['./list-cars.component.scss'],
  providers: [MessageService, ConfirmationService]
})
export class ListCarsComponent {
  cars :Car[]=[];
  selectedcars:Car[]=[];
  cols: any[] = [];
  car:Car ={};
  carDialog: boolean = false;
  deleteCarDialog: boolean = false;
  deleteCarsDialog: boolean = false;
  submitted :boolean=false;
  statuses: any[] = [];
  rowsPerPageOptions = [5, 10, 20];
  constructor(private carService: CarService, private messageService: MessageService, private confirmationService: ConfirmationService){}
  ngOnInit(){
    this.cols = [
      { field: 'brand', header: 'Brand' },
      { field: 'model', header: 'model' },
      { field: 'model', header: 'model' },
      { field: 'year', header: 'year' },
      { field: 'seats', header: 'seats' }
  ];
 
    this.getAllCars();
  }
  getAllCars(){
    this.carService.getCars().subscribe(
      (      data: Car[])=> {this.cars = data
      }
    )
  }
  ngOnDestroy() {
    
  }
  openNew(){
      this.car = {};
        this.submitted = false;
        this.carDialog = true;
  }
  deleteSelectedcars(){
    this.deleteCarsDialog = true;

  }
  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
}
  deletecar(car : Car){
    this.deleteCarDialog = true;
        this.car = { ...car };
  }
  editcar(car : Car){
    this.car = { ...car };
        this.carDialog = true;

  }
  savecar(){
    this.submitted = true;

        if (this.car.brand?.trim()) {
            if (this.car.id) {
                // @ts-ignore
               // this.car.inventoryStatus = this.car.inventoryStatus.value ? this.car.inventoryStatus.value : this.car.inventoryStatus;
               // this.cars[this.findIndexById(this.car.id)] = this.car;
               this.car.entrepriseId =1;
               this.carService.saveCar(this.car).subscribe();
                this.getAllCars()
                this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'car Updated', life: 3000 });
            } else {
                // this.car.id = this.createId();
                // this.car.code = this.createId();
                this.car.imageUrl = 'car-placeholder.svg';
                this.car.entrepriseId =1;
                // @ts-ignore
               // this.car.inventoryStatus = this.car.inventoryStatus ? this.car.inventoryStatus.value : 'INSTOCK';
                this.carService.saveCar(this.car).subscribe();
                this.getAllCars()
                // this.cars.push(this.car);
                this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'car Created', life: 3000 });
            }

            this.cars = [...this.cars];
            this.carDialog = false;
            this.car = {};
        }
  }

  findIndexById(id: number): number {
    let index = -1;
    for (let i = 0; i < this.cars.length; i++) {
        if (this.cars[i].id === id) {
            index = i;
            break;
        }
    }

    return index;
}
createId(): number {
  let id = 2;
  // const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  // for (let i = 0; i < 5; i++) {
  //     id += chars.charAt(Math.floor(Math.random() * chars.length));
  // }

  return id;
}
  hideDialog(){
    this.carDialog = false;
        this.submitted = false;
  }
  confirmDelete(){
    this.deleteCarDialog = false;
    this.cars = this.cars.filter(val => val.id !== this.car.id);
    this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'car Deleted', life: 3000 });
    this.car = {};
  }
  confirmDeleteSelected(){
        this.deleteCarsDialog = false;
        this.cars = this.cars.filter(val => !this.selectedcars.includes(val));
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'cars Deleted', life: 3000 });
        this.selectedcars = [];
  }
}
