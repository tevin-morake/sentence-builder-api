const postRoutes = require('./../routes/postRoutes');
const getRoutes = require('./../routes/getRoutes');

const initRoutes = server => {
    server.use('/api/get', getRoutes);
    server.use('/api/post', postRoutes)
}
module.exports = {
    init: initRoutes
};
