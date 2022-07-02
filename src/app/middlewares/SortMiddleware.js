module.exports = function SortMiddleware(req, res, next) {
  res.locals._sort = {
    enabled: false,
    type: "default",
  };
  if (req.query.hasOwnProperty("_sort")) {
    Object.assign(res.locals._sort, {
      enabled: true,
      column: req.query.column,
      type: req.query.type,
    });
  }

  next();
};
