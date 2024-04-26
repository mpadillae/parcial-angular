import { Component, OnInit } from '@angular/core';
import { Vehicle } from '../vehicle';
import { VehicleService } from '../vehicle.service';

@Component({
  selector: 'app-vehicle-list',
  templateUrl: './vehicle-list.component.html',
  styleUrls: ['./vehicle-list.component.css']
})
export class VehicleListComponent implements OnInit {

  vehicles: Array<Vehicle> = []; 
  totals = new Map<string, number>(); 

  constructor(private vehicleService: VehicleService) { }

  ngOnInit() {
    this.getVehicles();
  }

  getVehicles(): void {
    this.vehicleService.getVehicles().subscribe((vehicles) => {
      this.totals.clear();
      this.vehicles = vehicles;
      this.getTotals(vehicles);
    });
  }

  getTotals(vehicles: Array<Vehicle>) {
    this.totals = vehicles.reduce((result: any, vehicle: Vehicle) => {
      if (!result[vehicle["marca"]]) { 
        result[vehicle["marca"]] = 0; 
      }
      result[vehicle["marca"]] += 1;
      return result;
    }, {});
  }

}
