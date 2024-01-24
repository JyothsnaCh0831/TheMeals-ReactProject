import { Button, TextField } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { Fragment, useEffect, useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";


const Login = function() {

    // For Navigation
    const navigate = useNavigate();

    // Styling object
    const style = {
        image: {
            width: "100%",
            height: "100%",
            objectFit: "cover"
        },
        columnHeight : {
            height: "100vh",
        },
        columnMargin: {
            marginTop: "150px"
        },
        icon: {
            width: "50px",
            height: "50px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "50%",
            backgroundColor: "purple",
            color: "white",
            fontSize: "2rem"
        }
    };

    // For cookies
    const [cookie, setCookie, removeCookie] = useCookies();

    // To store all user details
    const [users, setUsers] = useState([]);

    // To get all user details
    function loadUserDetails() {
        axios({
            method: "get",
            url: "http://127.0.0.1:1500/register"
        }).then((response) => {
            console.log(response.data);
            setUsers(response.data);
        })
    }

    // To store login form details
    const [loginDetails, setLoginDetails] = useState({
        email: "",
        password: ""
    });

    // To store the errors
    const [errorValue, setErrorValue] = useState({
        email: false,
        password: false
    });

    // To store the error messages
    const [errorMsg, setErrorMsg] = useState({
        email: "",
        password: ""
    });
    
    // Validation for user email
    function handleEmail(e) {
        if(e.target.value === "") {
            setErrorValue({
                email: true,
                password: errorValue.password
            });

            setErrorMsg({
                email: "Required",
                password: errorMsg.password
            });
        } else {
            setErrorValue({
                email: false,
                password: errorValue.password
            });

            setErrorMsg({
                email: "",
                password: errorMsg.password
            });

            setLoginDetails({
                email: e.target.value,
                password: loginDetails.password
            });
        }
    }

    // Validation for user password
    function handlePassword(e) {
        if(e.target.value === "") {
            setErrorValue({
                email: errorValue.email,
                password: true
            });

            setErrorMsg({
                email: errorMsg.email,
                password: "Required"
            });
        } else {
            setErrorValue({
                email: errorValue.email,
                password: false
            });

            setErrorMsg({
                email: errorMsg.email,
                password: ""
            });

            setLoginDetails({
                email: loginDetails.email,
                password: e.target.value
            });
        }
    }

    // To check if the user exists
    const isUserExists = (loginDetails) => {
        return users.some((user) => (user.email === loginDetails.email) && (user.password === loginDetails.password));
    };

    // Login user
    function checkUserLogin(e) {
        e.preventDefault();
        if(isUserExists(loginDetails)) {
            // Storing in the cookies
            setCookie("user", loginDetails.email);

            alert("Login Successful");
            navigate("/");
        } else {
            setErrorValue({
                email: true,
                password: true
            });

            setErrorMsg({
                email: "Incorrect Email Address",
                password: "Incorrect Password"
            });
        }
    }

    useEffect(() => {
        loadUserDetails();
    }, []);

    return (
        <Fragment>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-7" style={style.columnHeight}>
                        <img src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fhips.hearstapps.com%2Fhmg-prod.s3.amazonaws.com%2Fimages%2Flow-carb-recipes-jambalaya-1545080855.jpg&f=1&nofb=1&ipt=c351ecf32a8abc145eef5f9ce64373dd99cca05559d0254b16a912086596600b&ipo=images" alt="" style={style.image}/>
                    </div>
                    <div className="col d-flex flex-column p-3 align-items-center" style={style.columnMargin}>
                        <div style={style.icon}>
                            <i className="bi bi-shield-lock"></i>
                        </div>
                        <h3>Sign in</h3>
                        <form onSubmit={checkUserLogin}>
                            <TextField label="Email Address" className="mt-3" type="email" name="email" required fullWidth onChange={handleEmail} onBlur={handleEmail} error={errorValue.email} helperText={errorMsg.email} />
                            <TextField label="Password" className="mt-3" type="password" name="password" required fullWidth onChange={handlePassword} onBlur={handlePassword} error={errorValue.password} helperText={errorMsg.password} />
                            <Button type="submit" variant="contained" color="info" className="mt-4 mb-3" fullWidth>Sign In</Button>
                        </form>
                        <div className="d-flex justify-content-between w-100">
                            <Link to="/forgot-password" style={{marginLeft: "30px"}}>Forgot Password?</Link>
                            <Link to="/register" style={{marginRight: "30px"}}>Don't have an account? Sign Up</Link>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}

export default Login;