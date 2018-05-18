import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LibTwoComponent } from './lib-two.component';

describe('LibTwoComponent', () => {
  let component: LibTwoComponent;
  let fixture: ComponentFixture<LibTwoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LibTwoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LibTwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
