function scrapeSubredditEmpresas(datos, publicaciones, empresasOcriptos) {
	const datos_empresas = datos;
	const posts = publicaciones;

	let apariciones_empresas = [];
	let tabla_empresas = [];

	let title;

	console.log(' ');
	console.log(`Obteniendo datos de ${empresasOcriptos}...`);

	for (k = 0; k < datos_empresas.length; k++) {
		apariciones_empresas.push(0);

		posts.forEach((post) => {
			title_1 = post.title;
			title_2 = post.title.toLowerCase();

			if (
				(title_2.includes(' ' + datos_empresas[k].Name.toLowerCase() + ' ') ||
					title_1.includes(' ' + datos_empresas[k].Symbol + ' ')) &&
				datos_empresas[k].Symbol.length >= 2
			) {
				apariciones_empresas[k]++;
			}
		});
	}

	const apariciones_totales = apariciones_empresas.reduce(function (a, b) {
		return a + b;
	});
	const posts_length = posts.length;

	for (k = 0; k < 11; k++) {
		let maxima = Math.max.apply(Math, apariciones_empresas);
		let position = apariciones_empresas.indexOf(maxima);
		let objeto = datos_empresas[position];
		let maximaEmpresa = objeto.Name;
		let maximaTicket = objeto.Symbol;
		let porcentaje_posts = Math.round((maxima / posts_length) * 100 * 100) / 100;
		let porcentaje_empresas = Math.round((maxima / apariciones_totales) * 100 * 100) / 100;

		tabla_empresas.push({
			ticket: maximaTicket,
			nombre: maximaEmpresa,
			apariciones: maxima,
			'% A/NP': porcentaje_posts + ' %',
			'% A/AT': porcentaje_empresas + ' %',
		});

		apariciones_empresas.splice(position, 1, 0);
	}

	console.log(' ');
	console.table(tabla_empresas, ['ticket', 'nombre', 'apariciones', '% A/NP', '% A/AT']);
}

function scrapeSubredditCriptos(datos, publicaciones) {
	const datos_criptos = datos;
	const posts = publicaciones;

	console.log(' ');
	console.log('Obteniendo datos de criptos...');

	let apariciones_criptos = [];
	let tabla_criptos = [];

	let title;

	for (k = 0; k < datos_criptos.length; k++) {
		apariciones_criptos.push(0);

		posts.forEach((post) => {
			title = post.title;

			if (title.includes(datos_criptos[k].Symbol)) {
				apariciones_criptos[k]++;
			}
		});
	}

	const apariciones_totales = apariciones_criptos.reduce(function (a, b) {
		return a + b;
	});
	const posts_length = posts.length;

	for (k = 0; k < 11; k++) {
		let maxima = Math.max.apply(Math, apariciones_criptos);
		let position = apariciones_criptos.indexOf(maxima);
		let objeto = datos_criptos[position];
		let maximaCripto = objeto.Symbol;
		let porcentaje_posts = Math.round((maxima / posts_length) * 100 * 100) / 100;
		let porcentaje_cryptos = Math.round((maxima / apariciones_totales) * 100 * 100) / 100;

		tabla_criptos.push({
			ticket: maximaCripto,
			apariciones: maxima,
			'% A/NP': porcentaje_posts + ' %',
			'% A/AT': porcentaje_cryptos + ' %',
		});

		apariciones_criptos.splice(position, 1, 0);
	}

	console.log(' ');
	console.table(tabla_criptos, ['ticket', 'apariciones', '% A/NP', '% A/AT']);
}

function scrapeSubredditCommodities(datos, publicaciones) {
	const datos_commodities = datos;
	const posts = publicaciones;
	console.log(' ');
	console.log('Obteniendo datos de commodities...');

	let apariciones_commodities = [];
	let tabla_commodities = [];

	let title;

	for (k = 0; k < datos_commodities.length; k++) {
		apariciones_commodities.push(0);

		posts.forEach((post) => {
			title = post.title.toLowerCase();

			if (title.includes(datos_commodities[k].Name.toLowerCase())) {
				apariciones_commodities[k]++;
			}
		});
	}

	const apariciones_totales = apariciones_commodities.reduce(function (a, b) {
		return a + b;
	});
	const posts_length = posts.length;

	for (k = 0; k < 11; k++) {
		let maxima = Math.max.apply(Math, apariciones_commodities);
		let position = apariciones_commodities.indexOf(maxima);
		let objeto = datos_commodities[position];
		let maximaCommodities = objeto.Name;
		let porcentaje_posts = Math.round((maxima / posts_length) * 100 * 100) / 100;
		let porcentaje_commodities = Math.round((maxima / apariciones_totales) * 100 * 100) / 100;

		tabla_commodities.push({
			nombre: maximaCommodities,
			apariciones: maxima,
			'% A/NP': porcentaje_posts + ' %',
			'% A/AT': porcentaje_commodities + ' %',
		});

		apariciones_commodities.splice(position, 1, 0);
	}

	console.log(' ');
	console.table(tabla_commodities, ['nombre', 'apariciones', '% A/NP', '% A/AT']);
}

module.exports = { scrapeSubredditCommodities, scrapeSubredditCriptos, scrapeSubredditEmpresas };
