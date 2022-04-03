import Recipe from '../classes/Recipe';
import Ingredient from '../classes/Ingredient';
import User from '../classes/User';

class RecipeRepository {
  constructor(recipes, ingredients, user) {
    this.recipes = recipes.map(recipe => new Recipe(recipe));
    this.ingredients = ingredients.map(ingredient => new Ingredient(ingredient));
    this.currentRecipes = this.recipes;
    this.filteredRecipes = [];
    this.checkedTags = [];
    this.currentUser = new User(user);
  }

  checkTag(tag, nameInput){
    if(!this.checkedTags.includes(tag)){
      this.checkedTags.push(tag);
    } else {
      this.checkedTags.forEach((checkedTag, i) => {
        if(checkedTag === tag){
          this.checkedTags.splice(i, 1);
        }
      });
    }
    this.filterByName(nameInput);
  }

  resetFilteredRecipes(){
    this.currentRecipes = this.recipes;
    this.filteredRecipes = this.recipes;
  }

  filterByName(nameInput) {
    if (!nameInput) {
      nameInput = "";
    }
    this.resetFilteredRecipes();
    this.filteredRecipes = this.filteredRecipes.filter(recipe => recipe.name.toLowerCase().includes(nameInput.toLowerCase()));
    this.filterByTags();
  }

  filterByTags() {
    this.checkedTags.forEach(tag => {
      this.filteredRecipes = this.filteredRecipes.filter(recipe => recipe.tags.includes(tag) || (tag === "favorite" && this.currentUser.favoriteRecipes.includes(recipe.id)));
    });
    this.currentRecipes = this.filteredRecipes;
  }

  toggleFavorite(recipeId) {
    recipeId = parseInt(recipeId);
    this.currentUser.toggleFavoriteRecipe(recipeId);
  }

}

export default RecipeRepository;
