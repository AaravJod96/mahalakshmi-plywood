// LOGIN
const USER="admin";
const PASS="1234";

function login(){
let u=user.value;
let p=pass.value;
if(u===USER && p===PASS){
panel.style.display="block";
alert("Login Success");
}
else alert("Wrong");
}

// PRODUCTS
let products=JSON.parse(localStorage.getItem("products")||"[]");

const productsDiv=document.getElementById("products");

function loadProducts(){
productsDiv.innerHTML=products.map(p=>`
<div class='card'>
<h3>${p.name}</h3>
<p>₹${p.price}</p>
<button class='btn' onclick="buy('${p.name}',${p.price})">Buy</button>
</div>`).join('');
}

// SEARCH
search.addEventListener("input",()=>{
let val=search.value.toLowerCase();
let f=products.filter(p=>p.name.toLowerCase().includes(val));
productsDiv.innerHTML=f.map(p=>`
<div class='card'>
<h3>${p.name}</h3>
<p>₹${p.price}</p>
</div>`).join('');
});

// ADD PRODUCT
function addProduct(){
products.push({name:pname.value,price:pprice.value});
localStorage.setItem("products",JSON.stringify(products));
loadProducts();
}

// PAYMENT UPI
function buy(name,price){
let upi=`upi://pay?pa=yourupi@bank&pn=Mahalakshmi&am=${price}`;
window.location.href=upi;
placeOrder(name,price);
}

// ORDERS
let orders=JSON.parse(localStorage.getItem("orders")||"[]");

function placeOrder(name,price){
let id="ORD"+Math.floor(Math.random()*10000);
orders.push({id,name,price,status:"Pending"});
localStorage.setItem("orders",JSON.stringify(orders));
alert("Order ID: "+id);
}

function trackOrder(){
let o=orders.find(x=>x.id===trackId.value);
trackResult.innerText=o?o.status:"Not found";
}

// INVOICE
function generateInvoice(){
invoice.innerHTML=`Invoice<br>${custName.value}<br>₹${amount.value}`;
}

// CUSTOMERS
let customers=JSON.parse(localStorage.getItem("customers")||"[]");

function addCustomer(){
customers.push({name:cname.value,phone:cphone.value});
localStorage.setItem("customers",JSON.stringify(customers));
loadCustomers();
}

function loadCustomers(){
customerList.innerHTML=customers.map(c=>`<p>${c.name} ${c.phone}</p>`).join('');
}

// DEALERS
let dealers=JSON.parse(localStorage.getItem("dealers")||"[]");

function addDealer(){
dealers.push({name:dname.value,area:darea.value});
localStorage.setItem("dealers",JSON.stringify(dealers));
loadDealers();
}

function loadDealers(){
dealerList.innerHTML=dealers.map(d=>`<p>${d.name} ${d.area}</p>`).join('');
}

// WHATSAPP
function autoMsg(phone){
window.open(`https://wa.me/${phone}?text=Thanks for contacting Mahalakshmi Plywood`);
}

// INIT
loadProducts();
loadCustomers();
loadDealers();