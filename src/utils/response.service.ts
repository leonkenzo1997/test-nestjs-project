import { Injectable } from '@nestjs/common';

@Injectable()
export class ResponseService {
  constructor() {
    // empty
  }

  public success(data: any = {}) {
    return { data };
  }
}
