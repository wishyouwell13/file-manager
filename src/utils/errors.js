export class InputError extends Error {
  constructor(message = 'Invalid input') {
    super(message);
    this.name = 'InputError';
  }
}

export class OperationError extends Error {
  constructor(message = 'Operation failed') {
    super(message);
    this.name = 'OperationError';
  }
}
