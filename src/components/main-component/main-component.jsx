import { Fragment } from "react";
import { Component } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ForgotPassword from "../login/forgot-password";
import Register from "../login/register";
import Login from "../login/login";
import Categories from "../categories/categories";
import CategoryMeals from "../category-meals/category-meals";
import MealDetails from "../meals-details/meals-details";
import Header from "./header";


const MainComponent = function () {
    return (
        <Fragment>
            <BrowserRouter>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/forgot-password" element={<ForgotPassword />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/" element={<Categories />} />
                    <Route path="/getCategory/:name" element={<CategoryMeals />} />
                    <Route path="/getMealDetails/:id" element={<MealDetails />} />
                </Routes>
            </BrowserRouter>
        </Fragment>
    );
}

export default MainComponent;