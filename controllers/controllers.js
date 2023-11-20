const express = require('express')

const categorias = require('../jsons/cats/cat.json');

  const crearCategorias = (req,res)=>{
    res.json(categorias);
  };



  module.exports = {
    crearCategorias,
  };
    

  