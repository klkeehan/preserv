import '../App.css';
import pantrySet from '../data/pantry.json';
import Item from './item';
import { useState } from 'react';
import Navbar from './navbar';

const Pantry = ({pantryLoad, shoppingLoad, recipeLoad, accountLoad}) => {
    let pantryHome = (
        <div className='layout'>
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
            <div className='pantry-grid'>
                {pantrySet.map((item) => (
                    <div key={item.id} className='pantry-item'>
                        <button className='pantry-button' onClick={() => setContent(<Item itemImg={item.image} itemStatus={item.status} itemName={item.name} itemQuantity={item.quantity} itemPurch={item.purchDate} itemExp={item.expDate} itemCat={item.category} />)}><img src={item.image} className='pantry-image' alt={item.name}></img></button>
                        <div>
                            <p className='pantry-overlay'>{item.name}</p>
                        </div>
                    </div>
                ))}
            </div>
            <button>add</button>
            <Navbar pantryLoad={pantryLoad} shoppingLoad={shoppingLoad} recipeLoad={recipeLoad} accountLoad={accountLoad} />
        </div>
    )

    let [content, setContent] = useState(pantryHome);

    return (
        <div>
            {content};
        </div>
    );
}

export default Pantry;