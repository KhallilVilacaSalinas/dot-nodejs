const express = require('express');
const router = express.Router();
//const mysql = require('../mysql').pool;

router.get('/', (req, res, next) => {
	res.status(200).send({
		message: 'Retorna todos os produtos'
	});
});

router.post('/', (req, res, next) => {

	mysql.getConnection((error, conn) => {
		conn.query('INSERT INTO produtos (nome, preco) VALUES (?,?)',
			[req.body.nome, req.body.preco],
			(error, resultado, fields) => {
				conn.release();

				if (error) {
					res.status(500).send({
						error: error,
						response: null
					});
				}

				res.status(201).send({
					message: 'Produto inserido com sucesso!',
					id_produto: resultado.insertId
				});
			}
		)
	});
});

router.get('/:id_produto', (req, res, next) => {
	const id = req.params.id_produto;
	if (id === '121312') {
		res.status(200).send({
			message: 'Get de um produto exclusivo especial',
			id: id
		});
	} else {
		res.status(200).send({
			message: 'Get de um produto exclusivo',
			id: id
		});
	}
});

router.delete('/:id_produto', (req, res, next) => {
	res.status(201).send({
		message: 'Usando Delete'
	});
});

module.exports = router;

//7:43