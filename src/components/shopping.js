import '../App.css';
import itemSet from '../data/shopping.json';
import Navbar from './navbar';

const Shopping = ({pantryLoad, shoppingLoad, recipeLoad, accountLoad}) => {
    let shoppingPage = (
        <div>
            <h1>My Shopping List</h1>
            <div className='item-grid'>
                {itemSet.map((item) => (
                    <div key={item.id}>
                        <aside>
                            <h4>{item.name}</h4>
                            <p>Quantity: {item.quantity}</p>
                        </aside>
                        <input type="checkbox" />
                        <div className='divider'></div>
                    </div>
                ))}
            </div>
            <button>Remove</button>
            <button>add</button>
            <Navbar pantryLoad={pantryLoad} shoppingLoad={shoppingLoad} recipeLoad={recipeLoad} accountLoad={accountLoad} />
        </div>
    )
    return (
        <div>
            {shoppingPage}
        </div>
    );
}

export default Shopping;