const { check, validationResult } = require('./check');
const { matchedData } = require('./filter');
const express = require('express');

const app = express();
app.use(express.json());
app.post('/*', check('q').escape(), (req, res) => {
  console.log(req.body, req.query);
  const data = matchedData(req);
  const result = validationResult(req);

  res.json({
    data,
    errors: result.mapped()
  });
});

app.listen(3000);