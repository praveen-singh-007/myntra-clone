let bagItemObjects;
onload();

function onload(){
    let jsString = localStorage.getItem('baggItems');
    if (jsString){
        baggItems = JSON.parse(jsString);
    }
    else{
        baggItems = [];
    }
      
    loadBagItemObjects(baggItems);
    displayBagItems();
    loadBagSummary();
}

function loadBagItemObjects(baggItems){
    bagItemObjects = baggItems.map(itemID =>{
        for(let i = 0; i< items.length; i++){
            if(itemID == items[i].id){
                return items[i];
            }
        }
    })
}

function displayBagItems(){
    let containerElement = document.querySelector('.bag-items-container');
    if (!containerElement) return;
    let innerHTML = '';
    bagItemObjects.forEach(bagItem => {
        innerHTML += generateHTML(bagItem);
    });

    containerElement.innerHTML = innerHTML;
    
}

function deleteCartItem(itemId){

    baggItems = baggItems.filter(bagItemID => bagItemID != itemId);

    localStorage.setItem('baggItems', JSON.stringify(baggItems));
    loadBagItemObjects(baggItems);
    displayBagItems();
    getBagItemCount();
    loadBagSummary();

}

function generateHTML(item){
    return `
        <div class="bag-item-container">
            <div class="item-left-part">
              <img class="bag-item-img" src="${item.image}">
            </div>
            <div class="item-right-part">
              <div class="company">${item.company}</div>
              <div class="item-name">${item.item_name}</div>
              <div class="price-container">
                <span class="current-price">Rs. ${item.current_price}</span>
                <span class="original-price">Rs. ${item.original_price}</span>
                <span class="discount-percentage">(${item.discount_percentage}% OFF)</span>
              </div>
              <div class="return-period">
                <span class="return-period-days">${item.return_period}</span> return available
              </div>
              <div class="delivery-details">
                Delivery by
                <span class="delivery-details-days">${item.delivery_date}</span>
              </div>
            </div>

            <div class="remove-from-cart" onclick = "deleteCartItem(${item.id});">X</div>
        </div>
    `
}

function loadBagSummary() {
    // 1. Select the summary element first
    let bagSummaryElement = document.querySelector(".bag-summary");
    let totalItem = baggItems.length;
    let totalMRP = 0;
    let totalMRPAfterDiscount = 0;
    let totalCovinience = 99;

    // 2. Handle empty bag state
   if (totalItem === 0) {
    // Left side: Show the message
    document.querySelector('.bag-items-container').innerHTML = `
        <div class="empty-bag-message">
            <h1 id='empty-bag'>Your bag is empty</h1>
            <p>Add some items to your bag to see them here!</p>
        </div>`;
    
    // Right side: Instead of hiding, show the action button
    bagSummaryElement.style.display = 'block';
    bagSummaryElement.innerHTML = `
        <div class="empty-bag-action">
            <a id='go-home' href="index.html" class="btn-continue-shopping">
                <button class="btn-place-order">GO TO HOMEPAGE</button>
            </a>
        </div>
    `;
    return; 
}
    // 3. If not empty, calculate totals
    bagSummaryElement.style.display = 'block';
    bagItemObjects.forEach(bagItem => {
        totalMRP += bagItem.original_price;
        totalMRPAfterDiscount += bagItem.current_price;
    });

    let finalPayment = totalMRPAfterDiscount + totalCovinience;
    let totalDiscountPrice = totalMRP - totalMRPAfterDiscount;

    // 4. Update the innerHTML (This includes the Place Order button automatically)
    bagSummaryElement.innerHTML = `
        <div class="bag-details-container">
            <div class="price-header">PRICE DETAILS (${totalItem} Items) </div>
            <div class="price-item">
              <span class="price-item-tag">Total MRP</span>
              <span class="price-item-value">Rs. ${totalMRP}</span>
            </div>
            <div class="price-item">
              <span class="price-item-tag">Discount on MRP</span>
              <span class="price-item-value priceDetail-base-discount">-Rs. ${totalDiscountPrice}</span>
            </div>
            <div class="price-item">
              <span class="price-item-tag">Convenience Fee</span>
              <span class="price-item-value">Rs. ${totalCovinience}</span>
            </div>
            <hr>
            <div class="price-footer">
              <span class="price-item-tag">Total Amount</span>
              <span class="price-item-value">Rs. ${finalPayment}</span>
            </div>
          </div>
          <button class="btn-place-order" onclick="location.href='order_placed.html'">
            <div class="css-xjhrni">PLACE ORDER</div>
          </button>
    `;
}