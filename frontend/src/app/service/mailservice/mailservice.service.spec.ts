import { TestBed } from '@angular/core/testing';

import { MailserviceService } from './mailservice.service';

describe('MailserviceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MailserviceService = TestBed.get(MailserviceService);
    expect(service).toBeTruthy();
  });
});
