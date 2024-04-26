/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { faker } from '@faker-js/faker';

import { VehicleListComponent } from './vehicle-list.component';
import { HttpClientModule } from '@angular/common/http';
import { VehicleService } from '../vehicle.service';
import { Vehicle } from '../vehicle';

describe('VehicleListComponent', () => {
  let component: VehicleListComponent;
  let fixture: ComponentFixture<VehicleListComponent>;
  let debug: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      declarations: [ VehicleListComponent ],
      providers: [VehicleService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VehicleListComponent);
    component = fixture.componentInstance;

    for(let i = 0; i < 3; i++) {
      const vehicle = new Vehicle(
        faker.number.int(),
        faker.vehicle.manufacturer(),
        faker.vehicle.model(),
        faker.vehicle.type(),
        faker.number.int(),
        faker.number.int(),
        faker.vehicle.color(),
        faker.image.url()
      );
      component.vehicles.push(vehicle);
    }

    fixture.detectChanges();
    debug = fixture.debugElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a header', () => {
    expect(debug.queryAll(By.css('thead tr'))).toBeTruthy()
  });

  it('should have rows', () => {
    expect(debug.queryAll(By.css('tbody tr'))).toBeTruthy()
  });

  it('should have exactly 3 rows', () => {
    expect(debug.queryAll(By.css('tbody tr'))).toHaveSize(3)
  });

  it('should have 4 columns in each row', () => {
    debug.queryAll(By.css('tbody tr')).forEach((tr, i)=>{
      expect(tr.queryAll(By.css('td'))).toHaveSize(4)
    });
  });

  it('should have the vehicle id in the first column of each row', () => {
    debug.queryAll(By.css('tbody tr')).forEach((tr, i)=>{
      tr.queryAll(By.css('td.id')).forEach((td) => {
        expect(td.nativeElement.textContent).toBe(component.vehicles[i].id.toString());
      });
    });
  });

  it('should have the vehicle marca in the second column of each row', () => {
    debug.queryAll(By.css('tbody tr')).forEach((tr, i)=>{
      tr.queryAll(By.css('td.marca')).forEach((td) => {
        expect(td.nativeElement.textContent).toBe(component.vehicles[i].marca);
      });
    });
  });

  it('should have the vehicle linea in the third column of each row', () => {
    debug.queryAll(By.css('tbody tr')).forEach((tr, i)=>{
      tr.queryAll(By.css('td.linea')).forEach((td) => {
        expect(td.nativeElement.textContent).toBe(component.vehicles[i].linea);
      });
    });
  });

  it('should have the vehicle model in the fourth column of each row', () => {
    debug.queryAll(By.css('tbody tr')).forEach((tr, i)=>{
      tr.queryAll(By.css('td.model')).forEach((td) => {
        expect(td.nativeElement.textContent).toBe(component.vehicles[i].modelo.toString());
      });
    });
  });

});
