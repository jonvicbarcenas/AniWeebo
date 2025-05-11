import './Card.css'
import PropTypes from 'prop-types'


export default function Card(props) {
  return (
    <div className="student">
        <p> Name: {props.name} </p>
        <p> Age: {props.age}</p>
        <p> Student: {props.isStudent ? "Yes" : "No"}</p>
    </div>
  )
}

Card.propTypes = {
    name: PropTypes.string,
    age: PropTypes.number,
    isStudent: PropTypes.bool
}

Card.defaultProps = {
    name: "Unknown",
    age: 0,
    isStudent: false
}