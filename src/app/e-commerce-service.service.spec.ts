import { TestBed } from '@angular/core/testing';

import { ECommerceServiceService } from './e-commerce-service.service';

describe('ECommerceServiceService', () => {
  let service: ECommerceServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ECommerceServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
