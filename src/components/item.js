import '../App.css';
import { useState } from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import x from '../assets/close.svg';
import camera from '../assets/camera-icon.svg';
import upload from '../assets/upload-icon.svg';
import arrow from '../assets/arrow.svg';

const Item = ({itemImg, itemStatus, itemName, itemQuantity, itemPurch, itemExp, itemCat, handlePantry}) => {
    let item = (
        <div>
        <div className='item-page'>
            <div className='item-header'>
                <img className={itemStatus === 'FRESH' ? 'pantry-fresh2' : itemStatus === 'EXPIRED' ? 'pantry-exp2' : 'pantry-soon2'} src={itemImg} alt={itemName}></img>
                <aside className='item-column'>
                    <button className='item-button' onClick={() => setContent(itemEdit)}>Edit</button>
                    <Popup trigger=
                        {<button className='item-button'>Trash</button>}
                        modal nested>
                        {close => (
                                <div className='modal'>
                                    <div className='content'>
                                        <p className='popup-text'>Are you sure you want to trash this item?</p>
                                    </div>
                                <div>
                                    <button onClick={handlePantry} className='green-button'>Confirm</button>
                                </div>
                            </div>
                            )
                        }
                    </Popup>
                    <Popup trigger=
                        {<button className='item-button'><svg width="100%" height="auto" viewBox="0 0 70 70" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M59.5969 34.7223L64.9315 10.7536C65.3167 9.02297 64.0285 7.375 62.2906 7.375H17.9662L16.9318 2.21135C16.6741 0.924295 15.565 0 14.2784 0H2.70833C1.21254 0 0 1.23819 0 2.76562V4.60938C0 6.13681 1.21254 7.375 2.70833 7.375H10.5944L18.5217 46.9505C16.6252 48.0643 15.3472 50.1525 15.3472 52.5469C15.3472 56.1108 18.1765 59 21.6667 59C25.1568 59 27.9861 56.1108 27.9861 52.5469C27.9861 50.7407 27.2586 49.1089 26.0876 47.9375H49.7457C48.5748 49.1089 47.8472 50.7407 47.8472 52.5469C47.8472 56.1108 50.6765 59 54.1667 59C57.6568 59 60.4861 56.1108 60.4861 52.5469C60.4861 49.9919 59.0317 47.784 56.9225 46.7385L57.5451 43.9411C57.9302 42.2105 56.6421 40.5625 54.9041 40.5625H24.6139L23.8753 36.875H56.9559C58.2205 36.875 59.3167 35.9815 59.5969 34.7223Z" fill="var(--white)"/>
                        </svg></button>}
                        modal nested>
                        {
                            close => (
                                <div className='modal'>
                                    <div className='content'>
                                        <p className='popup-text2'>What quantity would you like to add?</p>
                                        <label className='popup-label'>Amount: <input className='item-input' type='number' min={0} style={{width:'50px'}}/></label>
                                    </div>
                                <div>
                                    <button onClick={() => {close()}} className='green-button'>Confirm</button>
                                </div>
                            </div>
                            )
                        }
                    </Popup>
                </aside>
            </div>
            <p className={itemStatus === 'FRESH' ? 'status-fresh' : itemStatus === 'EXPIRED' ? 'status-exp' : 'status-soon'}>{itemStatus}</p>
            <h3>Item Name:</h3>
            <p className='item-info'>{itemName}</p>
            <label>Amount: <br></br><input type='number' defaultValue={itemQuantity} min='0' className='item-input' style={{width:'80px'}}/></label><br></br>
            <h3>Date Purchased:</h3>
            <p className='item-info'>{itemPurch}</p>
            <h3>Expiration Date:</h3>
            <p className='item-info'>{itemExp}</p>
            <h3>Category:</h3>
            <p className='item-info'>{itemCat}</p>
            <div className='nf-dropdown'>
                <div className='nf-toggle'>
                    <h3>Nutrition Facts</h3>
                    <img src={arrow} style={{width:'15px'}} alt='arrow'></img>
                </div>
                <div id='nfBlock' className='nf-block'>
                    <div className='nf-row'>
                        <p className='nf-header'>Serving Size</p>
                        <p className='nf-quant'>30g</p>
                    </div>
                    <div className='nf-row'>
                        <p className='nf-header'>Amount Per Serving</p>
                        <p className='nf-quant'>4</p>
                    </div>
                    <div className='nf-row'>
                        <h3>Calories</h3>
                        <h3 style={{color:'var(--black)'}}>100</h3>
                    </div>
                    <div className='nf-row'>
                        <p className='nf-header'></p>
                        <p className='nf-quant'>% Daily Value</p>
                    </div>
                    <div className='nf-row'>
                        <p className='nf-header'>Total Fat 0g</p>
                        <p className='nf-quant'>0%</p>
                    </div>
                    <div className='nf-row'>
                        <p className='nf-header'>Cholesterol 0mg</p>
                        <p className='nf-quant'>0%</p>
                    </div>
                    <div className='nf-row'>
                        <p className='nf-header'>Sodium 0mg</p>
                        <p className='nf-quant'>0%</p>
                    </div>
                    <div className='nf-row'>
                        <p className='nf-header'>Total Carbohydrate 5g</p>
                        <p className='nf-quant'>3%</p>
                    </div>
                    <div className='nf-row'>
                        <p className='nf-header'>Protein 0g</p>
                        <p className='nf-quant'>0%</p>
                    </div>
                    <div className='nf-line'></div>
                    <p className='nf-small'>The % Daily Value (DV) tells you how much a nutrient in a serving of food contributes to a daily diet. 2,000 calories a day is used for general nutrition advice.</p>
                    <div className='spacer' style={{height:'30px'}}></div>
                </div>
            </div>
            </div>
            <button className='close-button' onClick={handlePantry}><img src={x} style={{width:'70px'}} alt='exit button'></img></button>
        </div>
    );

    let [content, setContent] = useState(item);

    let itemEdit = (
        <div>
        <div className='item-page'>
            <h1>Pantry Edit</h1>
            <div className='spacer' style={{height:'120px'}}></div>
            <label className='label2'>Item Name: <br></br><input type='text' defaultValue={itemName} className='item-input'/></label><br></br>
            <label className='label2'>Amount: <br></br><input type='number' defaultValue={itemQuantity} min='0' className='item-input' style={{width:'80px'}}/></label><br></br>
            <label className='label2'>Date Purchased: <br></br><input type='text' defaultValue={itemPurch} className='item-input'/></label><br></br>
            <label className='label2'>Expiration Date: <br></br><input type='text' defaultValue={itemExp} className='item-input'/></label><br></br>
            <label className='label2'>Item Type: <br></br><select name='type'>
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
            </select></label><br></br>
            <p className='label2'>Image:</p>
            <img className='edit-image' src={itemImg} alt={itemName}></img><br></br>
            <div className='image-opts'>
                <input type='file' id='file' className='upload'></input><label for='file' className='image-input'>Upload <img src={upload} alt='upload icon' style={{height: '18px', marginLeft:'5px'}}></img></label>
                <button className='image-input'><img src={camera} alt='camera icon' style={{height:'18px'}}></img></button>
            </div>
            <button onClick={() => setContent(item)} className='save-button'>Save Item</button>
        </div>
        <button className='close-button' onClick={() => setContent(item)}><img src={x} style={{width:'70px'}} alt='exit button'></img></button>
        </div>
    );

    return (
        <div>
            {content}
        </div>
    )
}

export default Item;