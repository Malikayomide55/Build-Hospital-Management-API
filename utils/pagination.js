const pagination = (page, limit) => {
  const currentPage =
    Math.max(Number(page) || 1, 1);

  const currentLimit =
    Math.max(Number(limit) || 10, 1);

  const skip =
    (currentPage - 1) * currentLimit;

  return {
    page: currentPage,
    limit: currentLimit,
    skip
  };
};

module.exports = pagination;