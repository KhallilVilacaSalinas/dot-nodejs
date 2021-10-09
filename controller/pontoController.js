const {response} = require("express");
const {v4: uuid} = require("uuid");
const { update } = require("../models/Ponto");
const Ponto = require("../models/Ponto");

module.exports = {
  async index(request, response) {
    try {
      const pontos = await Ponto.find();
      return response.status(200).json({ pontos });
    } catch (err) {
      response.status(500).json({ error: err.message });
    }
  },

  async store(request, response) {
    const {idUser, image, dateTile, dateTime} = request.body;

    if( !idUser || !image ) {
      return  response.status(400).json({error: "Missing image."});
    }

    const video = new Ponto({ 
      _idComprovante: uuid(),
      idUser,
      dateTime,
      dateTile,
      image,
    });

    try {
      await video.save();

      return response.status(201).json({message: "video added succesfully!"});

    } catch (err) {
      response.status(400).json({error: err.message});
    }
  },
  async update( request, response) {
    const {idUser, image, dateTile, dateTime} = request.body;

    if(!image || !dateTile|| !dateTime) {
      return response.status(400).json({ error: "Você não informou nenhuma insformação."})
    }

    if (image) request.ponto.image = image;
    if (dateTile) request.ponto.dateTile = dateTile;
    if (dateTime) request.ponto.dateTime = dateTime;

    try {
      await response.video.save()
      return response.status(200).json({ message: "Ponto alterado com sucesso "})
    } catch (err) {
      return response.status(500).json({ error: err.message })
    }
  }

};