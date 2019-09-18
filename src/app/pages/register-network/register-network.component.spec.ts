import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterNetworkComponent } from './register-network.component';

describe('RegisterNetworkComponent', () => {
  let component: RegisterNetworkComponent;
  let fixture: ComponentFixture<RegisterNetworkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterNetworkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterNetworkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
