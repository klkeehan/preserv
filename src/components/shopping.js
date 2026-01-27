import '../App.css';
import itemSet from '../data/shopping.json';
import Navbar from './navbar';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

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
            <Popup trigger=
                {<button>add</button>}
                modal nested>
                {
                    close => (
                        <div className='modal'>
                            <div className='content'>
                                <label>Item Name: <input type='text' /></label>
                                <label>Amount: <input type='number' /></label>
                            </div>
                            <div>
                                <button onClick={() => close()}>Confirm</button>
                            </div>
                        </div>
                    )
                }
                </Popup>
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