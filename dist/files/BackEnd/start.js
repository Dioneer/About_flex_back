import * as dotenv from 'dotenv'
import { Application } from './router/server.js'
import { router } from './router/user-routers.js'
import { parserJSON, parserURL, parserMultyForm } from './router/middleware.js'
dotenv.config()


const app = new Application();


app.addRouter(router)
app.use(parserJSON)
app.use(parserMultyForm)
app.use(parserURL("http://localhost:5050"))
app.listen(process.env.DB_PORT, () => { console.log(`Work on port ${process.env.DB_PORT}`) })

