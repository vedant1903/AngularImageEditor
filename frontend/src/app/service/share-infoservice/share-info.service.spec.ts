import { TestBed } from '@angular/core/testing';

import { ShareInfoService } from './share-info.service';

describe('ShareInfoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ShareInfoService = TestBed.get(ShareInfoService);
    expect(service).toBeTruthy();
  });
});
