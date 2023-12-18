use("bank");

db.customers.insertMany([
    {
        firstname: "John",
        lastname: "Doe",
        email: "john@doe.com",
        phone: "+33123456789",
        categories: ["individual"],
        balance: 1000,
        history: [
            {date: new Date(), amount: 200, type: "IN"},
            {date: new Date(), amount: 200, type: "OUT"},
        ]
    },
    {
        firstname: "Jane",
        lastname: "Doe",
        email: "jane@doe.com",
        phone: "+33123456789",
        categories: ["individual", "large_account", "investor"],
        balance: 854000,
        history: [
            {date: new Date(), amount: 25840, type: "IN"},
        ]
    },
    {
        company: "Acme",
        email: "contact@acme.com",
        phone: "+33123456789",
        categories: ["business", "large_account"],
        balance: 12078000,
        history: [
            {date: new Date(), amount: 123840, type: "IN"},
            {date: new Date(), amount: 120, type: "OUT"},
            {date: new Date(), amount: 29040, type: "IN"},
        ]
    },
    {
        company: "Hack me",
        email: "contact@hack-me.com",
        phone: "+33123456789",
        categories: ["business"],
        balance: 1207,
        history: [
            {date: new Date(), amount: 100, type: "IN"},
        ]
    },
    {
        company: "Love animals",
        email: "contact@love-animals.com",
        phone: "+33123456789",
        categories: ["association"],
        balance: 10000,
        history: [
            {date: new Date(), amount: 100, type: "IN"},
        ]
    }
]);

/* 
J’en ai marre des clients trop riches qui ont plus de 100.000€ 
et qui ne sont pas des entreprises (independent_pro ou business) ! 
Faites moi une liste de leur nom, prénom et adresse email 
uniquement, je veux les dénoncer au fisc, c’est surement des escrocs
*/

db.customers.find({
    balance: {$gt: 100000},
    categories: {$nin: ["independent_pro", "business"]}
});

/*
Je veux téléphoner à :
mes clients particuliers et associations dont le solde est compris entre 1.000 et 5.000€
OU 
mes clients investisseurs dont le solde est compris ente 150.000€ et 800.000€.
	Donnez-moi une liste de leurs nom, prénom et numéro de téléphone.
*/

db.customers.find({
    $or: [
        {
            balance: {$gte: 1000, $lte: 5000},
            categories: {$in: ["individual", "association"]}
        },
        {
            balance: {$gte: 150000, $lte: 800000},
            categories: {$in: ["investor"]}
        }
    ]
}, {
    lastname: 1,
    firstname: 1,
    phone: 1,
    _id: 0
});

/*
Vous ne trouvez pas que les gros virements sortants c’est louche ? 
Listez tous les clients qui ont dans leur historique un virement sortant 
de plus 20.000€ !  .”
*/

db.customers.find({
    history: {$elemMatch: {amount: {$gt: 20000}, type: "IN"}}
});

db.customers.find({
    "history.amount": {$gt: 20000}, "history.type": "IN"
});

/*
Donnez-moi le solde et l’identifiant des clients qui ont une seule opération 
dans leur historique..
*/

db.customers.find({
    history: {$size: 1}
}, {
    balance: 1
});
