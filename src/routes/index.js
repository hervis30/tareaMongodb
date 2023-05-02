const express = require('express')
const router = express.Router();
//UTILIZAR EL ARCHIVO tasks.s (esquema) que se encuentra en src/models/tasks.js
const Car = require('../models/cars');
const Rent = require('../models/rents');
const User = require('../models/users');


//Rutas o EndPoints


//inicio app
router.get('/', async (req, res) => {
  //mostrar barra de navegacion
  res.render('inicio');
  console.log('inicio de sesion');
});

//inicio de sesion
router.post('/iniciosesion', async (req, res, next) => {

  const username = req.body.username;
  const password = req.body.password;
  const user = await User.findOne({ username: username, password: password });
  let message;

  if (!user) {
    message = 'usuario o contraseña incorrectos. Por favor intentelo de nuevo';
    res.render('inicio', { message: message });
  } else {
    res.redirect('/user');
  }
});



//-----------------------------Inicio car--------------------------------------
router.get('/car', async (req, res) => {
  //Generar un arreglo de registros con todos los documentos de la coleccion task
  const cars = await Car.find();
  res.render('indexcar', {
    cars
  });
});


//agregar carro
router.post('/addcar', async (req, res, next) => {

  let message;
  const existCar = await Car.findOne({ platenumber: req.body.platenumber });

  if (existCar) {
    message = 'La matricula ya existe. Por favor, ingrese una matricula diferente. ';
    res.render('indexcar', { message: message });
  } else {
    const car = new Car(req.body);
    await car.save();
    res.redirect('/car');
  }
});

//Busca una carro por id en invoca la vista para cambiar la info de esta
router.get('/editcar/:id', async (req, res, next) => {
  const car = await Car.findById(req.params.id);
  console.log(car)
  res.render('editcar', { car });
});

//Editar la info del carro
router.post('/editcar/:id', async (req, res, next) => {
  const { id } = req.params;
  await Car.updateOne({ _id: id }, req.body);
  res.redirect('/car');
});

//-----------------------------Inicio rent--------------------------------------
router.get('/rent', async (req, res) => {
  //Generar un arreglo de registros con todos los documentos de la coleccion rent
  const rents = await Rent.find();
  res.render('indexrent', {
    rents
  });
});

//agregar renta
router.post('/addrent', async (req, res, next) => {

  let rentMessage;
  let userMessage;
  let carMessage;
  let carStatus;

  const existRent = await Rent.findOne({ rentnumber: req.body.rentnumber });
  const existCar = await Car.findOne({ platenumber: req.body.platenumber });
  const statusCar = await Car.findOne({ status: req.body.status });
  const existUser = await User.findOne({ username: req.body.username });

  if (existRent) {
    rentMessage = 'El numero de renta ya existe. Por favor, ingrese un numero de renta diferente';
    res.render('indexrent', { rentMessage: rentMessage });
  } else if (!existUser) {
    userMessage = 'El usuario no existe. Por favor, ingrese un usuario que se encuentre registrado';
    res.render('indexrent', { userMessage: userMessage });
  } else if (!existCar) {
    carMessage = 'La matricula del carro no existe. Por favor, ingrese una matricula que se encuentre registrada';
    res.render('indexrent', { carMessage: carMessage });
  } else if (!statusCar) {
    carStatus = 'El carro ya se encuentra rentado. Por favor selecciona otro carro';
    res.render('indexrent', { carStatus: carStatus });
  } else {
    await Car.updateOne({ platenumber: req.body.platenumber }, { $set: { status: false } });
    const rent = new Rent(req.body);
    await rent.save();
    res.redirect('/rent');

  }
});

//Busca una renta por id en invoca la vista para cambiar la info de esta
router.get('/editrent/:id', async (req, res, next) => {
  const rent = await User.findById(req.params.id);
  console.log(rent)
  res.render('editrent', { rent });
});

//Editar la info de la renta
router.post('/editrent/:id', async (req, res, next) => {
  const { id } = req.params;
  await Rent.updateOne({ _id: id }, req.body);
  res.redirect('/rent');
});



//------------------------Inicio user---------------------------------------------
router.get('/user', async (req, res) => {
  const users = await User.find();
  res.render('indexuser', {
    users
  });
});

//agregar usuario
router.post('/adduser', async (req, res, next) => {

  let message;
  const existUser = await User.findOne({ username: req.body.username });

  if (existUser) {
    message = 'El usuario ya existe. Por favor, ingrese un usuario diferente.';
    res.render('indexuser', { message: message });
  } else {
    const user = new User(req.body);
    await user.save();
    res.redirect('/user');
  }
});

//Busca una tarea por id en invoca la vista para cambiar la info de esta
router.get('/edituser/:id', async (req, res, next) => {
  const user = await User.findById(req.params.id);
  console.log(user)
  res.render('edituser', { user });
});

//Editar la info del usuario
router.post('/edituser/:id', async (req, res, next) => {
  const { id } = req.params;
  await User.updateOne({ _id: id }, req.body);
  res.redirect('/user');
});



//exportar router y poder utilizarlo en el archivo principal
module.exports = router;