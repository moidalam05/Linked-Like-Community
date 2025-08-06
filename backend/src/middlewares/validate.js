export const validate = (schema) => (req, res, next) => {
  const result = schema.safeParse(req.body);

  if (!result.success) {
    console.log("Zod Validation Error:", result.error.flatten().fieldErrors);
    return res.status(400).json({
      message: "Validation Failed",
      errors: result.error.flatten().fieldErrors,
    });
  }

  req.body = result.data;
  next();
};
