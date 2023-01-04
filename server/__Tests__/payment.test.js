const request = require('supertest')
const app = require('../app.js')

const api = "/api/payment/";

//test Register Method
//POST: /api/auth/register
describe('payment', () => {

    it('add payment', async () => {
      const res = await request(app)
        .post(api+"add")
        .send({
          Prix: 444,  
          Date: "2022/04/23",
          Apparetement:"63b5c8c30282f273390456b2"
        })
  
      expect(res.status).toEqual(200)
    })


    it('update payment', async () => {
      const res = await request(app)
        .put(api+"update/63b5bff40252ecccf24eec3e")
        .send({
          Prix: 1500,  
          Date: "2022/04/23",
          Apparetement:"63b5c8c30282f273390456b2"
        })
  
      expect(res.status).toEqual(200)
    })


    it('delete payment', async () => {
      const res = await request(app)
        .delete(api+"delete/63b5925b0252ecccf24eec38")

      expect(res.status).toEqual(200)
    })


    it('send data null', async () => {
      const res = await request(app)
        .post(api+"add")
        .send({
          Prix: "",  
          Date: "",
          Apparetement:""
        })
  
      expect(res.status).toEqual(400)
    })


    it('update payment', async () => {
      const res = await request(app)
        .put(api+"update/63b47e61aaa214b3bdcab1f8")
        .send({
          Prix: 1500,  
          Date: "2022/04/23",
          Apparetement:"63b5c8c30282f273390456b2"
        })
  
      expect(res.status).toEqual(200)
    })
  })