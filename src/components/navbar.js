import '../App.css';

function Navbar({pantryLoad,shoppingLoad, recipeLoad, accountLoad}) {
    return (
        <div class='navbar'>
            <button onClick={pantryLoad}></button>
            <button onClick={shoppingLoad}></button>
            <button onClick={recipeLoad}></button>
            <button onClick={accountLoad}></button>
        </div>
    );
}

export default Navbar;