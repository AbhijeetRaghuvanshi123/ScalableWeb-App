const validate = (requiredFields) => (req, res, next) => {
  if (!requiredFields || requiredFields.length === 0) {
      return next();
  }
  
  const missing = requiredFields.filter((field) => !req.body[field]);

  if (missing.length > 0) {
    res.status(400);
    const error = new Error(`Missing required fields: ${missing.join(', ')}`);
    return next(error);
  }

  next();
};

export default validate;
