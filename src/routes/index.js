const express=require('express')
const router=express.Router();
//UTILIZAR EL ARCHIVO tasks.s (esquema) que se encuentra en src/models/tasks.js
const Car = require('../models/car');
const Rent = require('../models/rent');
const User = require('../models/user');

//Rutas o EndPoints

//Inicio car
router.get('/', async (req, res) => {
    //Generar un arreglo de registros con todos los documentos de la coleccion task
    const car = await Car.find();
    res.render('index', {
      car
    });
  });

  //Inicio rent
router.get('/', async (req, res) => {
    //Generar un arreglo de registros con todos los documentos de la coleccion task
    const rent = await Rent.find();
    res.render('index', {
      rent
    });
  });

    //Inicio user
router.get('/', async (req, res) => {
    //Generar un arreglo de registros con todos los documentos de la coleccion task
    const user = await User.find();
    res.render('index', {
      user
    });
  });


  //exportar router y poder utilizarlo en el archivo principal
  module.exports = router;