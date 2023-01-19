const request = require('supertest')
const app = require('../app.js')

const api = "/api/auth/login";

//test Register Method
//POST: /api/auth/register
describe('Login', () => {
    it('login by user', async () => {
      const res = await request(app)
        .post("/api/auth/login")
        .send({
          username: "sabir",  
          password:"sabir123",
        })
  
      expect(res.status).toEqual(200)
    })


    it('login by user not exist', async () => {
      const res = await request(app)
        .post(api)
        .send({
          username: "sabir",  
          password: 'sabirddd',
        })
  
      expect(res.status).toEqual(400)
    })


    it('send data null', async () => {
      const res = await request(app)
        .post(api)
        .send({})
  
      expect(res.status).toEqual(400)
    })
})