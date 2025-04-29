import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailFormateurComponent } from './detail-formateur.component';

describe('DetailFormateurComponent', () => {
  let component: DetailFormateurComponent;
  let fixture: ComponentFixture<DetailFormateurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DetailFormateurComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailFormateurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
