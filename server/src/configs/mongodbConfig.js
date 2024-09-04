const mongoose = require('mongoose');
const {logger} = require('../configs/winstonConfig');

exports.connect = async () => {
    try {
        await mongoose.connect(process.env.API_DB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        logger.info('Connected to MongoDB');

    } catch (error) {
        logger.error('MongoDB connection error:', error);
    }
}
