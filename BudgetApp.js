const balance = document.getElementById('balance');

const money_plus = document.getElementById('money-plus');
const money_minus = document.getElementById('money-minus');
const list = document.getElementById('list');
const form = document.getElementById('form');
const text = document.getElementById('text');
const amount = document.getElementById('amount');

// const dummyTransactions = [ {id:1, text:"Flower", amount:-20},
//                             {id:2, text:"Salary", amount:300},
//                             {id:3, text:"Book", amount:-10},
//                             {id:4, text:"Camera", amount:150} 
//                         ];

// let Transactions = [];

let transactions = localStorage.getItem('transactions') !== null ? localStorageTransactions : [];

function addTransaction(e){
    e.preventDefault();
    if(
        text.value.trim()=== "" || amount.value.trim() === ""
    ){
        alert("Please Enter Text and Value");
    }else{
        const transaction ={
            id:generateID(),
            text:text.value,
            amount: +amount.value
        };

        transactions.push(transaction);
        addTransactionDOM(transaction);
        updateValues();
        text.value="";
        amount.value="";

    }
}


function generateID(){
    return Math.floor(Math.random()*10000000);
} 


function addTransactionDOM(transaction) {
    const sign = transaction.amount < 0 ? "-" : "+";
    const item = document.createElement("li");

    item.classList.add(
        transaction.amount < 0 ? "minus" : "plus"
    )

    item.innerHTML = `
    ${transaction.text}<span>${sign}${Math.abs(transaction.amount)}</span>
    <button class="delete-btn" onclick="removeTransaction(${transaction.id})">X</button>
    `

    list.appendChild(item);
    
}


function removeTransaction(id){
    transactions = transactions.filter(transaction => transaction.id !== id);
    updateLocalStorage();
    Init();
  }
 

function updateValues(){
    const amounts = transactions.map(transaction => transaction.amount);
    console.log(amounts);
    const total = amounts.reduce((acc,item) => (acc +=item),0).toFixed(2);
    console.log(total);
    const income = amounts.filter(item => item > 0).reduce((acc,item) => (acc+=item),0).toFixed(2);
    console.log(income);
    const expence = (
        amounts.filter(item => item<0).reduce((acc,item) => (acc += item),0)*-1
    ).toFixed(2);
    // console.log(expense);

    balance.innerText=`$${total}`;
    money_plus.innerText=`$${income}`;
    money_minus.innerText=`$${expence}`;
}




function Init(){
    list.innerHTML="";
    transactions.forEach(addTransactionDOM);
    updateValues();
}


 //last
  //update Local Storage Transaction
  function updateLocalStorage(){
    localStorage.setItem('transactions',JSON.stringify(transactions));
  }

Init();

form.addEventListener("submit", addTransaction);

