let baggItems;

onLoad();
function onLoad(){
    let jsString = localStorage.getItem('baggItems');
    if (jsString){
        baggItems = JSON.parse(jsString);
    }
    else{
        baggItems = [];
    }
        
    displayItemsOnHomepage();
    getBagItemCount();
}
onLoad();
function displayItemsOnHomepage(){
    let itemsContainerElement = document.querySelector('.items-container');

    let innerHTML = "";
    if (!itemsContainerElement){
        return;
    }
    items.forEach(item =>{
        innerHTML += `
                    <div class="item-container">
                    <img class= 'item-image' src="${item.image}" alt="item-image">
                    <div class="rating">${item.rating.stars}⭐ | ${item.rating.count}</div>
                    <div class="company">${item.company}</div>
                    <div class="item-name">${item.item_name}</div>
                    <div class="price">
                        <span class ="current-price">Rs. ${item.current_price}</span>
                        <span class = 'original-price'><strike>Rs. ${item.original_price}</strike></span>
                        <span class = 'discount-price'>(${item.discount_percentage}% OFF)</span>
                    </div>
                    <button class = 'btn-add-bag'  onclick = "addToBag(${item.id});">
                        <span class="material-symbols-outlined action_icon" id="'bag-add-btn">shopping_bag</span>
                        <span>Add to Bag</span>
                    </button>
                </div>
        `;
        itemsContainerElement.innerHTML = innerHTML;
    })

}

function addToBag(itemID){
    
    baggItems.push(itemID);
    localStorage.setItem('baggItems', JSON.stringify(baggItems));
    getBagItemCount();
}


function getBagItemCount(){
    const countElement = document.querySelector('.bag-item-count')
    if (baggItems.length > 0){
        countElement.classList.remove('badge-hidden');
        countElement.innerText = baggItems.length;
        
    }
    else{
        countElement.classList.add('badge-hidden');
    }


}