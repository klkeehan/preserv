import '../App.css';
import recipesSet from '../data/recipes.json';
import Navbar from './navbar';
import React from 'react';
import { useState } from 'react';

function Recipe() {

    //recipe home page, using map to generate recipe cards pulling from recipes.json until we get the backend set up
    let recipeHome = (
        <div className='app'>
            <h1>My Recipes</h1>
            <div className="recipies-grid">
                {recipesSet.map((recipe) => (
                    <div className="recipies-card" key ={recipe.id}>
                        <img className="recipies-image" src={recipe.image} alt={recipe.name} />
                        <h4>{recipe.name}</h4>
                    </div>
                ))}
            </div>

            <button onClick={rEdit}>edit</button>
        </div>
    );

    //individual recipe page
    let recipePage = (
        <div>
            <h1>Recipe Title</h1>
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
            {content}
        </div>
    );
}

export default Recipe;