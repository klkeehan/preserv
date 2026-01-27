import '../App.css';
import Navbar from './navbar';

const Pantry = ({pantryLoad, shoppingLoad, recipeLoad, accountLoad}) => {
    return (
        <div>
            <h1>Pantry</h1>
            <input type="search" placeholder='Search' />
            <div>
                <button>All</button>
                <button>Produce</button>
                <button>Proteins</button>
                <button>Dairy</button>
                <button>Grains</button>
                <button>Canned</button>
                <button>Condiments</button>
                <button>Beverages</button>
                <button>Frozen</button>
                <button>Snacks</button>
                <button>Other</button>
            </div>
            <div>
                
            </div>
            <Navbar pantryLoad={pantryLoad} shoppingLoad={shoppingLoad} recipeLoad={recipeLoad} accountLoad={accountLoad} />
        </div>
    );
}

export default Pantry;