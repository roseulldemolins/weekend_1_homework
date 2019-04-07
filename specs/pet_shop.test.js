const myFunctions = require('../pet_shop_functions');

describe('pet shop', () => {

  let petShop;
  let customers;
  let newPet;

  beforeEach(() => {

    customers = [
      {
        name: "Alice",
        pets: [],
        cash: 1000
      },
      {
        name: "Bob",
        pets: [],
        cash: 50
      }
    ]

    newPet = {
      name: "Bors the Younger",
      petType: "cat",
      breed: "Cornish Rex",
      price: 100
    }

    petShop = {
      pets: [
        {
          name: "Sir Percy",
          petType: "cat",
          breed: "British Shorthair",
          price: 500
        },
        {
          name: "King Bagdemagus",
          petType: "cat",
          breed: "British Shorthair",
          price: 500
        },
        {
          name: "Sir Lancelot",
          petType: "dog",
          breed: "Pomsky",
          price: 1000,
        },
        {
          name: "Arthur",
          petType: "dog",
          breed: "Husky",
          price: 900,
        },
        {
          name: "Tristan",
          petType: "dog",
          breed: "Basset Hound",
          price: 800,
        },
        {
          name: "Merlin",
          petType: "cat",
          breed: "Egyptian Mau",
          price: 1500,
        }
      ],
      admin: {
        totalCash: 1000,
        petsSold: 0,
      },
      name: "Camelot of Pets"
    }

  });

  test('has name Camelot of Pets', () => {
    expect(myFunctions.getName(petShop)).toBe("Camelot of Pets");
  });

  test('has correct total cash', () => {
    expect(myFunctions.getTotalCash(petShop)).toBe(1000);
  });

  test('can add cash', () => {
    myFunctions.addOrRemoveCash(petShop, 10);
    expect(myFunctions.getTotalCash(petShop)).toBe(1010);
  });

  test('can remove cash', () => {
    myFunctions.addOrRemoveCash(petShop, -10);
    expect(myFunctions.getTotalCash(petShop)).toBe(990);
  });

  test('can get number of pets sold', () => {
    expect(myFunctions.getPetsSold(petShop)).toBe(0);
  });

  test('can increase number of pets sold', () => {
    myFunctions.increasePetsSold(petShop, 2);
    expect(myFunctions.getPetsSold(petShop)).toBe(2);
  });

  test('can get stock count', () => {
    expect(myFunctions.getStockCount(petShop)).toBe(6);
  });

  test('can get pets by breed', () => {
    expect(myFunctions.getPetsByBreed(petShop, "British Shorthair")).toBe(2);
  });

  test('returns 0 if not pet by breed found', () => {
    expect(myFunctions.getPetsByBreed(petShop, "Dalmation")).toBe(0);
  });

  test('finds a pet by name', () => {
    expect(myFunctions.getPetByName(petShop, "Arthur"))
      .toEqual(
        {
          name: "Arthur",
          petType: "dog",
          breed: "Husky",
          price: 900,
        }
      );
  });

  test('returns undefined if pet is not found by name', () => {
    expect(myFunctions.getPetByName(petShop, "Fred")).toBeUndefined();
  });

  test('can remove all pets called Arthur', () => {
    // HINT: You can loop round an array starting at the end
    // using for(var i = shop.pets.length-1; i >= 0; i--){}
    myFunctions.removePetByName(petShop, "Arthur");
    expect(myFunctions.getPetByName(petShop, "Arthur")).toBeUndefined();
  });

  test('can add a new pet to stock', () => {
    myFunctions.addPetToStock(petShop, newPet);
    expect(myFunctions.getStockCount(petShop)).toBe(7);
  });

  test('can get a customers cash', () => {
    expect(myFunctions.getCustomersCash(customers[0])).toBe(1000);
  });

  test('can get total customers cash', () => {
    expect(myFunctions.getCustomersCashTotal(customers)).toBe(1050);
  });

  test('can remove customers cash', () => {
    myFunctions.removeCustomerCash(customers[0], 100);
    expect(customers[0].cash).toBe(900);
  });

  test('can get number of pets for a customer', () => {
    expect(myFunctions.getCustomerPetCount(customers[0])).toBe(0);
  });

  test('can add a pet to a customer', () => {
    myFunctions.addPetToCustomer(customers[0], newPet);
    expect(myFunctions.getCustomerPetCount(customers[0])).toBe(1);
  });

  // EXTENSIONS

  test('customer CANT afford a pet', () => {;
    expect(myFunctions.customerCanAffordPet(customers[1], newPet)).toBeFalsy();
  });

  test('customer CAN afford a pet', () => {;
    expect(myFunctions.customerCanAffordPet(customers[0], newPet)).toBeTruthy();
  });

  // These are 'integration' tests so we want multiple assertions.
  // If one fails the entire test should fail

  test('customer can buy a pet', () => {
    var customer = customers[0];
    var pet = myFunctions.getPetByName(petShop, "Arthur");
    myFunctions.sellPetToCustomer(petShop, pet, customer);

    expect(myFunctions.getCustomerPetCount(customers[0])).toBe(1);
    expect(myFunctions.getPetsSold(petShop)).toBe(1);
    expect(myFunctions.getCustomersCash(customer)).toBe(100);
    expect(myFunctions.getTotalCash(petShop)).toBe(1900);
  });

  test('customer cant buy a pet that doesnt exist', () => {
    var customer = customers[0];
    var pet = myFunctions.getPetByName(petShop, "Dave");
    myFunctions.sellPetToCustomer(petShop, pet, customer);

    expect(myFunctions.getCustomerPetCount(customers[0])).toBe(0);
    expect(myFunctions.getPetsSold(petShop)).toBe(0);
    expect(myFunctions.getCustomersCash(customer)).toBe(1000);
    expect(myFunctions.getTotalCash(petShop)).toBe(1000);
  });

  test('customer cant buy a pet if they cant afford it', () => {
    var customer = customers[1];
    var pet = myFunctions.getPetByName(petShop, "Athur");
    myFunctions.sellPetToCustomer(petShop, pet, customer);

    expect(myFunctions.getCustomerPetCount(customers[0])).toBe(0);
    expect(myFunctions.getPetsSold(petShop)).toBe(0);
    expect(myFunctions.getCustomersCash(customer)).toBe(50);
    expect(myFunctions.getTotalCash(petShop)).toBe(1000);
  });

})
