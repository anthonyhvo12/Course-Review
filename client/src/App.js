import React, { Component, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = { apiResponse: "" };
    }

    callAPI() {
        fetch("http://localhost:9000/testAPI")
            .then(res => res.text())
            .then(res => this.setState({ apiResponse: res }))
            .catch(err => err);
    }

    componentDidMount() {
        this.callAPI();
    }

    render() {
        return (
            <Router>
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h1 className="App-title">Welcome to OhMyCourse!</h1>
                    
                        <div>
                            <Switch>
                                <Route path="/" exact={true}>
                                    <Index/>
                                </Route>
                                <Route path="/reviews">
                                    {/* <Reviews/> */}
                                    <Reviews apiCall = {this.state.apiCall}/>
                                </Route>
                            </Switch>
                        </div>
                    
                </header>
                <p className="App-intro">{this.state.apiResponse}</p>
            </div>
            </Router>
        );
    }
}

function Index() {
    console.log("Calling index")
    return (
        <Link id="submitLnk" to="/reviews">Submit a review here</Link>
    )
}

// TODO: handle submit button
// write a function to send to backend
// fetch api response from backend
// stuck - how to call api? - using hooks from this func or call app?
// should review have its own states? - not really saving the user data so no??
function Reviews(props) {

    const [apiResponse, setResponse] = React.useState("")
    
    function submitReview(e) {
        e.preventDefault()
        const review = {
            collegeName : document.getElementById("college").value,
            departmentName: document.getElementById("department").value,
            courseNumber: document.getElementById("courseNo").value,
            instructor: document.getElementById("instructor").value,
            numRating: document.getElementById("rating").value,
            review: document.getElementById("comments").value,
        }
        fetch('http://localhost:9000/reviews', 
        {
            method: 'post', 
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(review)
        }).then((res) => res.json())
        .then((res) => setResponse(res))
        .then(console.log(apiResponse))
    }

    useEffect(() => { // after componentDidMount/componentDidUpdate
        // submitReview()
        }
    )

    console.log("Calling reviews")
    return(
        <div>
            <form id="form" target="_blank">
                <label className="title" htmlFor="college">College or University: </label> 
                <input type="text" id="college" name="college" size="35" placeholder="Enter the college or university name"/><br></br> 
                <label className="title" htmlFor="courseNo">Course Number: </label> 
                <input type="text" id="courseNo" name="courseNo" size="35" placeholder="Enter the course number"/><br></br>
                <label className="title" htmlFor="instructor">Instructor: </label> 
                <input type="text" id="instructor" name="instructor" size="35" placeholder="Enter the instructor's name"/><br></br>  
                <label className="title" htmlFor="department">Department: </label>
                <input type="text" id="department" name="department" size="35" placeholder="Enter the department"/><br></br>
                <label className="title" htmlFor="rating">Numeric Rating: </label>
                <select name="rating" id="rating">
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                </select>
                <br></br>
                <label className="title" htmlFor="comments">Comments: </label>
                <textarea rows="6" cols="100" name="comments" id="comments" placeholder="Enter your detailed comments on the course here..."></textarea>
                <br></br>
                <input type="submit" value="Submit" onClick={submitReview}></input>
            </form>
        </div>
    )
}
export default App;