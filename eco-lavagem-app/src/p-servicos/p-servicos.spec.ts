import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PServicos } from './p-servicos';

describe('PServicos', () => {
  let component: PServicos;
  let fixture: ComponentFixture<PServicos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PServicos]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PServicos);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
