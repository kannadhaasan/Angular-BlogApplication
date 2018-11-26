import { TestBed, inject } from '@angular/core/testing';

import { BlogModuleService } from './blog-module.service';

describe('BlogModuleService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BlogModuleService]
    });
  });

  it('should be created', inject([BlogModuleService], (service: BlogModuleService) => {
    expect(service).toBeTruthy();
  }));
});
