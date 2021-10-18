module.exports = (res, statuscode, data) =>
  res.status(statuscode).json({
    status: true,
    data,
});
