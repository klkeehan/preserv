import '../App.css';

const Navbar = ({pantryLoad, shoppingLoad, recipeLoad, accountLoad}) => {
    return (
        <div class='navbar'>
            <button onClick={pantryLoad}>pantry</button>
            <button onClick={shoppingLoad}>shopping</button>
            <button onClick={recipeLoad}>recipe</button>
            <button onClick={accountLoad}>account</button>
        </div>
    );
}

export default Navbar;