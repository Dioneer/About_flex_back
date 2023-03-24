import formidable from 'formidable'
import fs from 'fs'
import path from 'path'
import { saveUserData } from '../db.connection/saveUserData.js'

export const parserJSON = async (req, res) => {
	res.send = () => {
		res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3030')
		res.writeHead(200, { "Content-type": "application/json" });
		res.end(JSON.stringify('sdfsf'))
	}
	const answer = await parserMultyForm(req, res)
	console.log(answer)
}

export const parserURL = (baseURL) => (req, res) => {
	const url = new URL(req.url, baseURL)
	const params = {}
	url.searchParams.forEach((value, key) => { params[key] = value })
	req.pathname = url.pathname
	req.params = params;
}



export const parserMultyForm = (req, res) => {
	return new Promise((res, rej) => {
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
			const result = await saveUserData(obj.name, obj.email, obj.message)
		})
		res(result)
	})
}

