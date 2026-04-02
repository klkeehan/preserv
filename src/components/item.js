import '../App.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import x from '../assets/close.svg';
import camera from '../assets/camera-icon.svg';
import upload from '../assets/upload-icon.svg';
import Webcam from "react-webcam";

const Item = ({ itemID, itemImg, itemStatus, itemString, itemName, itemQuantity, itemPurch, itemExp, itemCat, handlePantry }) => {
  //nutrition facts state variables
  const [servingSize, setServingSize] = useState('');
  const [servingAmount, setServingAmount] = useState('');
  const [cals, setCals] = useState('');
  const [fat, setFat] = useState('');
  const [perFat, setPerFat] = useState('');
  const [chol, setChol] = useState('');
  const [perChol, setPerChol] = useState('');
  const [sod, setSod] = useState('');
  const [perSod, setPerSod] = useState('');
  const [carb, setCarb] = useState('');
  const [perCarb, setPerCarb] = useState('');
  const [prot, setProt] = useState('');
  const [perProt, setPerProt] = useState('');

  const [image, setImage] = useState(itemImg); //image for editing
  const [url, setUrl] = useState(itemImg); //image url for state updating

  let status = 3; //item status - 3/2/1 
  let flag = 0; //for image capture - 0 means cam not active, 1 cam is active

  // uploading item picture
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      const img = new Image();
      img.src = reader.result;
      img.onload = () => {
        const MAX = 300;
        const scale = Math.min(MAX / img.width, MAX / img.height);
        const canvas = document.createElement('canvas');
        canvas.width = img.width * scale;
        canvas.height = img.height * scale;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        setUrl(canvas.toDataURL('image/jpeg', 0.7));
      };
    };
  };

  // taking item picture
  const handleExit = () => {
    flag = 0;
    console.log('camera closed');
  };

  const constraints = {
    width: 1280,
    height: 720,
    facingMode: 'environment'
  };
  const webcamRef = React.useRef(null);
  const handleCapture = React.useCallback(() => {
    flag = 1;
    const imageSrc = webcamRef.current.getScreenshot();
    url = imageSrc;
    console.log(url);
    setImage(url);

  }, [webcamRef]);

  // nutrition facts fetch from fatsecret api
  const handleNutrition = async () => {
    let options = {
      method: 'POST',
      url: 'https://oauth.fatsecret.com/connect/token',
      method: 'POST',
      auth: {
        user: '6fbea50e127d4dc086815c4d2f59b736',
        password: 'dda533f392f741188f19c16dfe3ca86f'
      },
      headers: {'content-type': 'application/x-www-form-urlencoded'},
      form: {
        'grant_type': 'client_credentials',
        'scope': 'barcode'
      },
      json: true
    };

    const response = await axios.get(options);
    console.log(response);
  };

  // useEffect(() => {handleNutrition()}, []);

  // find day difference between current date and expiration date for item status
  function statusCalc(curDate, expDate) {
    let start = new Date(curDate);
    let end = new Date(expDate);
    let diff = end - start;
    let diff2 = diff / (1000 * 3600 * 24);
    return diff2;
  };

  //item editing through form
  const handleEdit = async (e) => {
    let validFlag = 0;
    e.preventDefault();
    const formData = new FormData(e.target);
    const formValues = {
      id: itemID,
      name: formData.get('name'),
      quantity: formData.get('quantity'),
      date_purchase: formData.get('date_purchase'),
      date_expire: formData.get('date_expire'),
      image: url,
      category: formData.get('category')
    };

    // regex form validation
    const dateReg = /^\d{4}-\d{2}-\d{2}$/;
    const pDateFlag = dateReg.test(formValues.date_purchase);
    if (pDateFlag) {validFlag++} else {
      const pMsgTxt = document.querySelector('#pDateMsg');
      pMsgTxt.textContent = 'Use the calendar popup to select a date';
    };
    const eDateFlag = dateReg.test(formValues.date_expire);
    if (eDateFlag) {validFlag++} else {
      const eMsgTxt = document.querySelector('#eDateMsg');
      eMsgTxt.textContent = 'Use the calendar popup to select a date';
    };
    if (validFlag === 2) {
      let currentDate = new Date();
      const dayDiff = statusCalc(currentDate, formValues.date_expire);
      if (dayDiff > 3) {
        status = 3;
      } else if (dayDiff > 0 && dayDiff < 3) {
        status = 2;
      } else if (dayDiff < 0) {
        status = 1;
      };
      const formValues2 = {
        id: itemID,
        name: formData.get('name'),
        quantity: formData.get('quantity'),
        date_purchase: formData.get('date_purchase'),
        date_expire: formData.get('date_expire'),
        item_status: status,
        image: url,
        category: formData.get('category')
      };
      const response = await axios.put('https://students.gaim.ucf.edu/~ka822136/preserv/backend/pantry.php', formValues2);
      handlePantry();
    };
  };

  //deleting item from pantry
  const handleDelete = async (e) => {
    e.preventDefault();
    const response = await axios.delete('https://students.gaim.ucf.edu/~ka822136/preserv/backend/pantry.php', {data: {id: itemID}});
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
    const response = await axios.post('https://students.gaim.ucf.edu/~ka822136/preserv/backend/shopping.php', formValues);
    handlePantry();
  };

  //main item page jsx
  let item = (
    <div>
      <div className='item-page'>
        <div className='item-header'>
          <img className={itemStatus === '3' ? 'pantry-fresh2' : itemStatus === '1' ? 'pantry-exp2' : 'pantry-soon2'} src={itemImg} alt={itemName}></img>
          <aside className='item-column'>
            <button className='item-button' onClick={() => setContent(itemEdit)}>Edit</button>
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
          <div id='nutrition' className='nutrition'>
            <h3>Nutrition Facts</h3>
            <div className='nf-block'>
              <div className='nf-row'>
                <p className='nf-header'>Serving Size</p>
                <p className='nf-quant'>{servingSize}</p>
              </div>
              <div className='nf-row'>
                <p className='nf-header'>Amount Per Serving</p>
                <p className='nf-quant'>{servingAmount}</p>
              </div>
              <div className='nf-row'>
                <h3>Calories</h3>
                <h3 style={{color:'var(--black)'}}>{cals}</h3>
              </div>
              <div className='nf-row'>
                <p className='nf-header'></p>
                <p className='nf-quant'>% Daily Value</p>
              </div>
              <div className='nf-row'>
                <p className='nf-header'>Total Fat</p>
                <p className='nf-header'>{fat}</p>
                <p className='nf-quant'>{perFat}</p>
              </div>
              <div className='nf-row'>
                <p className='nf-header'>Cholesterol</p>
                <p className='nf-header'>{chol}</p>
                <p className='nf-quant'>{perChol}</p>
              </div>
              <div className='nf-row'>
                <p className='nf-header'>Sodium</p>
                <p className='nf-header'>{sod}</p>
                <p className='nf-quant'>{perSod}</p>
              </div>
              <div className='nf-row'>
                <p className='nf-header'>Total Carbohydrate</p>
                <p className='nf-header'>{carb}</p>
                <p className='nf-quant'>{perCarb}</p>
              </div>
              <div className='nf-row'>
                <p className='nf-header'>Protein</p>
                <p className='nf-header'>{prot}</p>
                <p className='nf-quant'>{perProt}</p>
              </div>
              <div className='nf-line'></div>
                <p className='nf-small'>The % Daily Value (DV) tells you how much a nutrient in a serving of food contributes to a daily diet. 2,000 calories a day is used for general nutrition advice.</p>
                <div className='spacer' style={{height:'50px'}}></div>
              </div>
            </div>
          </div>
      <button className='close-button' onClick={handlePantry}><img src={x} style={{width:'70px'}} alt='exit button'></img></button>
    </div>
  );

  let [content, setContent] = useState(item);

  //item edit page jsx
  let itemEdit = (
    <div>
      <div className={flag === '0' ? 'cam' : 'hidden-div'}>
        <button onClick={handleExit} className='green-button'>x</button>
        <Webcam
          width={1280}
          height={720}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          videoConstraints={constraints}      
        />
        <button onClick={handleCapture} className='green-button'>capture</button>
      </div>
      <div className='item-page'>
        <h2>Item Edit</h2>
          <div className='spacer' style={{height:'120px'}}></div>
          <form onSubmit={handleEdit}>
            <label className='label2'>Item Name: <br></br><input name='name' type='text' defaultValue={itemName} className='item-input'/></label><br></br>
            <label className='label2'>Amount: <br></br><input name='quantity' type='number' defaultValue={itemQuantity} min='1' className='item-input' style={{width:'80px'}}/></label><br></br>
            <p id='pDateMsg' className='err-txt' style={{marginLeft:'0px', marginTop:'0px'}}></p>
            <label className='label2'>Date Purchased: <br></br><input name='date_purchase' type='date' defaultValue={itemPurch} className='item-input'/></label><br></br>
            <p id='eDateMsg' className='err-txt' style={{marginLeft:'0px', marginTop:'0px'}}></p>
            <label className='label2'>Expiration Date: <br></br><input name='date_expire' type='date' defaultValue={itemExp} className='item-input'/></label><br></br>
            <label className='label2'>Item Type: <br></br><select name='category'>
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
            <img className='edit-image' src={image} alt={itemName}></img><br></br>
            <div className='image-opts'>
              <input type='file' id='file' accept='image/jpeg, image/png, image/webp, image/gif' className='upload' onChange={handleImageUpload}></input><label for='file' className='image-input'>Upload <img src={upload} alt='upload icon' style={{height: '18px', marginLeft:'5px'}}></img></label>
              <button onClick={handleCapture} className='image-input'><img src={camera} alt='camera icon' style={{height:'18px'}}></img></button>
            </div>
            <button type='submit' className='save-button' style={{position:'absolute'}}>Save Item</button>
          </form>
        </div>
        <button className='close-button' onClick={() => setContent(item)}><img src={x} style={{width:'70px'}} alt='exit button'></img></button>
    </div>
  );

  return (
    <div>
      {content}
    </div>
  )
};

export default Item;