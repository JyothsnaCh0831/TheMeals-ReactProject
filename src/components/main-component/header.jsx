import axios from "axios";
import { Fragment, useEffect } from "react";
import { useCookies } from "react-cookie";
import { Link, useNavigate } from "react-router-dom";

const Header = function() {

    // For Navigation
    const navigate = useNavigate();

    // For cookies
    const [cookie, setCookie, removeCookie] = useCookies();

    // To Sign Out the user
    function handleSignOut() {
        removeCookie("user");
        navigate("/login");
    }

    // To load the meal details
    function loadRandomMealDetails() {
        axios({
            method: "get",
            url: "http://127.0.0.1:1500/randomMeal"
        }).then((response) => {
            navigate(`/getMealDetails/${response.data}`)
        });
    }

    useEffect(() => {
        // Verifying user login
        if(cookie["user"] === undefined) {
            navigate("/login");
        }
    }, []);

    return (
        <Fragment>
            <header>
                <nav className="navbar navbar-expand-lg bg-black p-3 rounded mb-4">
                    <Link to="/" className="navbar-brand fw-bold text-white">TheMealsDB</Link>
                    <ul className="navbar-nav">
                        <li className="nav-list">
                            <button className="btn btn-sm btn-warning fw-bold" onClick={loadRandomMealDetails}>Random Meal</button>
                        </li>
                        <li className="nav-list">
                            <button className="btn btn-sm btn-danger fw-bold text-white" onClick={handleSignOut}>
                                Logout
                            </button>
                        </li>
                    </ul>
                </nav>
            </header>
        </Fragment>
    );
}

export default Header;