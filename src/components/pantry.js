import '../App.css';
import Navbar from './navbar';

const Pantry = ({pantryLoad, shoppingLoad, recipeLoad, accountLoad}) => {
    return (
        <div>
            <h1>Pantry</h1>
            <input type="search" />
            <Navbar pantryLoad={pantryLoad} shoppingLoad={shoppingLoad} recipeLoad={recipeLoad} accountLoad={accountLoad} />
        </div>
    );
}

export default Pantry;