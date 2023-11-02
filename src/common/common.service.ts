import { Injectable } from '@nestjs/common';

@Injectable()
export class CommonService {
  common() {
    return 'common methods---3';
  }
}
