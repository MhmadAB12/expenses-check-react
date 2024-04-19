import React, { useState, useEffect } from 'react';

const App = () => {
  const [expenses, setExpenses] = useState([]);
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');

  useEffect(() => {
    fetch('/api/expenses')

    .then(response => response.json())
    .then(data => setExpenses(data))
    .catch(error => console.error(error));
  }, []);

  const handleAddExpense = () => {
    if (!title || !amount) {
      alert('Please enter a title and amount');
      return;
    }

    fetch('/api/expenses', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ title, amount })
    })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        setTitle('');
        setAmount('');
        fetch('/api/expenses')
          .then(response => response.json())
          .then(data => setExpenses(data))
          .catch(error => console.error(error));
      } else {
        alert('An error occurred while adding the expense');
      }
    })
    .catch(error => console.error(error));
  };

  return (
    <div>
      <h1>Expense Tracker</h1>
      <div>
        <input
          type="text"
          placeholder="Enter title"
          value={title}
          onChange={event => setTitle(event.target.value)}
        />
        <input
          type="number"
          placeholder="Enter amount"
          value={amount}
          onChange={event => setAmount(event.target.value)}
        />
        <button onClick={handleAddExpense}>Add Expense</button>
      </div>
      <div>
        <h2>Expenses</h2>
        <ul>
          {expenses.map(expense => (
            <li key={expense.id}>
              {expense.title} - ${expense.amount}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default App;