import '../App.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import x from '../assets/close.svg';

const Item = ({ itemID, itemImg, itemStatus, itemString, itemName, itemQuantity, itemPurch, itemExp, itemCat, handlePantry, handleEdit }) => {
  const [info, setInfo] = useState();
  const [cals, setCals] = useState();
  const [fat, setFat] = useState();
  const [carb, setCarb] = useState();
  const [protein, setProtein] = useState();

  useEffect(() => {
    handleNutrition();
  }, [info, cals, fat, carb, protein]);

  //nutrition facts fetch
  const handleNutrition = async () => {
    const key = process.env.REACT_APP_NUTRITION_API_KEY;
    const query = itemName;
      try {
        const response = await fetch(`https://api.nal.usda.gov/fdc/v1/foods/search?api_key=${key}&query=${query}`, {
          method: 'GET'
        });
        const data = await response.json();
        console.log(data);
        const size = data.foods[0].servingSize;
        const sizeUnit = data.foods[0].servingSizeUnit;
        const calories = data.foods[0].foodNutrients[3].value;
        const fat = data.foods[0].foodNutrients[1].value;
        const protein = data.foods[0].foodNutrients[0].value;
        const carb = data.foods[0].foodNutrients[2].value;
        if (!size.isNaN) {setCals(size+sizeUnit)};
        setCals(calories);
        setFat(fat+'g');
        setProtein(protein+'g');
        setCarb(carb+'g');
      } catch (err) {setInfo('Your item either produced no results from our nutrition API or there was an error fetching data from the API. Please check back later.')}
    };

  //deleting item from pantry
  const handleDelete = async (e) => {
    e.preventDefault();
    await axios.delete('https://students.gaim.ucf.edu/~ka822136/preserv/backend/pantry.php', {data: {id: itemID}});
    handlePantry();
  };
  
  //add pantry item to shopping list with inserted quantity
  const handleQuant = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const formValues = {
      name: formData.get('name'),
      quantity: formData.get('add-quant')
    };
    await axios.post('https://students.gaim.ucf.edu/~ka822136/preserv/backend/shopping.php', formValues);
    handlePantry();
  };

  return (
    <>
      <div className='item-page'>
        <div className='item-header'>
          <img className={itemStatus === '3' ? 'pantry-fresh2' : itemStatus === '1' ? 'pantry-exp2' : 'pantry-soon2'} src={itemImg} alt={itemName}></img>
          <aside className='item-column'>
            <button className='item-button' onClick={handleEdit}>Edit</button>
            <Popup contentStyle={{width:'273px', height:'210px'}} trigger={<button className='green-button'>Remove</button>}modal nested>
              {close => (
                <div>
                  <div className='content'>
                    <p className='popup-text2'>Remove item from pantry?</p>
                  </div>
                  <div>
                    <button className='pink-solid' onClick={handleDelete}>Remove</button><br></br>
                    <button className='pink-hollow' onClick={() => close()}>Cancel</button>
                  </div>
                </div>
              )}
            </Popup>
            <Popup contentStyle={{width:'273px', height:'300px'}} trigger={<button className='item-button'><svg width="100%" viewBox="0 0 70 70" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M59.5969 34.7223L64.9315 10.7536C65.3167 9.02297 64.0285 7.375 62.2906 7.375H17.9662L16.9318 2.21135C16.6741 0.924295 15.565 0 14.2784 0H2.70833C1.21254 0 0 1.23819 0 2.76562V4.60938C0 6.13681 1.21254 7.375 2.70833 7.375H10.5944L18.5217 46.9505C16.6252 48.0643 15.3472 50.1525 15.3472 52.5469C15.3472 56.1108 18.1765 59 21.6667 59C25.1568 59 27.9861 56.1108 27.9861 52.5469C27.9861 50.7407 27.2586 49.1089 26.0876 47.9375H49.7457C48.5748 49.1089 47.8472 50.7407 47.8472 52.5469C47.8472 56.1108 50.6765 59 54.1667 59C57.6568 59 60.4861 56.1108 60.4861 52.5469C60.4861 49.9919 59.0317 47.784 56.9225 46.7385L57.5451 43.9411C57.9302 42.2105 56.6421 40.5625 54.9041 40.5625H24.6139L23.8753 36.875H56.9559C58.2205 36.875 59.3167 35.9815 59.5969 34.7223Z" fill="var(--white)"/>
              </svg></button>}
              modal nested>
              {close => (
                <div className='modal'>
                  <div className='content'>
                    <form onSubmit={handleQuant}>
                      <button className='green-button' onClick={() => close()} style={{position:'absolute', right:'0', marginTop:'20px', marginRight:'20px', height:'30px', paddingTop:'2px'}}>x</button><br></br>
                      <p className='popup-text2' style={{width:'180px'}}>What quantity would you like to add?</p>
                      <input name='name' defaultValue={itemName} style={{visibility:'hidden'}}></input>
                      <label className='label2' style={{display:'flex', width:'fit-content', alignItems:'center', marginLeft:'50px'}}>Amount:<input name='add-quant' type='number' min='1' defaultValue='1' className='item-input' style={{width:'80px', marginLeft:'10px'}}/></label><br></br>
                      <button type='submit' className='green-button'>Confirm</button>
                    </form>
                  </div>
                </div>
              )}
              </Popup>
            </aside>
          </div>
          <p className={itemStatus === '3' ? 'status-fresh' : itemStatus === '1' ? 'status-exp' : 'status-soon'}>{itemString}</p>
          <h3>Item Name:</h3>
          <p className='item-info'>{itemName}</p>
          <label>Amount: <br></br><input type='number' defaultValue={itemQuantity} min='0' className='item-input' style={{width:'80px'}}/></label><br></br>
          <h3>Date Purchased:</h3>
          <p className='item-info'>{itemPurch}</p>
          <h3>Expiration Date:</h3>
          <p className='item-info'>{itemExp}</p>
          <h3>Category:</h3>
          <p className='item-info'>{itemCat}</p>
          <p className='nf-small' style={{fontSize:'16px'}}>{info}</p>
          <div id='nutrition' className='nutrition'>
            <h3>Nutrition Facts</h3>
            <div className='nf-block'>
              <div className='nf-row'>
                <p className='nf-header'>Serving Size</p>
                <p className='nf-quant' id='serving-size'></p>
              </div>
              <div className='nf-row'>
                <h3>Calories</h3>
                <h3 style={{color:'var(--black)'}}>{cals}</h3>
              </div>
              <div className='nf-row'>
                <p className='nf-header'>Total Fat</p>
                <p className='nf-header'>{fat}</p>
              </div>
              <div className='nf-row'>
                <p className='nf-header'>Total Carbohydrate</p>
                <p className='nf-header'>{carb}</p>
              </div>
              <div className='nf-row'>
                <p className='nf-header'>Protein</p>
                <p className='nf-header'>{protein}</p>
              </div>
              <div className='nf-line'></div>
                <p className='nf-small'>Nutrition data may be inaccurate and can depend on the specificity of the item name. Please verify needed information.</p>
                <div className='spacer' style={{height:'60px'}}></div>
              </div>
            </div>
          </div>
      <button className='close-button' onClick={handlePantry}><img src={x} style={{width:'70px'}} alt='exit button'></img></button>
    </>
  );
}

export default Item;