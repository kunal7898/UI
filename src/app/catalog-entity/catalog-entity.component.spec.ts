import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogEntityComponent } from './catalog-entity.component';

describe('CatalogEntityComponent', () => {
  let component: CatalogEntityComponent;
  let fixture: ComponentFixture<CatalogEntityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CatalogEntityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CatalogEntityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
