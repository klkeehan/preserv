import '../App.css';
import { useState } from 'react';
import Pantry from './pantry';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

const Item = ({itemImg, itemStatus, itemName, itemQuantity, itemPurch, itemExp, itemCat, loadPantry}) => {
    let item = (
        <div>
            <div>
                <img className='item-image' src={itemImg} alt={itemName}></img>
                <aside className='item-column'>
                    <button>Edit</button>
                    <Popup trigger=
                        {<button>Trash</button>}
                        modal nested>
                        {
                            close => (
                                <div className='modal'>
                                    <div className='content'>
                                        <p>Are you sure you want to trash this item?</p>
                                    </div>
                                <div>
                                    <button onClick={() => {setContent(<Pantry />)}}>Confirm</button>
                                </div>
                            </div>
                            )
                        }
                    </Popup>
                    <Popup trigger=
                        {<button>cart</button>}
                        modal nested>
                        {
                            close => (
                                <div className='modal'>
                                    <div className='content'>
                                        <p>What quantity would you like to add?</p>
                                        <label>Amount: <input type='number' /></label>
                                    </div>
                                <div>
                                    <button onClick={() => {close()}}>Confirm</button>
                                </div>
                            </div>
                            )
                        }
                    </Popup>
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
            <h3>Nutrition Facts</h3>
            <button onClick={() => {setContent(<Pantry />)}}>back</button>
        </div>
    );

    let [content, setContent] = useState(item);

    return (
        <div>
            {content}
        </div>
    )
}

export default Item;