import { Router } from './router.js'
const router = new Router();


const response = [{
	"massage": "ok"
},]

router.post('/save_user_message', (req, res) => {
	console.log(req.body)
	const responses = req.body
	response.push(responses)
	res.send(response)
})

router.get('/save_user_message', (req, res) => {
	res.send(response)
})

export { router }