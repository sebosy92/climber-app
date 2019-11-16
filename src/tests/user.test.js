const request = require ('supertest')
const app = require ('../app')
const { userOneId, userOne, setupDB } = require('./fixtures/db')

beforeEach(setupDB)

test ('Should sign in new user', async () => {
    const response = await request(app).send({
        username: 'testUserOne',
        email: 'tesUserOne@test.com',
        sex: 'male',
    }).expect(201)

    // Checking if new user is saved

})