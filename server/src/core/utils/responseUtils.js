exports.sendErrorResponse = (res, statusCode, errorMessage) => {
  return res.status(statusCode).json({ error: errorMessage });
};

exports.sendJsonResponse = (res, statusCode, jsonData) => {
  return res.status(statusCode).json(jsonData);
};
