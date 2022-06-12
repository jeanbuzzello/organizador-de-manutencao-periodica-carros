import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Componente04Component } from './componente04.component';

describe('Componente04Component', () => {
  let component: Componente04Component;
  let fixture: ComponentFixture<Componente04Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Componente04Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Componente04Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
