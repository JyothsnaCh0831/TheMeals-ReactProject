import { Fragment, useEffect, useState } from "react";
import "./categories.css";
import axios from "axios";
import { Link } from "react-router-dom";
import { Button, Card, CardActions, CardContent, CardMedia, Grid, Typography } from "@mui/material";
import Header from "../main-component/header";

const Categories = function() {

    // To store categories
    const [categories, setCategories] = useState([
        {
            idCategory: "",
            strCategory: "",
            strCategoryThumb: "",
            strCategoryDescription: ""
        }
    ]);

    // Get all categories
    function getCategories() {
        axios({
            method: "get",
            url: "http://127.0.0.1:1500/"
        }).then((response) => {
            setCategories(response.data.categories);
        })
    }

    useEffect(() => {
        getCategories();
    }, []);

    return (
        <Fragment>
            <div className="container-fluid p-3">
                <Header />
                <h1>List of Categories</h1>
                <Grid container spacing={3}>
                    {
                        categories.map(category => 
                            <Grid item sm={3} key={category.idCategory}>
                                <Card>
                                    <CardMedia component="img" image={category.strCategoryThumb} />
                                    <CardContent>
                                        <Typography variant="h5" align="center">{category.strCategory}</Typography>
                                    </CardContent>
                                    <CardActions>
                                        <Link to={`/getCategory/${category.strCategory}`}>
                                            <Button size="small" color="error" className="fw-bold" >Learn More</Button>
                                        </Link>
                                    </CardActions>
                                </Card>
                            </Grid>
                        )
                    }
                </Grid>
            </div>
        </Fragment>
    );
}

export default Categories;