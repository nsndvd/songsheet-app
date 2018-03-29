import { TestBed, inject } from '@angular/core/testing';

import { DataService } from './data.service';
import { DATABASES } from '../../../ts/databases';

describe('DataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DataService]
    });
  });

  it('should be created', inject([DataService], (service: DataService) => {
    expect(service).toBeTruthy();
  }));

  it('should be empty', inject( [DataService], (service: DataService) => {
    service.getAll(DATABASES.settings).then(res => console.log(res));
  }))
});
