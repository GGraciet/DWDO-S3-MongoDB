/* Pratique 1 */

// Point 1
use("pratique-1-dwdos3");

function randomLoyaltyPoints() {
    return Math.floor(Math.random() * 1000);
}

// Point 2
db.customers.insertMany([
    {
        firstname: "John",
        lastname: "Doe",
        email: "john.doe@gmail.com",
        phone: "514-111-1111",
        loyaltyPoints: randomLoyaltyPoints(),
        history: [
            {
                product: "iPhone",
                price: 1000,
            },
            {
                product: "iPad",
                price: 500,
            },
        ]
    },
    {
        firstname: "Jane",
        lastname: "Doe",
        email: "jane.doe@gmail.com",
        phone: "514-222-2222",
        loyaltyPoints: randomLoyaltyPoints(),
        history: [
            {
                product: "MacBook",
                price: 2000,
            },
            {
                product: "iPad",
                price: 500,
            },
        ]
    },
    {
        firstname: "Bob",
        lastname: "Lenon",
        email: "gastonmenton@gmail.com",
        phone: "514-333-3333",
        loyaltyPoints: randomLoyaltyPoints(),
        history: [
            {
                product: "iPhone",
                price: 1000,
            },
        ]
    }
]);

// Point 3
db.customers.find({});

// Point 4
db.customers.updateOne({email: "jane.doe@gmail.com"}, {$push: {history: {product: "The iChiffonette", price: 65}}});

// Point 5
db.customer.deleteOne({email: "gastonmenton@gmail.com"});

// Variante point 5 - Suppression aléatoire
// const ids = db.customers.find({lastname: {$ne: "Doe"}}, {_id: 1}).toArray().map(({_id}) => _id);
// const randomIndex = Math.floor(Math.random() * ids.length);
// db.customers.deleteOne({_id: ids[randomIndex]});

// Point 6
db.customers.find({lastname: "Doe"}, {_id: 0, history: 1, email: 1});

// Point 7
db.customers.find({loyaltyPoints: {$gte: 20, $lte: 50}});

// Point 8
db.customers.deleteMany({history: {$size: 0}, loyaltyPoints: {$lt: 20}});