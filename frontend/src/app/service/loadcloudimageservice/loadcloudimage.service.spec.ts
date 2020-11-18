import { TestBed } from '@angular/core/testing';

import { LoadcloudimageService } from './loadcloudingimage.service';

describe('LoadcloudimageService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LoadcloudimageService = TestBed.get(LoadcloudimageService);
    expect(service).toBeTruthy();
  });
});
