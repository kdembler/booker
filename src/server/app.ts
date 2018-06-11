import * as express from 'express'
import * as path from 'path'

const clientBuildPath = path.join(__dirname, '..', '..', '..', 'build')
const port = process.env.NODE_ENV === 'development' ? 3001 : 8080

const app = express()
app.use(express.static(clientBuildPath))

app.get('/', (req, res) => res.sendFile(path.join(clientBuildPath, 'index.html')))
app.get('/api', (req, res) => res.send({ msg: 'Hello from API!' }))

app.listen(port, () => console.log(`Booker listening on ${port}!`))
