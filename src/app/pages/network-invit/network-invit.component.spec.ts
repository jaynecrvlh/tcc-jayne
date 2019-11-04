import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NetworkInvitComponent } from './network-invit.component';

describe('NetworkInvitComponent', () => {
  let component: NetworkInvitComponent;
  let fixture: ComponentFixture<NetworkInvitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NetworkInvitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NetworkInvitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
