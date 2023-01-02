const request = require('supertest')
const app = require('../app.js')

const api = "/api/auth/register";

//test Register Method
//POST: /api/auth/register
describe('appartement', () => {
    // it('register by user alredy exist', async () => {
    //   const res = await request(app)
    //     .post(api)
    //     .send({
    //       name: "sabir",  
    //       email: "sabirkhaloufi@gmail.com",
    //       password: 'sabir',
    //       role: "client"
    //     })
  
    //   expect(res.status).toEqual(400)
    // })


    it('register by user not exist', async () => {
      const res = await request(app)
        .post(api)
        .send({
          name: "sabir",  
          email: "sabihhdr@gmail.com",
          password: 'sabir',
          role: "client"
        })
  
      expect(res.status).toEqual(200)
    })


    it('send data null', async () => {
      const res = await request(app)
        .post(api)
        .send({
          name: "",  
          email: "",
          password: '',
          role: ""
        })
  
      expect(res.status).toEqual(400)
    })
  })