const { HttpError } = require("./httpError");

function validate(schema) {
  return (req, res, next) => {
    const result = schema.safeParse({
      body: req.body,
      params: req.params,
      query: req.query,
    });

    if (!result.success) {
      const details = result.error.issues.map((issue) => ({
        path: issue.path.join("."),
        message: issue.message,
      }));

      return next(new HttpError(400, "Validation failed", details));
    }

    req.validated = result.data;
    next();
  };
}

module.exports = { validate };
