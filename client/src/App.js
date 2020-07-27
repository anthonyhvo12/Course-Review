import React, { Component, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    withRouter
} from "react-router-dom";
// import { exists, db } from "../../api/models/reviews";
import _ from 'lodash';
import Select from "react-select";

const loadColleges = require('./loadColleges.js')


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
                                <Route path="/reviews/submit">
                                    {/* <Reviews/> */}
                                    {/* <Reviews apiCall = {this.state.apiCall}/> */}
                                    <Submission/>
                                </Route>
                                <Route path="/reviews/search">
                                    <SearchForm/>
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
        <Link id="submitLnk" to="/reviews/submit">Submit a review here</Link>
    )
}

class SearchForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fullList: "",
            filteredList: [],
            typing: false,
            typingTimeout: 0
        }
    }

    async callAPI() {
        const list = await loadColleges()
    //extract college name from this list, put in uniList
        const tempList = []
        list.forEach((college) => {
            // console.log(college)
            tempList.push({'value': college.Name, 'label': college.Name})
        })
        this.setState({fullList: tempList})
    }

    componentDidMount() {
        this.callAPI()
    }

    filterColleges() {
        _.debounce((searchTerm) => {
            const list = this.state.fullList.filter((name) => {
                return name.includes(searchTerm)
            })
            this.setState({filteredList: list})
        }, 500)
    }

    // getColleges(searchTerm, callback) {
    //     filterColleges(searchTerm)
    //     .then((result) => callback(null, {options: result})
    //     .catch((error) => callback(error, null)))
    // }

    render() {
        return (
            <div>
                <form id="form" target="_blank"></form>
                {/* display a list of colleges from db */}
                <label className="title" htmlFor="college">Enter the name of the college or university: </label> 
                {/* tried asyncselect */}
                <Select isSearchable={true} options={this.state.fullList} onInputChange={this.filterColleges}/>
            </div>
        )
    }
}
// a button for inputting college name
// which redirects user to a new page with all departments and review from that college
// how about: college => dpm => couseNo => instructor
// college: onPress event call to db, if doesnt exists, throw an error
// display: a list of everything?
// at each step , append to query object
// a link to click on courses

// function SearchForm(props) {

//     const [collegeList, setCollegeList] = React.useState("")
//     const [typing, setTypingTimeout]
//     // Jul16: load unis to this arr
//     // useEffect will update the select with api call
//     // need to assign a ref to the select <old sln>

//     //0718
//     //NEW SLN: make the select refer to a state named uniList
//     //uniList gets updated with api calls
    
//     useEffect(() => {
//         let mounted = true

        
//         async function callAPI() {
//             const list = await loadColleges()
//         //extract college name from this list, put in uniList
//             const tempList = []
//             list.forEach((college) => {
//                 // console.log(college)
//                 tempList.push({'value': college.Name, 'label': college.Name})
//             })
//             console.log(tempList)
//             if (mounted) { //componentdidmount
//                 setCollegeList(tempList.slice(1,10))
//             }
//         }
//         callAPI()
//         return function cleanup() { //componentdidUnmount
//             mounted = false
//         }
//     })
//     // for each entry in colleges:...
//     return (
//         <div>
//             <form id="form" target="_blank"></form>
//               {/* display a list of colleges from db */}
//               <label className="title" htmlFor="college">Enter the name of the college or university: </label> 
//               <Select options = {debounce(this.getColleges, 500)}/>
//         </div>

//     )
// }



// export default withRouter(UniListParser);

function Submission(props) {

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