const Hapi = require('hapi'); 
const Inert = require('@hapi/inert');
const Boom = require('boom');

const launch = async () => {

    const dbOpts = {
        //url: 'mongodb://localhost:27017/local',
        url: 'mongodb://user:Admin10KMMR@89.208.211.127/MongoDB-8475',
        settings: {
            poolSize: 10
        },
        decorate: true
    };

    const server = new Hapi.Server({
        host: '0.0.0.0',
        port: 3000,
        routes: {
            cors: true
        }
    }); 

    await server.register([{
        plugin: require('hapi-mongodb'),
        options: dbOpts
    }, Inert]);

    server.route({
        method: 'GET',
        path: '/',
        handler: (request) => {
            return 'It\'s work!';
        }
    })

    const {killRoute, healRoute, allRoute, photoRoute, deactivateAllRoute} = require('./routes');
    server.route( {
        method: 'GET',
        path: '/users/{id}',
        async handler(request) {
 
            const db = request.mongo.db;
            const ObjectID = request.mongo.ObjectID;
 
            try {
                const result = await db.collection('watchers').findOne({ id: request.params.id});//_id: new ObjectID(request.params.id) });
                return result;
            }
            catch (err) {
                throw Boom.internal('Internal MongoDB error', err);
            }
        }
    });

    server.route(killRoute);
    server.route(healRoute);
    server.route(allRoute);
    //server.route(photoRoute);
    server.route(deactivateAllRoute);
    try { 
        await server.start(); 
    } catch (err) { 
        console.error(err); 
        process.exit(1); 
    }; 
    console.log(`Server running at ${server.info.uri}`); 
}
launch();