import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarAgregarUsuariosComponent } from './editar-agregar-usuarios.component';

describe('EditarAgregarUsuariosComponent', () => {
  let component: EditarAgregarUsuariosComponent;
  let fixture: ComponentFixture<EditarAgregarUsuariosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditarAgregarUsuariosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditarAgregarUsuariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
