import '../App.css';
import recipesSet from '../data/recipes.json';
import Navbar from './navbar';
import Popup from 'reactjs-popup';
import { useState } from 'react';
import add from '../assets/add-icon.png';
import x from '../assets/close.svg';
import camera from '../assets/camera-icon.svg';
import upload from '../assets/upload-icon.svg';

const Recipe = ({pantryLoad, shoppingLoad, recipeLoad, accountLoad}) => {
    const [page, getPage] = useState("home");
    const [selectedRecipe, getSelectedRecipe] = useState(null);
    //recipe home page, using map to generate recipe cards pulling from recipes.json until we get the backend set up
    let recipeHome = (
        <div className='layout'>
            <p className='recipe-heading'>My Recipes</p>
            <div className="recipes-grid">
                {recipesSet.map((recipe) => (
                    <div className="recipes-card" key ={recipe.id}>
                        <button className='recipe-button' onClick={() => {
                            getSelectedRecipe(recipe);
                            getPage("view");
                        }}>
                        <img className="recipes-image" src={recipe.image} alt={recipe.name} />
                        <p className='recipes-overlay'>{recipe.name}</p>
                        </button>
                    </div>
                ))}
            </div>

            <button className='add-button' onClick={() => getPage("new")}><img src={add} alt='add button' style={{width:'50px'}}></img></button>
            <Navbar pantryLoad={pantryLoad} shoppingLoad={shoppingLoad} recipeLoad={recipeLoad} accountLoad={accountLoad} />
        </div>
    );

    //individual recipe page, create a class name to style, use popup class for styling that.
    const recipePage = selectedRecipe && (
        <div>
        <div className='item-page'>
            <div className='recipe-header'>
                <p className='recipe-name'>{selectedRecipe.name}</p>
                <div className='recipe-buttons'>
                    <Popup trigger=
                        {<button className='item-button'><svg width="100%" height="auto" viewBox="0 0 70 70" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M59.5969 34.7223L64.9315 10.7536C65.3167 9.02297 64.0285 7.375 62.2906 7.375H17.9662L16.9318 2.21135C16.6741 0.924295 15.565 0 14.2784 0H2.70833C1.21254 0 0 1.23819 0 2.76562V4.60938C0 6.13681 1.21254 7.375 2.70833 7.375H10.5944L18.5217 46.9505C16.6252 48.0643 15.3472 50.1525 15.3472 52.5469C15.3472 56.1108 18.1765 59 21.6667 59C25.1568 59 27.9861 56.1108 27.9861 52.5469C27.9861 50.7407 27.2586 49.1089 26.0876 47.9375H49.7457C48.5748 49.1089 47.8472 50.7407 47.8472 52.5469C47.8472 56.1108 50.6765 59 54.1667 59C57.6568 59 60.4861 56.1108 60.4861 52.5469C60.4861 49.9919 59.0317 47.784 56.9225 46.7385L57.5451 43.9411C57.9302 42.2105 56.6421 40.5625 54.9041 40.5625H24.6139L23.8753 36.875H56.9559C58.2205 36.875 59.3167 35.9815 59.5969 34.7223Z" fill="var(--white)"/>
                            </svg></button>}
                            modal nested>
                            {close => {
                                setTimeout(() => {
                                    close();
                                }, 2000); // closes after 2 seconds

                                return (
                                    <div className='modal'>
                                        <div className='content'>
                                            <p className='popup-text3'>Missing ingredients added to your shopping list!</p>
                                        </div>
                                    </div>
                                );
                            }}
                        </Popup>
                    <button className='item-button' onClick={() => getPage("edit")} style={{marginLeft:'10px'}}>Edit</button>
                </div>
            </div>
            <div className='recipe-block'>
                <img className="recipes-image2" src={selectedRecipe.image} alt={selectedRecipe.name} />
                <div className='ing-list'>
                    <p className='recipe-label' style={{textIndent:'40px'}}>Ingredients</p>
                    {/*This generates a list of ingredients based on the JSON data, adds a Missing text when it gets a 0 from the availablity section in the JSON file per each item*/}
                    <ul className='recipe-text'>{selectedRecipe.ingredients.map((item,index) =>(
                        <li key={index}>{item.trim()}
                        {selectedRecipe.available[index] === "0" && (
                            <div className='missing-icon'></div>
                        )}</li>
                    ))}</ul>
                </div>
            </div>
            <p className='recipe-label'>Instructions</p>
            <p className='recipe-text'>{selectedRecipe.instructions}</p>
            </div>
            <button className='close-button' onClick={() => getPage("home")}><img src={x} style={{width:'70px'}} alt='exit button'></img></button>
        </div>
    )

    //recipe editing page
    let recipeEdit = selectedRecipe &&(
        <div>
            <div class='item-page'>
                <h1>Edit Recipe</h1>
                <div className='spacer' style={{height:'120px'}}></div>
                <label className='label2'>Recipe Name:<br></br><input type="text" defaultValue={selectedRecipe.name} className='item-input'/></label><br></br>
                <label className='label2'>Ingredients:<br></br><textarea defaultValue={selectedRecipe.ingredients}></textarea></label>< br/>
                <label className='label2'>Instructions:<br></br><textarea defaultValue={selectedRecipe.instructions}></textarea></label>< br/>
                <p className='label2'>Image:</p>
                <div className='image-opts'>
                    <input type='file' id='file' className='upload'></input><label for='file' className='image-input'>Upload <img src={upload} alt='upload icon' style={{height: '18px', marginLeft:'5px'}}></img></label>
                    <button className='image-input'><img src={camera} alt='camera icon' style={{height:'18px'}}></img></button>
                </div>
                <button onClick={() => getPage("view")} className='save-button'>Save</button>
            </div>
        <button className='close-button' onClick={() => getPage("view")}><img src={x} style={{width:'70px'}} alt='exit button'></img></button>
        </div>

    )

    //recipe creation page
    let recipeNew = (
        <div>
        <div class='item-page'>
            <h1>New Recipe</h1>
            <div className='spacer' style={{height:'120px'}}></div>
            <label className='label2'>Recipe Name:<input type="text" className='item-input'/></label>< br/>
            <label className='label2'>Ingredients:<textarea></textarea></label>< br/>
            <label className='label2'>Instructions:<textarea></textarea></label>< br/>
            <p className='label2'>Image:</p>
                <div className='image-opts'>
                    <input type='file' id='file' className='upload'></input><label for='file' className='image-input'>Upload <img src={upload} alt='upload icon' style={{height: '18px', marginLeft:'5px'}}></img></label>
                    <button className='image-input'><img src={camera} alt='camera icon' style={{height:'18px'}}></img></button>
                </div>
            <button onClick={() => getPage("home")} className='save-button'>Save</button>
            </div>
            <button className='close-button' onClick={() => getPage("home")}><img src={x} style={{width:'70px'}} alt='exit button'></img></button>
        </div>
    )

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