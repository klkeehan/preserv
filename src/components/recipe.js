import '../App.css';
import recipesSet from '../data/recipes.json';
import Navbar from './navbar';
import React from 'react';
import Popup from 'reactjs-popup';
import { useState } from 'react';

const Recipe = ({pantryLoad, shoppingLoad, recipeLoad, accountLoad}) => {
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

            <button onClick={() => getPage("new")}>new</button>
            <Navbar pantryLoad={pantryLoad} shoppingLoad={shoppingLoad} recipeLoad={recipeLoad} accountLoad={accountLoad} />
        </div>
    );

    //individual recipe page, create a class name to style, use popup class for styling that.
    const recipePage = selectedRecipe && (
        <div>
                <div className="#">
                    <h3>{selectedRecipe.name}</h3>
                    <img className="recipies-image" src={selectedRecipe.image} alt={selectedRecipe.name} />
                    <Popup
                        trigger={<button>Add to Shopping List</button>}
                        modal
                        nested
                    >
                        {close => {
                            setTimeout(() => {
                                close();
                            }, 2000); // closes after 2 seconds

                            return (
                                <div className='modal'>
                                    <div className='content'>
                                        <p>Missing ingredients added to your shopping list!</p>
                                    </div>
                                </div>
                            );
                        }}
                    </Popup>
                    <button onClick={() => getPage("edit")}>Edit</button>
                    {/*This generates a list of ingredients based on the JSON data, adds a Missing text when it gets a 0 from the availablity section in the JSON file per each item*/}
                    <ul>{selectedRecipe.ingredients.map((item,index) =>(
                        <li key={index}>{item.trim()}
                        {selectedRecipe.available[index] === "0" && (
                                    <span> MISSING</span>
                        )}</li>
                    ))}</ul>
                    <h5>Instructions</h5>
                    <p>{selectedRecipe.instructions}</p>
                    <button onClick={() => getPage("home")}>back</button>
                </div>

        </div>
    )

    //recipe editing page
    let recipeEdit = selectedRecipe &&(
        <div class='recipie-edit'>
            <h1>Edit Recipe</h1>
            <label>Recipe Name:<input type="text" defaultValue={selectedRecipe.name} /></label>< br/>
            <label>Ingredients:<textarea defaultValue={selectedRecipe.ingredients}></textarea></label>< br/>
            <label>Instructions:<textarea defaultValue={selectedRecipe.instructions}></textarea></label>< br/>
            <label>Upload Image:<input type="file" accept="*" /></label>
            <button type="button">Take Picture</button>
            <button onClick={() => getPage("view")}>Save</button>
            <button onClick={() => getPage("view")}>Cancel</button>
        </div>

    )

    //recipe creation page
    let recipeNew = (
        <div class='recipie-edit'>
            <h1>New Recipe</h1>
            <label>Recipe Name:<input type="text"/></label>< br/>
            <label>Ingredients:<textarea></textarea></label>< br/>
            <label>Instructions:<textarea></textarea></label>< br/>
            <label>Upload Image:<input type="file" accept="*" /></label>
            <button type="button">Take Picture</button>
            <button onClick={() => getPage("view")}>Save</button>
            <button onClick={() => getPage("view")}>Cancel</button>
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
            {page === "home" && recipeHome}
            {page === "view" && recipePage}
            {page === "edit" && recipeEdit}
            {page === "new" && recipeNew}

        </div>
    );
}

export default Recipe;