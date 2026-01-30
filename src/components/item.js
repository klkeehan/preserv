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
                    <button onClick={() => setContent(itemEdit)}>Edit</button>
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

    let itemEdit = (
        <div>
            <h1>Pantry Edit</h1>
            <label>Item Name: <input type='text' defaultValue={itemName} /></label>
            <label>Amount: <input type='number' defaultValue={itemQuantity} /></label>
            <label>Date Purchased: <input type='text' defaultValue={itemPurch} /></label>
            <label>Expiration Date: <input type='text' defaultValue={itemExp} /></label>
            <label>Item Type: <select name='type'>
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
            <img className='item-image' src={itemImg} alt={itemName}></img>
            <label>a<input type="file" accept="*" /></label>
            <button>camera</button>
            <button onClick={() => setContent(item)}>Save Item</button>
            <button onClick={() => setContent(item)}>x</button>
        </div>
    );

    return (
        <div>
            {content}
        </div>
    )
}

export default Item;