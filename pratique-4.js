use("new-bank");

db.createCollection("customers", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      title: "Customer schema",
      required: ["email", "balance", "categories"],
      properties: {
        email: {
          bsonType: "string",
          pattern:
            "[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?",
        },
        balance: {
          bsonType: "number",
          minimum: -20000,
        },
        categories: {
          bsonType: "array",
          items: {
            bsonType: "string",
            enum: [
              "independent_pro",
              "individual",
              "business",
              "association",
              "large_account",
              "investor",
            ],
          },
        },
        history: {
          bsonType: "array",
          items: {
            bsonType: "object",
            required: ["date", "amount", "type"],
            properties: {
              date: {
                bsonType: "date",
              },
              amount: {
                bsonType: "number",
              },
              type: {
                bsonType: "string",
                enum: ["IN", "OUT"],
              },
            },
          },
        },
        firstname: {
          bsonType: "string",
        },
        lastname: {
          bsonType: "string",
        },
        company: {
          bsonType: "string",
        },
      },
    },
  },
});
