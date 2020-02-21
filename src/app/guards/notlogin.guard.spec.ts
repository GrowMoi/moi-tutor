import { TestBed, async, inject } from '@angular/core/testing';

import { NotloginGuard } from './notlogin.guard';

describe('NotloginGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NotloginGuard]
    });
  });

  it('should ...', inject([NotloginGuard], (guard: NotloginGuard) => {
    expect(guard).toBeTruthy();
  }));
});
