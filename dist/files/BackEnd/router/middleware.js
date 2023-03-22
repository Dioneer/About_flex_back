import formidable from 'formidable'
import fs from 'fs'
import path from 'path'

export const parserJSON = (req, res) => {
	res.send = () => {
		fs.readFile(path.join(path.resolve('router', 'txt.json')), 'utf8', (err, data) => {
			if (err) { return console.log(err.message) }
			res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3030')
			res.writeHead(200, { "Content-type": "application/json" });
			res.end(JSON.stringify(data))
		})
	}
}

export const parserURL = (baseURL) => (req, res) => {
	const url = new URL(req.url, baseURL)
	const params = {}
	url.searchParams.forEach((value, key) => { params[key] = value })
	req.pathname = url.pathname
	req.params = params;
}



export const parserMultyForm = async (req, res) => {
	const form = formidable({ multiples: true });
	form.parse(req, async (err, fields, files) => {
		if (err) { throw new Error("Err of vlidation form-data"); }
		const obj = {
			'name': String(fields.name),
			'email': String(fields.email),
			'message': String(fields.textarea),
		}
		fs.writeFile(path.join(path.resolve('router', 'txt.json')), JSON.stringify(obj), (err) => {
			if (err) { return console.log(err.message) }
		})
	})
}
