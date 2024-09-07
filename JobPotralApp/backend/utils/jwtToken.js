// Import the jsonwebtoken package
import jwt from 'jsonwebtoken';

export const sendToken = (user, statusCode, res, message) => {
  // Generate JWT token with an expiration time
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRE, // Use the JWT_EXPIRE environment variable
  });

  // Cookie options
  const options = {
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000 // Convert COOKIE_EXPIRE from days to milliseconds
    ),
    httpOnly: true, // Ensure the cookie cannot be accessed via JavaScript
  };

  // Send response with the token set in a cookie
  res.status(statusCode).cookie("token", token, options).json({
    success: true,
    user,
    message,
    token,
  });
};
