import '../App.css';
import pantrySet from '../data/pantry.json';
import Item from './item';
import { useState } from 'react';
import Navbar from './navbar';

const Pantry = ({pantryLoad, shoppingLoad, recipeLoad, accountLoad}) => {
    let pantryHome = (
        <div className='layout'>
            <div className='pantry-header'>
                <h1>Pantry</h1>
                <input type="search" placeholder='Search' className='search-bar' />
            </div>
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
            <div className='pantry-grid'>
                {pantrySet.map((item) => (
                    <div key={item.id} className='pantry-item'>
                        <button className='pantry-button' onClick={() => setContent(<Item itemImg={item.image} itemStatus={item.status} itemName={item.name} itemQuantity={item.quantity} itemPurch={item.purchDate} itemExp={item.expDate} itemCat={item.category} pantryLoad={setContent(pantryHome)}/>)}><img src={item.image} className='pantry-image' alt={item.name}></img>
                        <p className='pantry-overlay'>{item.name}</p>
                        </button>
                    </div>
                ))}
            </div>
            <button onClick={() => setContent(pantryAdd)}>add</button>
            <Navbar pantryLoad={pantryLoad} shoppingLoad={shoppingLoad} recipeLoad={recipeLoad} accountLoad={accountLoad} />
        </div>
    );

    let [content, setContent] = useState(pantryHome);

    let pantryAdd = (
        <div>
            <h1>Pantry Add</h1>
            <div>
                <button>manual</button>
                <button>scan</button>
            </div>
            <label>Item Name: <input type='text' /></label>
            <label>Amount: <input type='number' /></label>
            <label>Date Purchased: <input type='date' /></label>
            <label>Expiration Date: <input type='date' /></label>
            <label>Item Type: <select name='type' >
                <option value='' disabled selected>Select</option>
                <option value='produce'>Produce</option>
                <option value='proteins'>Proteins</option>
                <option value='dairy'>Dairy</option>
                <option value='grains'>Grains</option>
                <option value='canned'>Canned</option>
                <option value='condiments'>Condiments</option>
                <option value='beverages'>Beverages</option>
                <option value='frozen'>Frozen</option>
                <option value='snacks'>Snacks</option>
                <option value='other'>Other</option>
            </select></label>
            <h3>Image:</h3>
            <label>a<input type="file" accept="*" /></label>
            <button>camera</button>
        </div>
    )

    return (
        <div>
            {content}
        </div>
    );
}

export default Pantry;