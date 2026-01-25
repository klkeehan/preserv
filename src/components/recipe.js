import '../App.css';
import recipesSet from '../data/recipes.json';
import Navbar from './navbar';
import React from 'react';
import { useState } from 'react';

function Recipe() {
    const [page, getPage] = useState("home");
    const [selectedRecipe, getSelectedRecipe] = useState(null);
    //recipe home page, using map to generate recipe cards pulling from recipes.json until we get the backend set up
    let recipeHome = (
        <div className='app'>
            <h1>My Recipes</h1>
            <div className="recipies-grid">
                {recipesSet.map((recipe) => (
                    <div className="recipies-card" key ={recipe.id}>
                        <button onClick={() => {
                            getSelectedRecipe(recipe);
                            getPage("view");
                        }}>
                        <img className="recipies-image" src={recipe.image} alt={recipe.name} />
                        </button>
                        <h4>{recipe.name}</h4>
                    </div>
                ))}
            </div>

            <button onClick={rEdit}>edit</button>
        </div>
    );

    //individual recipe page
    const recipePage = selectedRecipe && (
        <div>
                <div className="#" key ={selectedRecipe.id}>
                    <h3>{selectedRecipe.name}</h3>
                    <button onClick={null}>Add to Shopping List</button>
                    <button onClick={null}>Edit</button>
                    <img className="recipies-image" src={selectedRecipe.image} alt={selectedRecipe.name} />
                    <p>{selectedRecipe.ingredients}</p>
                    <h5>Instructions</h5>
                    <p>{selectedRecipe.instructions}</p>
                    <button onClick={() => getPage("home")}>back</button>
                </div>


        </div>
    )

    //recipe editing page
    let recipeEdit = (
        <div>
            <h1>Edit Recipe</h1>
        </div>
    )

    //recipe creation page
    let recipeNew = (
        <div>
            <h1>New Recipe</h1>
        </div>
    )

    let [content, setContent] = useState(recipeHome);

    function rPage() {
        setContent(recipePage)
    }

    function rEdit() {
        setContent(recipeEdit)
    }

    function rNew() {
        setContent(recipeNew)
    }

    return (
        <div>
            {/*{content}*/}
            {page === "home" && recipeHome}
            {page === "view" && recipePage}
            {page === "edit" && recipeEdit}
        </div>
    );
}

export default Recipe;