import '../App.css';
import axios from 'axios';
import 'reactjs-popup/dist/index.css';
import x from '../assets/close.svg';
import camera from '../assets/camera-icon.svg';
import upload from '../assets/upload-icon.svg';

const Edit = ({ itemID, itemImg, itemName, itemQuantity, itemPurch, itemExp, itemCat, handlePantry }) => {
  let url = itemImg;
  let status = 3; //item status - 3/2/1

  //uploading item picture
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
        url = canvas.toDataURL('image/jpeg', 0.7);
        document.getElementById('item-image').src = url;
      };
    };
  };

  //find day difference between current date and expiration date for item status
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
      await axios.put('https://students.gaim.ucf.edu/~ka822136/preserv/backend/pantry.php', formValues2);
      handlePantry();
    };
  };

  return (
    <>
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
            <label className='label2'>Item Type: <br></br><select name='category' defaultValue={itemCat.toLowerCase()}>
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
            <img className='edit-image' id='item-image' src={url} alt={itemName}></img><br></br>
            <div className='image-opts'>
              <input type='file' id='file' accept='image/jpeg, image/png, image/webp, image/gif' className='upload' onChange={handleImageUpload}></input><label for='file' className='image-input'>Upload <img src={upload} alt='upload icon' style={{height: '18px', marginLeft:'5px'}}></img></label>
              <input type='file' id='camera-capture' capture='environment' style={{display:'none'}} accept='image/*' className='upload'></input>
              <button className='image-input' onClick={() => document.getElementById('camera-capture').click()}><img src={camera} alt='camera icon' style={{height:'18px'}}></img></button>
            </div>
            <button type='submit' className='save-button' style={{position:'absolute'}}>Save Item</button>
          </form>
        </div>
      <button className='close-button' onClick={handlePantry}><img src={x} style={{width:'70px'}} alt='exit button'></img></button>
    </>
  );
};

export default Edit;