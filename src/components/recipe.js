import '../App.css';
//import recipesSet from '../data/recipes.json';
import Popup from 'reactjs-popup';
import { useState, useEffect, use } from 'react';
import add from '../assets/add-icon.png';
import x from '../assets/close.svg';
import camera from '../assets/camera-icon.svg';
import upload from '../assets/upload-icon.svg';
import axios from 'axios';

const Recipe = ({pantryLoad, shoppingLoad, recipeLoad, accountLoad}) => {
    const [page, getPage] = useState("home");
    const [selectedRecipe, getSelectedRecipe] = useState(null);
    const  [recipesSet, setRecipesSet] = useState([]);

    useEffect(() => {
        const fetchRecipes = async () => {
            try {
                const response = await axios.get('https://students.gaim.ucf.edu/~ka822136/preserv/backend/recipes.php');
                setRecipesSet(response.data);
            } catch (error) {console.error('Error fetching recipes:', error);}
        };
        fetchRecipes();
        }, []);
    //recipe home page, using map to generate recipe cards pulling from recipes.json until we get the backend set up
    let recipeHome = (
        <div className='layout'>
            <h1>My Recipes</h1>
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

            <button className='add-button' onClick={() => getPage("new")}><img src={add} alt='add button' style={{width:'42px', height:'43px'}}></img></button>
            <div class='navbar'>
                <button className='nav-button' onClick={pantryLoad}><svg width="48" height="59" viewBox="0 0 48 59" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M23.9885 1.75172C24.0808 2.29332 25.8462 12.6413 25.8462 16.5939C25.8462 22.6206 22.6385 26.9188 17.8962 28.6474L19.3846 56.0846C19.4654 57.6633 18.2077 59 16.6154 59H9.23077C7.65 59 6.38077 57.6748 6.46154 56.0846L7.95 28.6474C3.19615 26.9188 0 22.6091 0 16.5939C0 12.6298 1.76538 2.29332 1.85769 1.75172C2.22692 -0.587529 7.08462 -0.622099 7.38462 1.87848V18.1495C7.53462 18.5413 9.12692 18.5183 9.23077 18.1495C9.39231 15.2341 10.1423 2.10895 10.1538 1.80934C10.5346 -0.587529 15.3115 -0.587529 15.6808 1.80934C15.7038 2.12047 16.4423 15.2341 16.6038 18.1495C16.7077 18.5183 18.3115 18.5413 18.45 18.1495V1.87848C18.75 -0.610576 23.6192 -0.587529 23.9885 1.75172ZM37.7423 34.6741L36.0115 56.0039C35.8731 57.6172 37.1538 59 38.7692 59H45.2308C46.7654 59 48 57.767 48 56.2344V2.76578C48 1.24469 46.7654 0.000164712 45.2308 0.000164712C35.7115 0.000164712 19.6846 20.5694 37.7423 34.6741Z"/>
                </svg></button>
                <button className='nav-button' onClick={shoppingLoad}><svg width="65" height="59" viewBox="0 0 65 59" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M59.5969 34.7223L64.9315 10.7536C65.3167 9.02297 64.0285 7.375 62.2906 7.375H17.9662L16.9318 2.21135C16.6741 0.924295 15.565 0 14.2784 0H2.70833C1.21254 0 0 1.23819 0 2.76562V4.60938C0 6.13681 1.21254 7.375 2.70833 7.375H10.5944L18.5217 46.9505C16.6252 48.0643 15.3472 50.1525 15.3472 52.5469C15.3472 56.1108 18.1765 59 21.6667 59C25.1568 59 27.9861 56.1108 27.9861 52.5469C27.9861 50.7407 27.2586 49.1089 26.0876 47.9375H49.7457C48.5748 49.1089 47.8472 50.7407 47.8472 52.5469C47.8472 56.1108 50.6765 59 54.1667 59C57.6568 59 60.4861 56.1108 60.4861 52.5469C60.4861 49.9919 59.0317 47.784 56.9225 46.7385L57.5451 43.9411C57.9302 42.2105 56.6421 40.5625 54.9041 40.5625H24.6139L23.8753 36.875H56.9559C58.2205 36.875 59.3167 35.9815 59.5969 34.7223Z"/>
                </svg></button>
                <button className='nav-button-active' onClick={recipeLoad}><svg width="55" height="63" viewBox="0 0 55 63" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M55 44.2969V2.95312C55 1.3166 53.6864 0 52.0536 0H11.7857C5.27902 0 0 5.29102 0 11.8125V51.1875C0 57.709 5.27902 63 11.7857 63H52.0536C53.6864 63 55 61.6834 55 60.0469V58.0781C55 57.1553 54.5703 56.3186 53.9074 55.7771C53.3917 53.8822 53.3917 48.4805 53.9074 46.5855C54.5703 46.0564 55 45.2197 55 44.2969ZM15.7143 16.4883C15.7143 16.0822 16.0458 15.75 16.4509 15.75H42.4777C42.8828 15.75 43.2143 16.0822 43.2143 16.4883V18.9492C43.2143 19.3553 42.8828 19.6875 42.4777 19.6875H16.4509C16.0458 19.6875 15.7143 19.3553 15.7143 18.9492V16.4883ZM15.7143 24.3633C15.7143 23.9572 16.0458 23.625 16.4509 23.625H42.4777C42.8828 23.625 43.2143 23.9572 43.2143 24.3633V26.8242C43.2143 27.2303 42.8828 27.5625 42.4777 27.5625H16.4509C16.0458 27.5625 15.7143 27.2303 15.7143 26.8242V24.3633ZM46.8237 55.125H11.7857C9.61272 55.125 7.85714 53.3654 7.85714 51.1875C7.85714 49.0219 9.625 47.25 11.7857 47.25H46.8237C46.5904 49.3541 46.5904 53.0209 46.8237 55.125Z"/>
                </svg></button>
                <button className='nav-button' onClick={accountLoad}><svg width="59" height="59" viewBox="0 0 59 59" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M29.5 33.1875C38.6611 33.1875 46.0938 25.7549 46.0938 16.5938C46.0938 7.43262 38.6611 0 29.5 0C20.3389 0 12.9062 7.43262 12.9062 16.5938C12.9062 25.7549 20.3389 33.1875 29.5 33.1875ZM44.25 36.875H37.9006C35.3424 38.0504 32.4961 38.7188 29.5 38.7188C26.5039 38.7188 23.6691 38.0504 21.0994 36.875H14.75C6.60293 36.875 0 43.4779 0 51.625V53.4688C0 56.5225 2.47754 59 5.53125 59H53.4688C56.5225 59 59 56.5225 59 53.4688V51.625C59 43.4779 52.3971 36.875 44.25 36.875Z"/>
                </svg></button>
            </div>
        </div>
    );

    //individual recipe page, create a class name to style, use popup class for styling that.
    const recipePage = selectedRecipe && (
        <div>
        <div className='item-page'>
            <div className='recipe-header'>
                <p className='recipe-name'>{selectedRecipe.name}</p>
                <div className='recipe-buttons'>
                    <Popup contentStyle={{width:'273px'}} trigger={<button className='item-button'><svg width="100%" height="auto" viewBox="0 0 70 70" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M59.5969 34.7223L64.9315 10.7536C65.3167 9.02297 64.0285 7.375 62.2906 7.375H17.9662L16.9318 2.21135C16.6741 0.924295 15.565 0 14.2784 0H2.70833C1.21254 0 0 1.23819 0 2.76562V4.60938C0 6.13681 1.21254 7.375 2.70833 7.375H10.5944L18.5217 46.9505C16.6252 48.0643 15.3472 50.1525 15.3472 52.5469C15.3472 56.1108 18.1765 59 21.6667 59C25.1568 59 27.9861 56.1108 27.9861 52.5469C27.9861 50.7407 27.2586 49.1089 26.0876 47.9375H49.7457C48.5748 49.1089 47.8472 50.7407 47.8472 52.5469C47.8472 56.1108 50.6765 59 54.1667 59C57.6568 59 60.4861 56.1108 60.4861 52.5469C60.4861 49.9919 59.0317 47.784 56.9225 46.7385L57.5451 43.9411C57.9302 42.2105 56.6421 40.5625 54.9041 40.5625H24.6139L23.8753 36.875H56.9559C58.2205 36.875 59.3167 35.9815 59.5969 34.7223Z" fill="var(--white)"/>
                        </svg></button>} modal nested>
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
                    <h4 style={{textIndent:'40px'}}>Ingredients</h4>
                    {/*This generates a list of ingredients based on the JSON data, adds a Missing text when it gets a 0 from the availablity section in the JSON file per each item*/}
                    <ul className='body-text'>{selectedRecipe.ingredients.map((item,index) =>(
                        <li key={index}>{item.trim()}
                        {/*{selectedRecipe.available[index] === "0" && (
                            <div className='missing-icon'></div>
                        )}FOR THE LOVE OF GOD AND DAN NOVATNAK REMEMBER TO WRITE LOGIC FOR AVAILABILITY OF THE INGREDIENTS*/}</li>
                    ))}</ul>
                </div>
            </div>
            <h4>Instructions</h4>
            <p className='body-text'>{selectedRecipe.instructions}</p>
            </div>
            <button className='close-button' onClick={() => getPage("home")}><img src={x} style={{width:'70px'}} alt='exit button'></img></button>
        </div>
    )

    //recipe editing page
    let recipeEdit = selectedRecipe &&(
        <div>
            <div class='item-page'>
                <h2>Edit Recipe</h2>
                <div className='spacer' style={{height:'120px'}}></div>
                <label className='label2'>Recipe Name:<br></br><input type="text" defaultValue={selectedRecipe.name} className='item-input'/></label><br></br>
                <label className='label2'>Ingredients:<br></br><textarea defaultValue={selectedRecipe.ingredients}></textarea></label>< br/>
                <label className='label2'>Instructions:<br></br><textarea defaultValue={selectedRecipe.instructions}></textarea></label>< br/>
                <p className='label2'>Image:</p>
                <div className='image-opts'>
                    <input type='file' id='file' className='upload'></input><label for='file' className='image-input'>Upload <img src={upload} alt='upload icon' style={{height: '18px', marginLeft:'5px'}}></img></label>
                    <button className='image-input'><img src={camera} alt='camera icon' style={{height:'18px'}}></img></button>
                </div>
                <button onClick={() => getPage("view")} className='save-button'>Save Recipe</button>
            </div>
        <button className='close-button' onClick={() => getPage("view")}><img src={x} style={{width:'70px'}} alt='exit button'></img></button>
        </div>

    )

    //recipe creation page
    let recipeNew = (
        <div>
        <div class='item-page'>
            <h2>New Recipe</h2>
            <div className='spacer' style={{height:'120px'}}></div>
            <label className='label2'>Recipe Name:<input type="text" className='item-input'/></label>< br/>
            <label className='label2'>Ingredients:<textarea></textarea></label>< br/>
            <label className='label2'>Instructions:<textarea></textarea></label>< br/>
            <p className='label2'>Image:</p>
                <div className='image-opts'>
                    <input type='file' id='file' className='upload'></input><label for='file' className='image-input'>Upload <img src={upload} alt='upload icon' style={{height: '18px', marginLeft:'5px'}}></img></label>
                    <button className='image-input'><img src={camera} alt='camera icon' style={{height:'18px'}}></img></button>
                </div>
            <button onClick={() => getPage("home")} className='save-button'>Save Recipe</button>
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