import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionAdduserComponent } from './section-adduser.component';

describe('SectionAdduserComponent', () => {
  let component: SectionAdduserComponent;
  let fixture: ComponentFixture<SectionAdduserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SectionAdduserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SectionAdduserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
