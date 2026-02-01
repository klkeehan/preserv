import '../App.css';
import Item from './item';
import { useState } from 'react';
import Navbar from './navbar';
import Grid from './grid';

const Pantry = ({pantryLoad, shoppingLoad, recipeLoad, accountLoad}) => {
    const handleItem = (item) => {
        setContent(
            <Item itemImg={item.image} itemStatus={item.status} itemName={item.name} itemQuantity={item.quantity} itemPurch={item.purchDate} itemExp={item.expDate} itemCat={item.category} handlePantry={() => setContent(pantryHome)}/>
        )
    };

    let pantryHome = (
        <div className='layout'>
            <Grid handleItem={handleItem} handlePantry={() => setContent(pantryHome)}/>
            <button className='add-button' onClick={() => setContent(pantryAdd)}><svg width="71" height="71" viewBox="0 0 71 71" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="39" cy="39" r="29" fill="white"/>
            <path d="M35.5 0C15.8891 0 0 15.8891 0 35.5C0 55.1109 15.8891 71 35.5 71C55.1109 71 71 55.1109 71 35.5C71 15.8891 55.1109 0 35.5 0ZM56.1129 39.5081C56.1129 40.4528 55.3399 41.2258 54.3952 41.2258H41.2258V54.3952C41.2258 55.3399 40.4528 56.1129 39.5081 56.1129H31.4919C30.5472 56.1129 29.7742 55.3399 29.7742 54.3952V41.2258H16.6048C15.6601 41.2258 14.8871 40.4528 14.8871 39.5081V31.4919C14.8871 30.5472 15.6601 29.7742 16.6048 29.7742H29.7742V16.6048C29.7742 15.6601 30.5472 14.8871 31.4919 14.8871H39.5081C40.4528 14.8871 41.2258 15.6601 41.2258 16.6048V29.7742H54.3952C55.3399 29.7742 56.1129 30.5472 56.1129 31.4919V39.5081Z" fill="var(--green)"/>
            </svg></button>
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
            <button onClick={() => setContent(pantryHome)}>x</button>
        </div>
    )

    return (
        <div>
            {content}
        </div>
    );
}

export default Pantry;