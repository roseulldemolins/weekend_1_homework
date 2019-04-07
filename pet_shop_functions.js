myFunctions = {
  getName(petShop){
    return petShop.name
  },
  getTotalCash(petShop){
    return petShop.admin.totalCash
  },
  addOrRemoveCash(petShop, cash){
    petShop.admin.totalCash = petShop.admin.totalCash += cash
  },
  getPetsSold(petShop){
    return petShop.admin.petsSold
  },
  increasePetsSold(petShop, extraPetsSold){
    petShop.admin.petsSold = petShop.admin.petsSold += extraPetsSold
  },
  getStockCount(petShop){
    return petShop.pets.length
  },
  getPetsByBreed(petShop, breed){
    let total = 0;
      for (let pet of petShop.pets) {
        if (pet.breed === breed){
        total++;
      }
    }
  return total;
  },

getPetByName(petShop, petName){
  for (let pet of petShop.pets) {
    if (pet.name === petName){
      return pet};
    }
  },
removePetByName(petShop, petName){
  for(var i = petShop.pets.length-1; i >= 0; i--){
  if (petShop.pets[i].name === petName) {
  petShop.pets.splice(i,1);
      }
    }
  },

addPetToStock(petShop, newPet){
  petShop.pets.push(newPet)
  },
getCustomersCash(whichCustomer){
  return whichCustomer.cash
},
getCustomersCashTotal(customers){
  let total = 0;
  for (let customer of customers) {
    total += customer.cash };
    return total;
  },
removeCustomerCash(customer, AmountToRemove){
  customer.cash += -AmountToRemove
  },
getCustomerPetCount(customer){
  return customer.pets.length
},
addPetToCustomer(customer, newPet){
  customer.pets.push(newPet).length
},
customerCanAffordPet(customer, newPet){
  if(customer.cash >= newPet.price){
    return true};
  },

  sellPetToCustomer(petShop, pet, customer){
    if(!pet) return;
    if(!myFunctions.customerCanAffordPet(customer, pet)) return;
      myFunctions.removeCustomerCash(customer, pet.price);
      myFunctions.addOrRemoveCash(petShop, pet.price);
      myFunctions.removePetByName(petShop, pet.name);
      myFunctions.increasePetsSold(petShop, 1);
      myFunctions.addPetToCustomer(customer, pet);
    }
}
module.exports = myFunctions;
