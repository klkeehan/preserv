import '../App.css';
import itemSet from '../data/shopping.json';
import Navbar from './navbar';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

const Shopping = ({ pantryLoad, shoppingLoad, recipeLoad, accountLoad }) => {
    let shoppingPage = (
        <div className='layout'>
            <div className='shopping-header'>
                <h1>My Shopping List</h1>
            </div>
            <div className='shopping-list'>
                {itemSet.map((item) => (
                    <div key={item.id}>
                        <div className='shopping-item'>
                            <aside className='shopping-info'>
                                <h4>{item.name}</h4>
                                <p>Quantity: {item.quantity}</p>
                            </aside>
                            <input type="checkbox" />
                        </div>
                        <div className='divider'></div>
                    </div>
                ))}
            </div>
            <div className='button-bar'>
                <Popup trigger=
                    {<button>Remove</button>}
                    modal nested>
                    {
                        close => (
                            <div className='shopping-remove-popup'>
                                <div className='content'>
                                    <p>Remove items from shopping list?</p>
                                </div>
                                <div>
                                    <button className='remove-confirm' onClick={() => close()}>Remove</button>
                                    <button className='remove-cancel' onClick={() => close()}>Cancel</button>
                                </div>
                            </div>
                        )
                    }
                </Popup>
                <Popup trigger=
                    {<button>add</button>}
                    modal nested>
                    {
                        close => (
                            <div className='shopping-add-popup'>
                                <div className='content'>
                                    <label>Item Name: <input type='text' /></label>
                                    <label>Amount: <input type='number' /></label>
                                </div>
                                <div>
                                    <button className='add-confirm' onClick={() => close()}>Confirm</button>
                                </div>
                            </div>
                        )
                    }
                </Popup>
            </div>
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