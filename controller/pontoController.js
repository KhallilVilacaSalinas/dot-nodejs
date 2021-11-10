const { v4: uuid } = require("uuid");
const Ponto = require("../models/Ponto");
const fs = require('fs');

module.exports = {
  async index(request, response) {
    try {
      const pontos = await Ponto.find();
      return response.status(200).json({ pontos });
    } catch (err) {
      response.status(500).json({ error: err.message });
    }
  },

  async getId(request, response) {
    const id = request.params.id;
    const pontos = await Ponto.find({ idUser: id });
    if (!pontos) {
      return response.status(400).json({ error: "Você ainda não tem nenhum ponto." })
    }
    return response.status(200).json({ pontos });
  },

  async store(request, response) {
    const { idUser, image, dateTile, dateTime } = request.body;
    //console.log(request.file)
    console.log(request.image);
    if (!idUser || !image) {
      return response.status(400).json({ error: "Missing image." });
    }
    console.log(image.substr(0, 20));

    fs.writeFile("./uploads/" + idUser + "_" + dateTime + ".jpeg", Buffer.from(image, 'base64'),  (err) => {
      if(err) console.log(err)});
    // fs.writeFile(idUser + dateTime, buff,  (err) => {
    //   if(err) console.log(err)});

    const video = new Ponto({
      _idComprovante: uuid(),
      idUser,
      dateTime,
      dateTile,
      image: "/uploads/" + idUser+ "_" + dateTime + ".jpeg",
    });

    try {
      await video.save();
      return response.status(201).json({ message: "video added succesfully!" });

    } catch (err) {
      response.status(400).json({ error: err.message });
    }
  },

  async update(request, response) {
    const { image, dateTile, dateTime } = request.body;

    if (!image && !dateTile && !dateTime) {
      return response.status(400).json({ error: "Você não informou nenhuma informação." })
    }

    if (image) response.ponto.image = image;
    if (dateTile) response.ponto.dateTile = dateTile;
    if (dateTime) response.ponto.dateTime = dateTime;

    try {
      await response.ponto.save()
      return response.status(200).json({ message: "Ponto alterado com sucesso " })
    } catch (err) {
      return response.status(500).json({ error: err.message })
    }
  },

  async delete(request, response) {
    try {
      await response.ponto.remove()
      return response.status(200).json({ message: "Ponto excluido com sucesso" })
    } catch (err) {
      return response.status(500).json({ error: err.message });
    }
  },


};

//Ver um jeito de fazer upload de da imagem 