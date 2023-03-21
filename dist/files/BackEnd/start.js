import * as dotenv from 'dotenv'
import { Application } from './router/server.js'
import { Router } from './router/router.js'
dotenv.config()

const router = new Router();
const app = new Application();


router.post('/save_user_message', (req, res) => {
	res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3030')
	res.writeHead(200, { "Content-type": 'text/html' });
	res.end(JSON.stringify('cool'))
})

app.addRouter(router)

app.listen(process.env.DB_PORT, () => { `Work on port ${process.env.DB_PORT}` })

