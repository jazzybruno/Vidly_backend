let server;
const { default: mongoose } = require('mongoose');
const request = require('supertest')
const Genre = require('../../../models/genre')
const User = require('../../../models/user')
const jwt = require('jsonwebtoken')
const config = require('config')


describe('/api/genres' , ()=>{
    
    beforeEach(() => {
        server = require('../../../index')
    });

    afterAll( async () => {
        server.close()
        await Genre.remove({})
    });

     describe('GET /', () => {
        
        it('should  return 400 if they are no genres to be shown ', async () => {

              const res =  await request(server).get('/api/genres')
              expect(res.status).toBe(200);
              expect(res.body.length).toBe(0);

         });
         
          it('should  return a list of genres ', async () => {

             await   Genre.collection.insertMany( 
                   [ { name: 'genre1'},
                   { name: 'genre2'},
                   { name: 'genre3'}
                ]
               )
               const res =  await request(server).get('/api/genres')
               expect(res.status).toBe(200);
               expect(res.body.length).toBe(3);
               expect(res.body.some( g => g.name === 'genre2')).toBeTruthy()

          });
     });

     describe('GET /:id', () => {
                   
        it('should return a genre if the id is valid', async () => {
            const genre = new Genre ( { name: 'genre1'})
             await  genre.save()

           const res = await request(server).get('/api/genres/' + genre._id)
            expect(res.body).toHaveProperty('name', genre.name);

        });

        it('should return a 404 message if the id is invalid', async () => {

           const res = await request(server).get('/api/genres/1')
            expect(res.status).toBe(404);

        });

        it('should  return  no genre if the id of the genre is not found', async () => {
            
            const id = mongoose.Types.ObjectId()
            console.log(id);
            const res = await request(server).get('/api/genres/' + id)
            expect(res.status).toBe(404);
        });
      });

    describe('POST /', () => {
          

       

        const execute = async() => {
           return   await  request(server)
              .post('/api/genres')
              .set('x-auth-token' , token)
              .send({ name: genre})
        }

        beforeEach(() => {
            let token  
            let genre 
        });

        it('should  return 401 if the user is not logged in ', async () => {
              token = ''
               genre = 'genre2'
               const res =  await  execute()
               expect(res.status).toBe(401);

        });

        it('should  return 401 if the genre is shorter than 5 characters ', async () => {
            token = User().generateToken()
             genre =  'gen'
             const res =  await execute()
             expect(res.status).toBe(401);

         });

          
        it('should  return 401 if the genre is longer than 10 characters ', async () => {
            token = User().generateToken()
            const name = new Array(13).join('a')
            genre = name
             const res =  await  execute()
             expect(res.status).toBe(401);


      });

         
      it('should  return 401 if the genre is not given a value ', async () => {
        token = User().generateToken()
         genre = ''
         const res =  await  execute()
         expect(res.status).toBe(401);
  

  });

     
  it('should  return 200 and save the genre if the user is logged in and data is validated succesfully ', async () => {
    token = User().generateToken()
     genre = 'genre2'
     const res =  await execute()
     const genres =   Genre.find({ name : genre})
     expect(res.status).toBe(200);
     expect(genres).toHaveProperty('_id', genres._id);
});

it('should  return a genre that was saved in the response ', async () => {
    token = User().generateToken()
    genre = 'genre2'
    const res =  await  execute()
    expect(res.status).toBe(200);
     expect(res.body).toHaveProperty('name' , 'genre2');
    


});

    });
       

    describe('PUT /:id', () => {
        
        it('should  return 401 if the user is not logged in ', async () => {
           const token = ''
           const genre = new Genre( { name: 'genre2'})
            await genre.save()
            const res =  await request(server).put('/api/genres/' + genre._id).set( 'x-auth-token' , token)
            expect(res.status).toBe(401);
            
        });

        it('should  return 400 if the token the user provided is invALID', async () => {
            const token = 'GRUIHREUYEY'
            const genre = new Genre( { name: 'genre2'})
             await genre.save()
             const res =  await request(server).put('/api/genres/' + genre._id).set( 'x-auth-token' , token)
             expect(res.status).toBe(400);
             
         });

         it('should  return 404 if the is id passed is invalid', async () => {
            const token = User().generateToken();
            const genre = new Genre( { name: 'genre2'})
             await genre.save()
             const res =  await request(server).put('/api/genres/1').set( 'x-auth-token' , token)
             expect(res.status).toBe(404);
             
         });

         it('should return 400 if the id is valid but no genre matches it', async () => {
            const id = mongoose.Types.ObjectId()
            console.log(id);
            const token = User().generateToken();
            const genre = new Genre( { name: 'genre2'})
             await genre.save()
             const res =  await request(server).put('/api/genres/' + id).set( 'x-auth-token' , token)
             expect(res.status).toBe(400);

         });

         it('should return 401 if the new genre passed has no value or lower than 5 or greater than 10  characters', async() => {
            const token = User().generateToken();
            const genre = new Genre( { name: 'genre2'})
            await genre.save()
            const res =  await request(server).put('/api/genres/' + genre._id).set( 'x-auth-token' , token).send( { name : 'gu'})
             expect(res.status).toBe(401);
         });

         it('should return 200 if the Genre is saved successfully', async() => {
            const token = User().generateToken();
            const genre = new Genre( { name: 'genre2'})
            await genre.save()
            const res =  await request(server).put('/api/genres/' + genre._id).set( 'x-auth-token' , token).send( { name : 'genre1'})
             expect(res.status).toBe(200);
             expect(res.body).toHaveProperty('name', 'genre1');
         });
    });

    describe('DELETE /:id', () => {

        it('should  return 401 if the user is not logged in ', async () => {
            const token = ''
            const genre = new Genre( { name: 'genre2'})
             await genre.save()
             const res =  await request(server).delete('/api/genres/' + genre._id).set( 'x-auth-token' , token)
             expect(res.status).toBe(401);
             
         });
 
         it('should  return 400 if the token the user provided is invALID', async () => {
             const token = 'GRUIHREUYEY'
             const genre = new Genre( { name: 'genre2'})
              await genre.save()
              const res =  await request(server).delete('/api/genres/' + genre._id).set( 'x-auth-token' , token)
              expect(res.status).toBe(400);
              
          });
 
         it('should return 200 if the genre is deleted from the database', async () => {

            const token = jwt.sign( { _id: 'helloworld' , isAdmin: true} , 'config.get("digitalsign")');
            const genre = new Genre( { name: 'genre2'})
              await genre.save()
            const res =  await request(server).delete('/api/genres/' + genre._id).set( 'x-auth-token' , token)
            expect(res.status).toBe(200)
             
         });
    });
})



