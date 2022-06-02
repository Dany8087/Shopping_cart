let productsInCart = JSON.parse(localStorage.getItem('shoppingCart'));
if(!productsInCart){
	productsInCart = [];
}
const parentElement = document.querySelector('#buyItems');
const cartSumPrice = document.querySelector('#sum-prices');
const products = document.querySelectorAll('.product-under');


const countTheSumPrice = function () { // 4
	let sum = 0;
	productsInCart.forEach(item => {
		sum += item.price;
	});
	return sum;
}

const updateShoppingCartHTML = function () {  // 3
	localStorage.setItem('shoppingCart', JSON.stringify(productsInCart));
	if (productsInCart.length > 0) {
		let result = productsInCart.map(product => {
			return `
				<li class="buyItem">
					<img src="${product.image}">
					<div>
						<h5>${product.name}</h5>
						<h6>Rs.${product.price}</h6>
						<div>
							<button class="button-minus btn-small" id="remove" onclick="cngtxt" data-id=${product.id}>Remove </button>
							<span class="countOfProduct">${product.count}</span>
							<button class="button-plus" data-id=${product.id}> +</button>
						</div>
					</div>
				</li>`
		});
		parentElement.innerHTML = result.join('');
		document.querySelector('.checkout').classList.remove('hidden');
		cartSumPrice.innerHTML = 'Rs.' + countTheSumPrice();

	}
	else {
		document.querySelector('.checkout').classList.add('hidden');
		parentElement.innerHTML = '<h4 class="empty">Your shopping cart is empty</h4>';
		cartSumPrice.innerHTML = '';
	}
}

function cngtxt() {
	if(this.innerText === "Remove from Cart"){
		this.innerText ="Add To Cart";
	}
}


function updateProductsInCart(product) { // 2
	for (let i = 0; i < productsInCart.length; i++) {
		if (productsInCart[i].id == product.id ) {
			// productsInCart[i].count += 1;
			productsInCart.splice(i, 1);
			localStorage.setItem('shoppingcart', JSON.stringify(productsInCart));
			return;
		}
		productsInCart[i].price = productsInCart[i].basePrice * productsInCart[i].count;

	}
	productsInCart.push(product);

}

const btnclk1 = document.querySelector("#btn1").addEventListener('click', function () {
	console.log(this.innerText);
	if(this.innerText === "Add To Cart"){
				this.innerText ="Remove from Cart";
                
			}else {
				this.innerText = "Add To Cart";
			}
});
const btnclk2 = document.querySelector("#btn2").addEventListener('click', function () {
	console.log(this.innerText);
	if(this.innerText === "Add To Cart"){
				this.innerText ="Remove from Cart";
			}else {
				this.innerText = "Add To Cart";
			}
});
const btnclk3 = document.querySelector("#btn3").addEventListener('click', function () {
	console.log(this.innerText);
	if(this.innerText === "Add To Cart"){
				this.innerText ="Remove from Cart";
			}else {
				this.innerText = "Add To Cart";
			}
});
const btnclk4 = document.querySelector("#btn4").addEventListener('click', function () {
	console.log(this.innerText);
	if(this.innerText === "Add To Cart"){
				this.innerText ="Remove from Cart";
			}else {
				this.innerText = "Add To Cart";
			}
});


products.forEach(item => {   // 1
	item.addEventListener('click', (e) => {
		if (e.target.classList.contains('addToCart')) {
			const productID = e.target.dataset.productId;
			const productName = item.querySelector('.productName').innerHTML;
			const productPrice = item.querySelector('.priceValue').innerHTML;
			const productImage = item.querySelector('img').src;
			let product = {
				name: productName,
				image: productImage,
				id: productID,
				count: 1,
				price: +productPrice,
				basePrice: +productPrice,
			}
			
			updateProductsInCart(product);
			updateShoppingCartHTML();
			
		}
	});
});

parentElement.addEventListener('click', (e) => { // Last
	const isPlusButton = e.target.classList.contains('button-plus');
	const isRemoveButton = e.target.classList.contains('button-minus');
	if (isPlusButton || isRemoveButton) {
		for (let i = 0; i < productsInCart.length; i++) {
			if (productsInCart[i].id == e.target.dataset.id) {
				if (isPlusButton) {
					productsInCart[i].count += 1
				}
				else if (isRemoveButton) {
					productsInCart[i].count -= 1
				}
				productsInCart[i].price = productsInCart[i].basePrice * productsInCart[i].count;

			}
			if (productsInCart[i].count <= 0) {
				document.getElementById('#btn[i]').innerText = "Add To Cart";
				productsInCart.splice(i, 1);
			}
		}
		updateShoppingCartHTML();
	}
});

updateShoppingCartHTML();