const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp'), ({
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
    console.log('MongoDB connected!');
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});

    for (let i = 0; i < 200; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '60f1d87daa4fee2e54047178',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem est modi illum cumque doloribus neque nostrum rem voluptatibus. Aliquam enim officia cum nisi voluptatum veritatis ratione, laborum aut impedit dolores.',
            price,
            geometry: {
                type: "Point",
                coordinates: [cities[random1000].longitude, cities[random1000].latitude]
            },
            images: [
                {
                    url: 'https://res.cloudinary.com/dlvlvxbxh/image/upload/v1626815815/YelpCamp/amynhqducoj9eziplfyb.jpg',
                    filename: 'YelpCamp/amynhqducoj9eziplfyb'

                },
                {
                    url: 'https://res.cloudinary.com/dlvlvxbxh/image/upload/v1626815815/YelpCamp/ie1zqghqx7dvoddqku2a.jpg',
                    filename: 'YelpCamp/ie1zqghqx7dvoddqku2a'

                }
            ]
        });
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
});