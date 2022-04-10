const jwt = require('jsonwebtoken')
const config = require('config')
let server;
const request = require('supertest')
const User = require('../../../models/user')
const Genre = require('../../../models/genre')


describe('Authantication', () => {
    
    beforeEach(() => {
        server = require('../../../index')
    });

    afterEach( async () => {
        server.close()
       await  Genre.remove({})

    });

    it('should return 401 if there is no token provided ',  async () => {
       const token = ''
       const res = await  request(server).post('/api/genres').set('x-auth-token' , token)
        expect(res.status).toBe(401)
        expect(res.body).toBeTruthy()
    });

    it('should return 400 if the token is invalid', async () => {
         const token = 'htrjrfijfenij'
         const res = await request(server).post('/api/genres').set('x-auth-token' , token)
         expect(res.status).toBe(400)
         
    });

    it('should return 200 if the token is valid', async () => {
        const token = User().generateToken()
        const res = await request(server).post('/api/genres').set('x-auth-token' , token).send({ name : 'genre2'})
        expect(res.status).toBe(200)
        
   });
    

});