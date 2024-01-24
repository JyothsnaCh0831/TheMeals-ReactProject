import { Button, Grid, TextField } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { Fragment, useEffect, useState } from "react";
import axios from "axios";

const Register = function () {

    // For Navigation
    const navigate = useNavigate();

    // Styles object
    const style = {
        anchor: {
            marginRight: "30px"
        },
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

    // To store the values of the form
    const [formValues, setFormValues] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: ""
    });

    // For handling the errors
    const [errorValue, setErrorValue] = useState({
        firstName: false,
        lastName: false,
        email: false,
        password: false
    });

    // For storing the error messages
    const [errorMsg, setErrorMsg] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: ""
    });

    // Register New User
    function registerNewUser(e) {
        e.preventDefault();
        axios({
            method: "post",
            url: "http://127.0.0.1:1500/register",
            data: formValues
        });
        alert("Registered Successfully");
        navigate("/");
    }

    // Validation for First Name
    function handleFirstName(e) {
        if(e.target.value === "") {
            setErrorValue({
                firstName: true,
                lastName: errorValue.lastName,
                email: errorValue.email,
                password: errorValue.password
            });

            setErrorMsg({
                firstName: "Required",
                lastName: errorMsg.lastName,
                email: errorMsg.email,
                password: errorMsg.password
            });
        } else {
            setErrorValue({
                firstName: false,
                lastName: errorValue.lastName,
                email: errorValue.email,
                password: errorValue.password
            });

            setErrorMsg({
                firstName: "",
                lastName: errorMsg.lastName,
                email: errorMsg.email,
                password: errorMsg.password
            });

            setFormValues({
                firstName: e.target.value,
                lastName: formValues.lastName,
                email: formValues.email,
                password: formValues.password
            });
        }
    }

    // Validating for Last Name
    function handleLastName(e) {
        if(e.target.value === "") {
            setErrorValue({
                firstName: errorValue.firstName,
                lastName: true,
                email: errorValue.email,
                password: errorValue.password
            });

            setErrorMsg({
                firstName: errorMsg.firstName,
                lastName: "Required",
                email: errorMsg.email,
                password: errorMsg.password
            });
        } else {
            setErrorValue({
                firstName: errorValue.firstName,
                lastName: false,
                email: errorValue.email,
                password: errorValue.password
            });

            setErrorMsg({
                firstName: errorMsg.firstName,
                lastName: "",
                email: errorMsg.email,
                password: errorMsg.password
            });

            setFormValues({
                firstName: formValues.firstName,
                lastName: e.target.value,
                email: formValues.email,
                password: formValues.password
            });
        }
    }

    // To check if the email already exists
    const isEmailAlreadyExists = (newEmail) => {
        return users.some((user) => user.email === newEmail);
    };

    // Validation for Email
    function handleEmail(e) {
        if(e.target.value === "") {
            setErrorValue({
                firstName: errorValue.firstName,
                lastName: errorValue.lastName,
                email: true,
                password: errorValue.password
            });

            setErrorMsg({
                firstName: errorMsg.firstName,
                lastName: errorMsg.lastName,
                email: "Required",
                password: errorMsg.password
            });
        } else if(!e.target.value.endsWith("@gmail.com")) {
            setErrorValue({
                firstName: errorValue.firstName,
                lastName: errorValue.lastName,
                email: true,
                password: errorValue.password
            });

            setErrorMsg({
                firstName: errorMsg.firstName,
                lastName: errorMsg.lastName,
                email: "Badly Formatted",
                password: errorMsg.password
            });
        } else {
            if (isEmailAlreadyExists(e.target.value)) {
                setErrorValue({
                    firstName: errorValue.firstName,
                    lastName: errorValue.lastName,
                    email: true,
                    password: errorValue.password
                });

                setErrorMsg({
                    firstName: errorMsg.firstName,
                    lastName: errorMsg.lastName,
                    email: "Email Address already taken",
                    password: errorMsg.password
                });
            } else { 
                setErrorValue({
                    firstName: errorValue.firstName,
                    lastName: errorValue.lastName,
                    email: false,
                    password: errorValue.password
                });

                setErrorMsg({
                    firstName: errorMsg.firstName,
                    lastName: errorMsg.lastName,
                    email: "",
                    password: errorMsg.password
                });

                setFormValues({
                    firstName: formValues.firstName,
                    lastName: formValues.lastName,
                    email: e.target.value,
                    password: formValues.password
                });
            }
        }
    }

    // Validation for Password
    function handlePassword(e) {
        if(e.target.value === "") {
            setErrorValue({
                firstName: errorValue.firstName,
                lastName: errorValue.lastName,
                email: errorValue.email,
                password: true
            });

            setErrorMsg({
                firstName: errorMsg.firstName,
                lastName: errorMsg.lastName,
                email: errorMsg.email,
                password: "Required"
            });
        } else if(!e.target.value.match(/^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/)) {
            setErrorValue({
                firstName: errorValue.firstName,
                lastName: errorValue.lastName,
                email: errorValue.email,
                password: true
            });

            setErrorMsg({
                firstName: errorMsg.firstName,
                lastName: errorMsg.lastName,
                email: errorMsg.email,
                password: `Minimum of 8 characters\n
                           Must contain a capital letter, a digit and a special character`
            });
        } else {
            setErrorValue({
                firstName: errorValue.firstName,
                lastName: errorValue.lastName,
                email: errorValue.email,
                password: false
            });

            setErrorMsg({
                firstName: errorMsg.firstName,
                lastName: errorMsg.lastName,
                email: errorMsg.email,
                password: ""
            });

            setFormValues({
                firstName: formValues.firstName,
                lastName: formValues.lastName,
                email: formValues.email,
                password: e.target.value
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
                            <i className="bi bi-person-fill"></i>
                        </div>
                        <h3>Sign up</h3>
                        <form onSubmit={registerNewUser}>
                            <Grid container spacing={2}>
                                <Grid item sm={6}> 
                                    <TextField label="FirstName" className="mt-3" type="text" name="firstName" fullWidth onChange={handleFirstName} onBlur={handleFirstName} error={errorValue.firstName} helperText={errorMsg.firstName}/>
                                </Grid>
                                <Grid item sm={6}>
                                    <TextField label="LastName" className="mt-3" type="text" name="lastName" fullWidth onChange={handleLastName} onBlur={handleLastName} error={errorValue.lastName} helperText={errorMsg.lastName}/>
                                </Grid>
                            </Grid>
                            <TextField label="Email Address" className="mt-3" type="email" name="email" fullWidth onChange={handleEmail} onBlur={handleEmail} error={errorValue.email} helperText={errorMsg.email}/>
                            <TextField label="Password" className="mt-3" type="password" name="password" fullWidth onChange={handlePassword} onBlur={handlePassword} error={errorValue.password} helperText={errorMsg.password}/>
                            <Button type="submit" variant="contained" color="info" fullWidth className="mt-4 mb-3" >Sign Up</Button>
                        </form>
                        <div className="d-flex justify-content-between w-100">
                            <div></div>
                            <Link to="/" style={style.anchor}>Already have an account? Sign In</Link>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}

export default Register;