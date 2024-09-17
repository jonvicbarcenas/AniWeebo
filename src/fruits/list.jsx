import React from 'react'

export default function List() {
    const fruits = [
      {id: 1, name: "Apple", calories: 95},
      {id: 2, name: "Banana", calories: 105},
      {id: 3, name: "Cherry", calories: 77},
      {id: 4, name: "Date", calories: 23},
      {id: 5, name: "Elderberry", calories: 73},
    ];

    // fruits.sort((a, b) => a.name.localeCompare(b.name)) // sort by name

    // fruits.sort((a, b) => a.calories - b.calories) // sort by calories
    // fruits.reverse() // reverse the order of the array

    const LowCalorieFruits = fruits.filter(fruit => fruit.calories < 100)

    // const listItems = fruits.map((fruit) => <li key={fruit.id}>{fruit.name}: &nbsp; CALORIES <b>{fruit.calories}</b></li>)

    const listItems = LowCalorieFruits.map((fruit) => <li key={fruit.id}>{fruit.name}: &nbsp; CALORIES <b>{fruit.calories}</b></li>)

  return (
    <ol> {listItems} </ol>
  )
}
