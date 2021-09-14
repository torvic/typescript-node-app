import express from 'express'
import exphbs from 'express-handlebars'
import path from 'path'
const Handlebars = require('handlebars');
const { allowInsecurePrototypeAccess } = require('@handlebars/allow-prototype-access')

// importing routes
import IndexRoutes from './routes'
import BooksRoutes from './routes/books'

// initializations
const app = express()
import './database'

// Settings
app.set('port', process.env.PORT || 3000)
app.set('views', path.join(__dirname, 'views'))
app.engine('.hbs', exphbs({
	extname: '.hbs',
	defaultLayout: 'main',
	layoutsDir: path.join(app.get('views'), 'layouts'),
	partialsDir: path.join(app.get('views'), 'partials'),
	helpers: require('./lib/helpers'),
	handlebars: allowInsecurePrototypeAccess(Handlebars)
}))
app.set('view engine', '.hbs')

// middlewars
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// Routes
app.use('/', IndexRoutes )
app.use('/books', BooksRoutes )

// static files
app.use(express.static(path.join(__dirname, 'public')))

// Starting the server
app.listen(app.get('port'), () => {
	console.log(`Server on port ${app.get('port')}`);
	
})