const jwt = require('jsonwebtoken');

module.exports = function (req,res,next) {
  const token = request.headers['access-token'];
  if(!token) return res.status(401).json(
    {
      status: 'failure',
      error: 'Unauthorized'
    }
  );

  try {
      const verified = jwt.verify(token, process.env.TOKEN_SECRET);
      req.user = verified;
      next();
  } catch (err) {
    return res.status(400).json(
      {
        status: 'failure',
        error: err
      }
    );
  }
}
