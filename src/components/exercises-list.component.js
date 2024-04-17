import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Exercise = (props) => {
  console.log("Summaries:", props.exercise.summaries);
  return (
    <tr>
      <td>{props.id}</td>
      <td>{props.exercise.def_name}</td>
      <td>{props.exercise.def_addr}</td>
      <td>{props.exercise.crime_type}</td>
      <td>{props.exercise.crime_date}</td>
      <td>{props.exercise.crime_location}</td>
      <td>{props.exercise.ao_name}</td>
      <td>{props.exercise.arrest_date}</td>
      <td>{props.exercise.judge_name}</td>
      <td>{props.exercise.lawyer_name}</td>
      <td>{props.exercise.prosecutor_name}</td>
      <td>{props.exercise.start_date}</td>
      <td>{props.exercise.end_date}</td>
      <td>{props.exercise.status}</td>
      <td>
        {props.exercise.summaries &&
          props.exercise.summaries.map((summary, sIndex) => (
            <div key={sIndex}>
              <div>
                <b>Hearing Date:</b>{" "}
                {new Date(summary.hearingDate).toLocaleDateString()}
              </div>
              <div>
                <b>Summary:</b> {summary.summary}
              </div>
              <hr/>
            </div>
          ))}
      </td>
      <td id="update">
        <Link to={"/update/" + props.exercise._id}>update</Link>
      </td>
    </tr>
  );
};

export default class ExercisesList extends Component {
  constructor(props) {
    super(props);
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
    return this.state.exercises.map((currentExercise, id) => {
      return (
        <Exercise
          exercise={currentExercise}
          id={id + 1}
          key={currentExercise._id}
        />
      );
    });
  };

  render() {
    return (
      <div>
        <h3>Cases</h3>
        <div className="table-responsive">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>CIN</th>
                <th>Defendant Name</th>
                <th>Defendant Addr</th>
                <th>Crime type</th>
                <th>Crime date</th>
                <th>Crime location</th>
                <th>Arresting Officer</th>
                <th>Arrest date</th>
                <th>Judge name</th>
                <th>Lawyer name</th>
                <th>Prosecutor name</th>
                <th>Start date</th>
                <th>End date</th>
                <th>Status</th>
                <th>Adjournment</th>
                {/* <th>Actions</th> */}
              </tr>
            </thead>
            <tbody>{this.exerciseList()}</tbody>
          </table>
        </div>
      </div>
    );
  }
}
