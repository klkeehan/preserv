import '../App.css';
import { useState } from 'react';
import Pantry from './pantry';

const Item = ({itemImg, itemStatus, itemName, itemQuantity, itemPurch, itemExp, itemCat}) => {
    let item = (
        <div>
            <div>
                <img className='item-image' src={itemImg} alt={itemName}></img>
                <aside>
                    <button>Edit</button>
                    <button>Trash</button>
                    <button>Cart</button>
                </aside>
            </div>
            <p>{itemStatus}</p>
            <h3>Item Name:</h3>
            <p>{itemName}</p>
            <h3>Amount:</h3>
            <p>{itemQuantity}</p>
            <button>up</button>
            <button>down</button>
            <h3>Date Purchased:</h3>
            <p>{itemPurch}</p>
            <h3>Expiration Date:</h3>
            <p>{itemExp}</p>
            <h3>Category:</h3>
            <p>{itemCat}</p>
            <button onClick={() => setContent(<Pantry />)}>back</button>
        </div>
    );

    let [content, setContent] = useState(item);

    return (
        <div>
            {content};
        </div>
    )
}

export default Item;