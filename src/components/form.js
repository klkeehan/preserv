import '../App.css';
import axios from 'axios';
import x from '../assets/close.svg';

const Form = ({ name, image, handlePantry }) => {
  let status = 3;

  //find day difference between current date and expiration date for item status
  function statusCalc(curDate, expDate) {
    let start = new Date(curDate);
    let end = new Date(expDate);
    let diff = end - start;
    let diff2 = diff / (1000 * 3600 * 24);
    return diff2;
  };

  //add item via form data
  const handleAdd = async (e) => {
    let validFlag = 0;

    e.preventDefault();
    const formData = new FormData(e.target);
    const formValues = {
      name: formData.get('name'),
      quantity: formData.get('quantity'),
      date_purchase: formData.get('date_purchase'),
      date_expire: formData.get('date_expire'),
      image: image,
      category: formData.get('category')
    };

    //regex form validation
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
        status= 3;
      } else if (dayDiff > 0 && dayDiff < 3) {
        status = 2;
      } else if (dayDiff < 0) {
        status = 1;
      };

      const formValues2 = {
        name: formData.get('name'),
        quantity: formData.get('quantity'),
        date_purchase: formData.get('date_purchase'),
        date_expire: formData.get('date_expire'),
        item_status: status,
        image: image,
        category: formData.get('category')
      };
      const response = await axios.post('https://students.gaim.ucf.edu/~ka822136/preserv/backend/pantry.php', formValues2);
      console.log(response);
      handlePantry();
    };
  };

  return (
    <div className='item-page'>
      <h1 style={{marginLeft:'0px'}}>Item Add</h1>
      <div className='spacer' style={{height:'130px'}}></div>
      <form onSubmit={handleAdd}>
        <label className='label2'>Item Name: <br></br><input name='name' type='text' defaultValue={name} className='item-input'></input></label><br></br>
        <label className='label2'>Amount: <br></br><input name='quantity' type='number' defaultValue='1' min='1' className='item-input' style={{width:'80px'}}/></label><br></br>
        <p id='pDateMsg' className='err-txt' style={{marginLeft:'0px', marginTop:'0px'}}></p>        
        <label className='label2'>Date Purchased: <br></br><input name='date_purchase' type='date' className='item-input' /></label><br></br>
        <p id='eDateMsg' className='err-txt' style={{marginLeft:'0px', marginTop:'0px'}}></p>
        <label className='label2'>Expiration Date: <br></br><input name='date_expire' type='date' className='item-input' /></label><br></br>
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
        </select></label><br></br><br></br>
        <p className='label2'>Image:</p>
        <img className='edit-image' src={image} alt='scanned item'></img>
        <button type='submit' className='save-button' style={{position:'absolute'}}>submit</button>
      </form>
      <button className='close-button' onClick={handlePantry}><img src={x} style={{width:'70px'}} alt='exit button'></img></button>
    </div>
  );
};

export default Form;