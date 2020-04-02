const express = require('express');
const path = require('path');
const hbs = require('hbs');
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express();
const port = process.env.PORT || 3000

// define paths for express config :
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');//(optional)this is for change the name of views folder to our desired name.
const partialsPath = path.join(__dirname, '../templates/partials');

// setup handlebars engine and views location :
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// setup static directory to serve :
app.use(express.static(publicDirectoryPath));

// route handlers :
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'vishwas'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Us',
        name: 'vishwas'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'help!',
        name: 'vishwas',
        summary: 'help You!'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'you must provide an address'
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            console.log(error);

            return res.send({ error })
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })

})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'you must provide a search term'
        })
    }

    // we use return rather than using else statement for below line :

    console.log(req.query.search);
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 'help',
        name: 'vishwas',
        errorMessage: 'Help Page Not Found :('
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: 404,
        name: 'vishwas',
        errorMessage: 'my 404 page'
    })
})

app.listen(port, () => {
    console.log(`server started on port ${port} :)`);
})