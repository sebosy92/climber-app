const request = require ('supertest')
const app = require ('../src/app')
const User = require ('../src/models/user')
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

test ('Should upload avatar image', async () => {
    await request(app)
        .post('/users/me/avatar')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .attach('avatar','tests/fixtures/avatar.jpg')
        .expect(200)
    const user = await User.findById(userOneId)
    expect(user.avatar).toEqual(expect.any(Buffer))

})

test ('Should delete users avatar', async () => {
    await request(app)
        .delete('/users/me/avatar')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .expect(200)
    const user = await User.findById(userOneId)
    expect(user.avatar).toEqual(undefined)
})

