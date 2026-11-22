'use strict';

class ProcedureFailure extends Error {
  constructor(category, code, message, details = {}, cause) {
    super(message, {cause});
    this.name = 'ProcedureFailure';
    this.failure = {category, code, ...details};
  }
}

function failureDetails(error, category = 'environment', code = 'operation-failed') {
  return error instanceof ProcedureFailure ? error.failure : {category, code};
}

module.exports = {ProcedureFailure, failureDetails};
