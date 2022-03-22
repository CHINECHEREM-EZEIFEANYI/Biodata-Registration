const taskRoute = require('express').Router()
const { createProfile, readProfile, updateProfile, deleteProfile, allProfile, search } = require('./controller')
taskRoute.post('/', createProfile)
taskRoute.get('/:id', readProfile)
taskRoute.patch('/:id', updateProfile)
taskRoute.post('/:id', deleteProfile)
taskRoute.get('/', allProfile)
//taskRoute.get('/', search)

taskRoute.get('/check', (req, res) => {
    res.send('BOOKS AVAILABLE')
})

module.exports = taskRoute