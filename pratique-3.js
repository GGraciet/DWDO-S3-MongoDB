use("bank");

/*
Ajoutez à tous les clients le champ ”indice de confiance” valant 100.
*/

db.customers.updateMany(
  {},
  {
    $set: { confidenceIndex: 100 },
  }
);

/*
La catégorie “large_account” disparait, supprimez la de tous les clients.
*/

db.customers.updateMany(
  {},
  {
    $pull: { categories: "large_account" },
  }
);

/*
Les comptes sont maintenant plafonnés à 2.000.000 pour les entreprises et associations. 
Réduisez le montant des comptes si nécessaire.
*/

db.customers.updateMany(
  {
    categories: { $in: ["business", "association"] },
  },
  {
    $min: { balance: 2000000 },
  }
);

/*
Donnez la prime pro aux professionnels et associations en leur ajoutant 200€ sur leur compte. 
Ajoutez également l’opération de crédit (“IN”) correspondante.
*/

db.customers.updateMany(
  {
    categories: { $in: ["independant_pro", "association"] },
  },
  {
    $inc: {
      balance: 200,
    },
    $push: {
      history: {
        date: new Date(),
        amount: 200,
        type: "IN",
      },
    },
  }
);

/*
C’est l’heure des intérêts, augmentez le solde de tous les clients 
particuliers de 1,2 %.
*/

db.customers.updateMany(
  {
    categories: { $in: ["individual"] },
  },
  {
    $mul: { balance: 1.012 },
  }
);
