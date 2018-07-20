import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EntityDataGridComponent } from './entity-data-grid.component';

describe('EntityDataGridComponent', () => {
  let component: EntityDataGridComponent;
  let fixture: ComponentFixture<EntityDataGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EntityDataGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EntityDataGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
