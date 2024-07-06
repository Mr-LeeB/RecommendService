'use strict';

import { StatusCodes, ReasonPhrases } from '../utils/httpStatusCode';
import { Response } from 'express'; // Import the Response type from Express

interface SuccessResponseOptions {
  message?: string; // Optional, assuming message can be undefined
  status?: number; // Optional, with a default value provided in the constructor
  reasonStatusCode?: string; // Optional, with a default value provided in the constructor
  metadata?: object; // Optional, with a default value of an empty object
}

class SuccessResponse {
  message: string;
  status: number;
  metadata: object;
  constructor({
    message,
    status = StatusCodes.OK,
    reasonStatusCode = ReasonPhrases.OK,
    metadata = {}
  }: SuccessResponseOptions) {
    this.message = !message ? reasonStatusCode : message;
    this.status = status;
    this.metadata = metadata;
  }
  send(res: Response, headers = {}) {
    return res.status(this.status).send(this);
  }
}

interface OKResponseConfig {
  message: string; // Assuming message is of type string
  metadata: object; // Use a more specific type if possible instead of any
}
class OK extends SuccessResponse {
  constructor({ message, metadata }: OKResponseConfig) {
    super({ message, metadata });
  }
}

interface CreatedResponseConfig {
  message: string; // Assuming message is of type string
  status?: number; // Optional because you're providing a default value
  reasonStatusCode?: string; // Optional for the same reason
  metadata: object; // Use a more specific type if possible instead of any
}
class CREATED extends SuccessResponse {
  constructor({
    message,
    status = StatusCodes.CREATED,
    reasonStatusCode = ReasonPhrases.CREATED,
    metadata
  }: CreatedResponseConfig) {
    super({ message, status, reasonStatusCode, metadata });
  }
}

export { OK, CREATED };
