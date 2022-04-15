class User {
  constructor(user) {
    this.name = user.name;
    this.id = user.id;
    this.pantry = user.pantry;
    this.favoriteRecipes = [];
    this.recipesToCook = [];
  }

  toggleId(recipeId, dataArray) {
    if(!dataArray.includes(recipeId)){
      dataArray.push(recipeId)
    } else {
      dataArray.forEach((recipe, i) => {
        if(recipe === recipeId) {
          dataArray.splice(i, 1)
        }
      });
    }
  }

  toggleFavoriteRecipe(recipeId) {
    this.toggleId(recipeId, this.favoriteRecipes);
  }

  decideToCook(recipeId) {
    this.toggleId(recipeId,this.recipesToCook);
  }

  compareIngredients(recipe) {
    //access array of ingredients, per ingredient, look through pantry
    // see if pantry has ingredient, if so,
    //see if pantry ingredient has correct amount
    return recipe.ingredients.every(recipeIng => {
      let pantryIngredient = this.pantry.find(pantryIng => recipeIng.id === pantryIng.id);
      if (pantryIngredient && pantryIngredient.amount >= recipeIng.quantity.amount) {
        return true;
      }
    });
  }
}

export default User;
