const Ninja = require('../models/ninja');
const crypto = require('crypto');


const get_ninjas = (req, res, next) => {
    const lng = parseFloat(req.query.lng);
    const lat = parseFloat(req.query.lat);
    Ninja.aggregate([{
        $geoNear: {
          near: {
            type: "Point",
            coordinates: [lng, lat]
          },
        //   maxDistance: 10000,
          distanceField: "dist.calculated",
          spherical: true
        }
      }]
      ).then((ninjas)=>{
        res.send(ninjas);
      }).catch(next);
};

const create_ninja = (req, res, next) => {
    const ninja = Ninja.create(req.body).then((ninja) =>{
        res.send(ninja);
    }).catch(next);
};

const get_ninja = (req, res, next) => {
    res.send({method: req.method});
};

const update_ninja = (req, res, next) => {
    const id = req.params.id;
    Ninja.findByIdAndUpdate(id, req.body).then((ninja) => {
        Ninja.findById(id).then((ninja) => {
            res.send(ninja);
        }).catch(next);
    }).catch(next);
};

const delete_ninja = (req, res, next) => {
    const id = req.params.id
    Ninja.findByIdAndDelete(id).then((ninja) =>{
        res.send(ninja);
    }).catch(next);
};

module.exports = {
    get_ninjas,
    create_ninja,
    get_ninja,
    update_ninja,
    delete_ninja
};
