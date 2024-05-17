import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginZkpComponent } from './login-zkp.component';

describe('LoginZkpComponent', () => {
  let component: LoginZkpComponent;
  let fixture: ComponentFixture<LoginZkpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginZkpComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginZkpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
