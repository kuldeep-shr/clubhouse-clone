// Function to generate a successful API response
const successfullApiResponse = (
  res,
  data = [],
  message = "Success",
  statusCode = 200
) => {
  return res.status(statusCode).json({
    success: true,
    message,
    data,
  });
};

// successResponse.js
const renderSuccessPage = (res, message, page, data = {}, statusCode = 200) => {
  return res.status(statusCode).render(page, { success: message, ...data });
};

// errorResponse.js
const renderErrorPage = (res, error, page, data = {}, statusCode = 500) => {
  return res.status(statusCode).render(page, { error, ...data });
};

// Function to generate an error API response
const errorApiResponse = (
  res,
  message = "Internal Server Error",
  statusCode = 500
) => {
  return res.status(statusCode).json({
    success: false,
    message,
  });
};
export {
  renderSuccessPage,
  renderErrorPage,
  successfullApiResponse,
  errorApiResponse,
};
