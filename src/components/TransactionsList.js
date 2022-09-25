import React, {useEffect, useState} from "react";
import Transaction from "./Transaction";

function TransactionsList({search}) {
  const [transactions, setTransactions] = useState([]);
  const filteredTransactions = transactions.filter((transaction) => transaction.description.toLowerCase().includes(search.toLowerCase()))

  const transactList = filteredTransactions.map((transaction) => {
    return (
    <Transaction transactions={transactions} setTransactions={setTransactions} key={transaction.id} date={transaction.date} description={transaction.description} category={transaction.category} amount={transaction.amount} id={transaction.id} />
    )
})

  useEffect(() => {
    fetch("http://localhost:8001/transactions")
      .then((r) => r.json())
      .then((dataObj) => setTransactions(dataObj))
  },[setTransactions])

  return (
    <table className="ui celled striped padded table">
      <tbody>
        <tr>
          <th>
            <h3 className="ui center aligned header">Date</h3>
          </th>
          <th>
            <h3 className="ui center aligned header">Description</h3>
          </th>
          <th>
            <h3 className="ui center aligned header">Category</h3>
          </th>
          <th>
            <h3 className="ui center aligned header">Amount</h3>
          </th>
        </tr>
        {transactList}
      </tbody>
    </table>
  );
}

export default TransactionsList;
