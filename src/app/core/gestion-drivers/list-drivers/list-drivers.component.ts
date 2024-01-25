import { Component } from '@angular/core';
import { Driver } from '../driver';
import { DriverService } from '../driver.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
@Component({
  selector: 'app-list-drivers',
  templateUrl: './list-drivers.component.html',
  styleUrls: ['./list-drivers.component.scss'],
  providers: [MessageService, ConfirmationService]
})
export class ListDriversComponent {
  drivers: Driver[] = [];
  selecteddrivers: Driver[] = [];
  cols: any[] = [];
  driver: Driver = {};
  driverDialog: boolean = false;
  deletedriverDialog: boolean = false;
  deletedriversDialog: boolean = false;
  submitted: boolean = false;
  statuses: any[] = [];
  rowsPerPageOptions = [5, 10, 20];
  constructor(private driverService: DriverService, private messageService: MessageService, private confirmationService: ConfirmationService) { }
  ngOnInit() {
    this.cols = [
      { field: 'name', header: 'name' },
      { field: 'mail', header: 'mail' },
      { field: 'phone', header: 'phone' },
      { field: 'address', header: 'address' },
      { field: 'drivingLicence', header: 'drivingLicence' },
      { field: 'drivingDate', header: 'drivingDate' },
    ];

    this.getAlldrivers();
  }
  getAlldrivers() {
    this.driverService.getDrivers().subscribe(
      (data: Driver[]) => {
        this.drivers = data
      }
    )
  }
  ngOnDestroy() {

  }
  openNew() {
    this.driver = {};
    this.submitted = false;
    this.driverDialog = true;
  }
  deleteSelecteddrivers() {
    this.deletedriversDialog = true;

  }
  onGlobalFilter(table:Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }
  deletedriver(driver: Driver) {
    this.deletedriverDialog = true;
    this.driver = { ...driver };
  }
  editdriver(driver: Driver) {
    this.driver = { ...driver };
    this.driverDialog = true;

  }
  savedriver() {
    this.submitted = true;

    if (this.driver.name?.trim()) {
      if (this.driver.id) {
        // @ts-ignore
        // this.driver.inventoryStatus = this.driver.inventoryStatus.value ? this.driver.inventoryStatus.value : this.driver.inventoryStatus;
        // this.drivers[this.findIndexById(this.driver.id)] = this.driver;
        this.driver.entrepriseId = 1;
        this.driver.login = "1";
        this.driverService.saveDriver(this.driver).subscribe();
        this.getAlldrivers()
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'driver Updated', life: 3000 });
      } else {
         this.driver.id = this.createId();
        // this.driver.code = this.createId();
        this.driver.drivingPhoto = 'driver-placeholder.svg';
        this.driver.entrepriseId = 1;
        this.driver.login = "1";
        
        // @ts-ignore
        // this.driver.inventoryStatus = this.driver.inventoryStatus ? this.driver.inventoryStatus.value : 'INSTOCK';
        this.driverService.saveDriver(this.driver).subscribe();
        this.getAlldrivers()
        // this.drivers.push(this.driver);
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'driver Created', life: 3000 });
      }

      this.drivers = [...this.drivers];
      this.driverDialog = false;
      this.driver = {};
    }
  }

  findIndexById(id: number): number {
    let index = -1;
    for (let i = 0; i < this.drivers.length; i++) {
      if (this.drivers[i].id === id) {
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
  hideDialog() {
    this.driverDialog = false;
    this.submitted = false;
  }
  confirmDelete() {
    this.deletedriverDialog = false;
    this.drivers = this.drivers.filter(val => val.id !== this.driver.id);
    this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'driver Deleted', life: 3000 });
    this.driver = {};
  }
  confirmDeleteSelected() {
    this.deletedriversDialog = false;
    this.drivers = this.drivers.filter(val => !this.selecteddrivers.includes(val));
    this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'drivers Deleted', life: 3000 });
    this.selecteddrivers = [];
  }
}
