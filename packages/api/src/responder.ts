export type SuccessResponse = {
  message: string;
};

function successResponse(message: string): SuccessResponse {
  return {
    message
  };
}

export type ErrorResponse = {
  error: string;
};

function errorResponse(message: string): ErrorResponse {
  return {
    error: message
  };
}

export const Responder = {
  success: successResponse,
  error: errorResponse
};
