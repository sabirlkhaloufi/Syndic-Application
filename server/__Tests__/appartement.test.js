const request = require('supertest')
const app = require('../app.js')

const api = "/api/appartement/";

//test Register Method
//POST: /api/auth/register
describe('appartement', () => {

    it('add appartement', async () => {
      const res = await request(app)
        .post(api+"add")
        .send({
          Numero: "h2",  
          Etage: 23,
        })
  
      expect(res.status).toEqual(200)
    })


    it('update appartement', async () => {
      const res = await request(app)
        .put(api+"update/63b47e61aaa214b3bdcab1f8")
        .send({
          Numero: "H1233",  
          Etage: 23,
        })
  
      expect(res.status).toEqual(200)
    })


    it('delete appartement', async () => {
      const res = await request(app)
        .delete(api+"delete/63b47e65aaa214b3bdcab1fe")

      expect(res.status).toEqual(200)
    })


    it('send data null', async () => {
      const res = await request(app)
        .post(api+"add")
        .send({
          Numero: "",  
          Etage: "",
        })
  
      expect(res.status).toEqual(400)
    })


    it('update appartement', async () => {
      const res = await request(app)
        .put(api+"update/63b47e61aaa214b3bdcab1f8")
        .send({
          Numero: "H1233",
          Etage: 23,
        })
  
      expect(res.status).toEqual(400)
    })
  })