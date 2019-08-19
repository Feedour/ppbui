
    
const Boom = require('boom');
    const killRoute = {
        method: 'GET',
        path: '/kill/{id}',
        async handler(request) {
            const db = request.mongo.db;
 
            try {
                console.log('id :', request.params.id);
                const watcher = await db.collection('watchers')
                .findOne({ id: request.params.id});
                console.log('watcher :', watcher);

                if (watcher){
                    if (!watcher.active) {
                        const result = await db.collection('watchers')
                        .findOneAndUpdate(
                            { id: request.params.id},
                            { $set: {active: true, alive: true }},
                            { returnNewDocument: true }
                        );
                        return result;
                    } else {
                        const result = await db.collection('watchers')
                        .findOneAndUpdate(
                            { id: request.params.id},
                            { $set: { alive: false },
                              $inc: { deathCnt: 1}},
                            { returnNewDocument: true }
                        );
                        return result;
                    }
                }
                return Boom.notFound(`There is no watcher with id: ${request.params.id}`);
                //1. нашли наблюдателя
                //2. Если не актив - активируем - выходим
                //3. Если актив - убиваем - выходим

                //TODO: добавить урл на деактивацию + отхил всех
                // const result = await db.collection('watchers')
                // .findOneAndUpdate(
                //     { id: request.params.id},
                //     {
                //         $set: {alive: false},
                //         $inc: {deathCnt: 1}
                //     },
                //     {
                //         returnNewDocument: true
                //     }
                // );//_id: new ObjectID(request.params.id) });
                // console.log('result :', result);
                // return result;
            }
            catch (err) {
                console.log('err :', err);
                throw Boom.internal('Internal MongoDB error', err);
            }
        }
    }
    const healRoute = {
        method: 'GET',
        path: '/heal/{id}',
        async handler(request) {
            const db = request.mongo.db;
 
            try {
                console.log('id :', request.params.id);

                //TODO: если жив, то кидать ошибку
                const result = await db.collection('watchers')
                .findOneAndUpdate(
                    { id: request.params.id},
                    { $set: {alive: true},},
                    { returnNewDocument: true }
                );//_id: new ObjectID(request.params.id) });
                console.log('result :', result);
                return result;
            }
            catch (err) {
                console.log('err :', err);
                throw Boom.internal('Internal MongoDB error', err);
            }
        }
    }

    const allRoute = {
        method: 'GET',
        path: '/watchers',
        async handler(request) {
 
            const db = request.mongo.db;
            const ObjectID = request.mongo.ObjectID;
 
            try {
                const result = [];
                const watchers = await db.collection('watchers').find();//_id: new ObjectID(request.params.id) });
                await watchers.forEach((watcher) => {
                    console.log('watchers.next() :', watcher);
                    result.push(watcher);
                });
                return result;
            }
            catch (err) {
                throw Boom.internal('Internal MongoDB error', err);
            }
        }
}

    const deactivateAllRoute = {
            method: 'GET',
            path: '/watchers/deactivate',
            async handler(request) {
     
                const db = request.mongo.db;
                const ObjectID = request.mongo.ObjectID;
     
                try {
                    const result = db.collection('watchers')
                    .updateMany(
                        {},
                        { $set: {active: false, alive: true},},
                        { returnNewDocument: true})
                    
                    return result;
                }
                catch (err) {
                    throw Boom.internal('Internal MongoDB error', err);
                }
            }
    }
    const initAllRoute = {
        method: 'GET',
        path: '/watchers/init',
        async handler(request) {
 
            const db = request.mongo.db;
            const ObjectID = request.mongo.ObjectID;
 
            try {
                const result = db.collection('watchers')
                .updateMany(
                    {},
                    { $set: {active: true, alive: true, deathCnt: 0},},
                    { returnNewDocument: true})
                
                return result;
            }
            catch (err) {
                throw Boom.internal('Internal MongoDB error', err);
            }
        }
}
    const photoRoute = {
            method: 'GET',
            path: '/photo/{id}',
            async handler(request, h) {
                return h.file(`${request.params.id}.jpg`)
            }
    };
    module.exports = {killRoute, healRoute, allRoute, photoRoute, deactivateAllRoute, initAllRoute};