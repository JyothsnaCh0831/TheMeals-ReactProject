import { Button, TextField } from "@mui/material";
import { Link } from "react-router-dom";
import { Fragment, PureComponent } from "react";

const ForgotPassword = function () {

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
                        <h3>Forgot Password</h3>
                        <TextField label="Email Address" required fullWidth className="mt-3" type="email"/>
                        <Button variant="contained" color="info" fullWidth className="mt-4 mb-3">Send Verification</Button>
                        <div className="d-flex justify-content-between w-100">
                            <Link to="/forgot-password">
                                <a className="">Back to Login</a>
                            </Link>
                            <Link to="/register">
                                <a>Don't have an account? Sign Up</a>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}

export default ForgotPassword;