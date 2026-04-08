import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Profissional } from './profissional';

describe('Profissional', () => {
  let component: Profissional;
  let fixture: ComponentFixture<Profissional>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Profissional]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Profissional);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
