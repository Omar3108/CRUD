import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditProductosComponent } from './add-edit-productos.component';

describe('AddEditProductosComponent', () => {
  let component: AddEditProductosComponent;
  let fixture: ComponentFixture<AddEditProductosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddEditProductosComponent]
    });
    fixture = TestBed.createComponent(AddEditProductosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
