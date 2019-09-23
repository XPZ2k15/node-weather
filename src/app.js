const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

// Define paths for express config
const publicDirPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirPath))


app.get('', (req, res) => {
    res.render('index', {
        title: 'ClearVision',
        header: 'Weather',
        name: 'Chris'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'ClearVision - About Us',
        header: 'About Us',
        name: 'Chris'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'ClearVision - Help',
        helptext: 'Please contact x@x.com for help.',
        name: 'Chris'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'Please provide an address.'
        })
    }

    geocode(req.query.address, (error, {
        latitude,
        longitude,
        location
    } = {}) => {
        if (error) {
            return res.send({
                error: error
            })
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({
                    error
                })
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })

    // res.send({
    //     forecast: 'It is sunny.',
    //     location: 'Irvine, Ca',
    //     address: req.query.address
    // })
})



app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'you must provide a search term'
        })
    }

    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.listen(2337, () => {
    console.log('Server is currently running on port 2337.')
})