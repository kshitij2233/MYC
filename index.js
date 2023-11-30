let bagItems;

onload();

function onload(){
  let bagItemsStr = localStorage.getItem('bagItems');
  if(bagItemsStr === null){
    bagItems = [];
  }
  else{
    bagItems = JSON.parse(bagItemsStr);
  }
  displayitems();
  displaybagicon();   
}



function displayitems(){ 
let itemscontainerelement = document.querySelector('.items-container');

if(itemscontainerelement === null){ //To check what it is print it on console and then use it in conditional statements.
  return;
}

let innerHTMLContent = '';

items.forEach(function(item){
  innerHTMLContent += `
  <div class="item-cont">
    <img class="item-image" src="${item.image}" alt="item image">
    <div class="rating">
        ${item.rating.stars} <i class="fa-solid fa-star" style="color: #f6ee16;"></i> | ${item.rating.count}
    </div>
    <div class="company-name">${item.company}</div>
    <div class="item-name">${item.item_name}</div>
    <div class="price">
        <span class="current-price">₹${item.current_price}</span>
        <span class="original-price">₹${item.original_price}</span>
        <span class="discount">(${item.discount_percentage}% Off)</span>
    </div>
    <button class="btn-addtobag" onclick="
    addtoBag(${item.id});
    ">Add to Bag</button>
  </div>`;
})

itemscontainerelement.innerHTML = innerHTMLContent;
};


function displaybagicon(){
  let bagitemcountelement = document.querySelector('#bag-item-count');  
  
  if(bagItems.length > 0){
    bagitemcountelement.classList.add('bag-item-counts');
    bagitemcountelement.innerText = bagItems.length;
  }
  else{
    bagitemcountelement.classList.remove('bag-item-counts');
    bagitemcountelement.innerText = '';
  }
}


function addtoBag(item){
  bagItems.push(item);
  localStorage.setItem('bagItems', JSON.stringify(bagItems));
  displaybagicon();
};
