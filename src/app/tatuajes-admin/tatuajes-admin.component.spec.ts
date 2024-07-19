import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TatuajesAdminComponent } from './tatuajes-admin.component';

describe('TatuajesAdminComponent', () => {
  let component: TatuajesAdminComponent;
  let fixture: ComponentFixture<TatuajesAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TatuajesAdminComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TatuajesAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
