import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import moment from "moment";

const Exercise = (props) => (
  <tr>
    <td>{props.id}</td>
    <td>{props.exercise.def_name}</td>
    {/* <td>{props.exercise.def_addr}</td> */}
    <td>{props.exercise.crime_type}</td>
    <td>{moment(props.exercise.crime_date).format("MMM Do YY")}</td>
    {/* <td>{props.exercise.crime_location}</td> */}
    <td>{props.exercise.ao_name}</td>
    <td>{moment(props.exercise.arrest_date).format("MMM Do YY")}</td>
    <td>{props.exercise.judge_name}</td>
    <td>{props.exercise.lawyer_name}</td>
    <td>{props.exercise.prosecutor_name}</td>
    <td>{moment(props.exercise.start_date).format("MMM Do YY")}</td>
    <td>{moment(props.exercise.end_date).format("MMM Do YY")}</td>
    {/* <td>{props.exercise.status}</td> */}
    {/* <td>{props.exercise.summary}</td> */}
    {/* <td>{props.exercise.date.substring(0,10)}</td> */}
    <td id="update">
      <Link to={"/update/" + props.exercise._id}>update</Link>
    </td>
  </tr>
);

export default class ExercisesList extends Component {
  constructor(props) {
    super(props);

    // this.deleteExercise = this.deleteExercise.bind(this);

    // this.exerciseList = this.exerciseList.bind(this);

    this.state = { exercises: [] };
  }

  componentDidMount() {
    axios
      .get("http://localhost:5000/exercises")
      .then((response) => {
        this.setState({ exercises: response.data });
      })
      .catch((err) => console.log(err));
  }

  exerciseList = () => {
    const registrar = localStorage.getItem("registrar");
    console.log(registrar);
    return this.state.exercises.map((currentExercise, id) => {
      return (
        <Exercise
          registrar={registrar}
          exercise={currentExercise}
          id={id + 1}
          key={currentExercise._id}
        />
      );
    });
  };

  render() {
    return (
      <div style={{ margin: "1em 0.5em" }}>
        <h2>Cases</h2>
        <table class="table table-striped" style={{ marginBottom: "2em" }}>
          <table class="table">
            <thead>
              <tr>
                <th>CIN</th>
                <th>Defandant Name</th>
                {/* <th>Defandant Addr</th> */}
                <th>Crime type</th>
                <th>Crime date</th>
                {/* <th>Crime location</th> */}
                <th>Arresting Officer</th>
                <th>Arrest date</th>
                <th>Judge name</th>
                <th>Lawyer name</th>
                <th>Prosecutor name</th>
                <th>Start date</th>
                <th>End date</th>
                {/* <th>Status</th> */}
                {/* <th>Summary</th> */}
                <th>Update</th>
              </tr>
            </thead>
            <tbody>{this.exerciseList()}</tbody>
          </table>
        </table>
      </div>
    );
  }
}
