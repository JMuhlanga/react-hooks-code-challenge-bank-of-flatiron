import React, {useState} from "react";

function AddTransactionForm() {
  const [transaction, setTransaction] = useState([]); 
  const [newData, setNewData] = useState({
    date: "",
    description: "",
    category: "",
    amount: 0,
  })

  function handleSubmit(event){
    event.preventDefault()
    fetch("http://localhost:8001/transactions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newData)
    })
      .then((r) => r.json())
      .then((dataObj) => {
      const newTransactionObj = [...transaction, dataObj] 
      setTransaction(newTransactionObj)
      })
  }

  function handleChange(e){
    let name = e.target.name
    let value = e.target.value
    setNewData ({...newData, [name]: value });
  }

  return (
    <div className="ui segment">
      <form onSubmit={handleSubmit} className="ui form">
        <div className="inline fields">
          <input type="date" name="date" onChange = {handleChange}  />
          <input type="text" name="description" placeholder="Description" onChange = {handleChange} />
          <input type="text" name="category" placeholder="Category" onChange = {handleChange} />
          <input type="number" name="amount" placeholder="Amount" step="0.01" onChange = {handleChange} />
        </div>
        <button className="ui button" type="submit">
          Add Transaction
        </button>
      </form>
    </div>
  );
}

export default AddTransactionForm;
