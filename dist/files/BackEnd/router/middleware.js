export const parserJSON = (req, res) => {
	res.send = (data) => {
		res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3030')
		res.writeHead(200, { "Content-type": 'application/json' });
		res.end(JSON.stringify(data))
	}
}

export const parserURL = (baseURL) => (req, res) => {
	const url = new URL(req.url, baseURL)
	const params = {}
	url.searchParams.forEach((value, key) => { params[key] = value })
	req.pathname = url.pathname
	req.params = params;
}