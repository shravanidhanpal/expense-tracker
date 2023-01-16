document.getElementById("expform").addEventListener("submit", addExpenses);
const expenses=JSON.parse(localStorage.getItem("expenses")) || [];
function addExpenses(e){
    e.preventDefault();
    let type= document.getElementById("type").value ;
    let name= document.getElementById("name").value ;
    let amount=document.getElementById("amount").value ;
    if(type !="ChooseOne" && name.length > 0 && amount>0){
        const expense={
        type,
        name,
        amount,
        id: expenses.length>0 ? expenses[expenses.length-1].id + 1 : 1,
    };
    expenses.push(expense);
    localStorage.setItem("expenses",JSON.stringify(expenses));
}
document.getElementById("expform") . reset ();
showExpenses();
}
const showExpenses=()=>{
    const expenseTable=document.getElementById("expenseTable");
    expenseTable.innerHTML="";
    for(let i=0;i<expenses.length;i++){
        expenseTable.innerHTML+=`
        <tr>
            <td>${expenses[i].type}</td>
            <td>${expenses[i].name}</td>
            <td>${expenses[i].amount}</td>
            <td><button class="btn btn-info" onclick="editexpenses(${expenses[i].id})">EDit</button> <button class="btn btn-danger" onclick="deleteexpenses(${expenses[i].id})">delete</button></td>
        </tr>
        `;
    }
}
const editexpenses=(id)=>{
    for(let i=0;i<expenses.length;i++){
        if(expenses[i].id==id){
            document.getElementById("type").value=expenses[i].type;
            document.getElementById("name").value=expenses[i].name;
            document.getElementById("amount").value=expenses[i].amount;
            deleteexpenses(id);
        }
    }
};
const deleteexpenses=(id)=>{
    for(let i=0;i<expenses.length;i++){
        if(expenses[i].id==id){
            expenses.splice(i,1);
        }
    }
    localStorage.setItem("expenses",JSON.stringify(expenses));
    showExpenses();
};
showExpenses();