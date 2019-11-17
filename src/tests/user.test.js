const request = require ('supertest')
const app = require ('../app')
const User = require ('../models/user')
const { userOneId, userOne, setupDB } = require('./fixtures/db')

beforeEach(setupDB)

test ('Should sign in new user', async () => {
    const response = await request(app).post('/users').send({
        username: 'newTestUser',
        email: 'newTestemail@test.com',
        password: 'myTestPassword!1'
    }).expect(201)

    // Checking if new user is saved
    console.log(response.body)
    const user = User.findById(response.body._id)
    expect(user).not.toBeNull()
})

test ('Should not sing new user', async () => {
  
    await request(app).post('/users').send({
        username: userOne.username,
        email: 'tesUserOne@test.com',
        password: 'testPassword123!!'
    }).expect(400)

    await request(app).post('/users').send({
        username: 'newUser',
        email: userOne.email,
    }).expect(400)

})

test ('Should login user', async () => {
    await request(app).post('/users/login').send({
        email: userOne.email,
        password: userOne.password
    }).expect(200)
})