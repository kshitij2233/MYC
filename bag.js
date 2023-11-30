const convenience_fees = 99;
let bagitemobjects;
onload();


function onload(){
  loadBagitems();
  displaybagitems();
  displaybagsummary();
}

function loadBagitems(){
  bagitemobjects = bagItems.map(itemId => {
    for (let i = 0; i < items.length; i++){
      if(itemId == items[i].id){
        return items[i];
      }
    }
  });
  console.log(bagitemobjects);
}

function displaybagitems(){
  let bagcontainer = document.querySelector('.bag-items-container')

  let innerHTML = '';

  bagitemobjects.forEach(bagItem => {
    innerHTML += generateitemHTML(bagItem);
  });

  bagcontainer.innerHTML = innerHTML;
}

function removefrombag(itemId) {
   bagItems = bagItems.filter(bagItemID => bagItemID !== itemId) //here filter method if the condition is false, then it will remove the item.

   localStorage.setItem('bagItems', JSON.stringify(bagItems));

  loadBagitems();
  displaybagitems();
  displaybagicon();
  displaybagsummary();
}

function generateitemHTML(item){
  return `<div class="bag-item-container">
  <div class="item-left-part">
    <img class="bag-item-img" src="${item.image}">
  </div>
  <div class="item-right-part">
    <div class="company">${item.company}</div>
    <div class="item-name">${item.item_name}</div>
    <div class="price-container">
      <span class="current-price">₹${item.current_price}</span>
      <span class="original-price">₹${item.original_price}</span>
      <span class="discount-percentage">(${item.discount_percentage}%)</span>
    </div>
    <div class="return-period">
      <span class="return-period-days">${item.return_period} days</span> return available
    </div>
    <div class="delivery-details">
      Delivery by
      <span class="delivery-details-days">${item.delivery_date}</span>
    </div>
  </div>

  <div class="remove-from-cart" onclick = "removefrombag(${item.id})" >X</div>
</div>`
}


function displaybagsummary(){

  let bagsummary = document.querySelector('.bag-summary');
  let totalItem = bagitemobjects.length;
  let totalMRP = 0;
  let totalDiscount = 0;
  let finalpayment = 0;
  
  bagitemobjects.forEach(bagItem => {
    totalMRP += bagItem.original_price;
    totalDiscount += bagItem.original_price - bagItem.current_price;
    finalpayment += bagItem.current_price;
  })
  
  finalpayment += convenience_fees;

  

  bagsummary.innerHTML = `
  <div class="bag-details-container">
  <div class="price-header">PRICE DETAILS (${totalItem} Items) </div>
  <div class="price-item">
    <span class="price-item-tag">Total MRP</span>
    <span class="price-item-value">₹${totalMRP}</span>
  </div>
  <div class="price-item">
    <span class="price-item-tag">Discount on MRP</span>
    <span class="price-item-value priceDetail-base-discount">₹${totalDiscount}</span>
  </div>
  <div class="price-item">
    <span class="price-item-tag">Convenience Fee</span>
    <span class="price-item-value">₹ 99</span>
  </div>
  <hr>
  <div class="price-footer">
    <span class="price-item-tag">Total Amount</span>
    <span class="price-item-value">₹ ${finalpayment}</span>
  </div>
</div>
<button class="btn-place-order">
  <div class="css-xjhrni">PLACE ORDER</div>
</button>`
}