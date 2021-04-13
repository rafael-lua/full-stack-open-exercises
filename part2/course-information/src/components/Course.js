import React from "react";

const Header = (props) => {
  return (
    <h1>
      {props.courseName}
    </h1>
  )
}

const Part = (props) => {
  return (
    <p>{props.part.name} {props.part.exercises}</p>
  )
}

const Content = (props) => {
  return (
    <>
      { props.parts.map((part) => <Part part={part} key={part.id} /> ) }
    </>
  )
}

const Course = ({course}) => {
  return (
    <div>
      <Header courseName={course.name} />
      <Content parts={course.parts} />
    </div>
  )
}

export default Course;
