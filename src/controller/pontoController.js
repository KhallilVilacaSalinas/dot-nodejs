const { v4: uuid } = require("uuid");
const Ponto = require("../models/Ponto");

const sharp = require('sharp');
const path = require('path');

const fs = require("fs").promises;

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
		const { idUser, dateTile, dateTime } = request.body;
		const { location: url = "" } = request.file;

			const ponto = new Ponto({
				_idComprovante: uuid(),
				idUser,
				dateTime,
				dateTile,
				image: url,
			});

			try {
				await ponto.save();
				return response.status(201).json({ 
					message: "Ponto adicionado com sucesso!",
					data: ponto
			 	});
			} catch (err) {
				response.status(400).json({ error: err.message });
			}
		// } else {
		// 	return response.status(400).json({ error: 'Arquivo inválido.' });
		// }

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