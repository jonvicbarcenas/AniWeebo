import Card from './Card'

const Students = [
  {name: "JV", age: 20, isStudent: true},
  {name: "bikyong", age: 20, isStudent: true},
  {name: "SpongeBob", age: 12, isStudent: false},
  {name: "Squidward", age: 12, isStudent: true}
]

function App() {

  return (
    <>
      <h1>React App</h1>
      {Students.map((student, index) => (
        student.isStudent ? <Card key={index} name={student.name} age={student.age} isStudent={student.isStudent} /> : null
      ))}
    </>
  ) 
}

export default App;