var Makeup = require("../models/makeup");


function MakeupIndex(req, res) {
  Makeup.find(function(err, makeup) {
    if (err) return res.status(404).json({
      message: 'Something went wrong.'
    });
    res.status(200).json(makeup);
  });
}


function MakeupShow(req, res) {
  console.log(req.params);
  Makeup.findById(req.params.id).exec(function(err, makeup) {
    if (err) return res.status(404).json({
      message: 'Something went wrong.'
    });
    res.status(200).json(makeup);
  });
}

module.exports = {
  index: MakeupIndex,
  show: MakeupShow
};
