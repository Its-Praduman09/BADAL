class ApiResponse {
  static success(res, data, message = "Success") {
    return res.status(200).json({
      status: 200,
      message,
      data,
    });
  }

  static created(res, data, message = "Resource created successfully") {
    return res.status(201).json({
      status: 201,
      message,
      data,
    });
  }

  static error(
    res,
    message = "An error occurred",
    statusCode = 400,
    errors = []
  ) {
    return res.status(statusCode).json({
      status: statusCode,
      message,
      errors,
    });
  }

  static notFound(res, message = "Resource not found") {
    return res.status(404).json({
      status: 404,
      message,
    });
  }

  static unauthorized(res, message = "Unauthorized") {
    return res.status(401).json({
      status: 401,
      message,
    });
  }

  static forbidden(res, message = "Forbidden") {
    return res.status(403).json({
      status: 403,
      message,
    });
  }

  static serverError(res, message = "Internal Server Error") {
    return res.status(500).json({
      status: 500,
      message,
    });
  }
}

export default ApiResponse;
