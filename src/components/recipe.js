import '../App.css';
import Navbar from './navbar';
import React from 'react';
import { useState } from 'react';

function Recipe() {
    //recipe home page
    let recipeHome = (
        <div>
            <h1>My Recipes</h1>
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