import * as dotenv from 'dotenv'
import { Application } from './router/server.js'
import { router } from './router/user-routers.js'
import { parserJSON } from './router/middleware.js'
import { parserURL } from './router/middleware.js'
dotenv.config()


const app = new Application();


app.addRouter(router)
app.use(parserJSON)
app.use(parserURL("http://localhost:5050"))
app.listen(process.env.DB_PORT, () => { `Work on port ${process.env.DB_PORT}` })

