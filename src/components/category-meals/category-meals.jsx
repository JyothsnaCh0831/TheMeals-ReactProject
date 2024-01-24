import { Link, useParams } from "react-router-dom";
import { Fragment, useEffect, useState } from "react";
import { Button, Card, CardActions, CardContent, CardMedia, Grid, Typography } from "@mui/material";
import axios from "axios";
import Header from "../main-component/header";

const CategoryMeals = function() {

    // For styling
    const style = {
        card: {
            display: "flex", 
            flexDirection: "row", 
            height: "100%", 
            padding: "20px"
        },
        cardHeight: {
            height: "100%"
        },
        containerMargin: {
            marginBottom: "30px"
        }
    }

    // For getting parameters in url
    const params = useParams();

    // To store the data
    const [categoryDetails, setCategoryDetails] = useState({
        idCategory: "",
        strCategory: "",
        strCategoryThumb: "",
        strCategoryDescription: ""
    });
    const [categoryMeals, setCategoryMeals] = useState([]);

    // To load the categories
    function getCategoryDetails() {
        axios({
            method: "get",
            url: "http://127.0.0.1:1500/"
        }).then((response) => {
            for(var category of response.data.categories) {
                if(category.strCategory === params.name) {
                    setCategoryDetails(category);
                }
            }
        })
    }

    // To load the category details
    function loadCategoryDetails() {
        axios({
            method: "get",
            url: `http://127.0.0.1:1500/getCategory/${params.name}`
        }).then((response) => {
           setCategoryMeals(response.data.meals); 
        });
    }

    useEffect(() => {
        getCategoryDetails();
        loadCategoryDetails();
    }, []);

    return (
        <Fragment>
            <div className="container-fluid p-3">
                <Header />
                <Grid container style={style.containerMargin}>
                    <Grid item>
                        <Card style={style.card}>
                            <CardMedia component="img" image={categoryDetails.strCategoryThumb}/>
                            <CardContent>
                                <Typography variant="h3">{categoryDetails.strCategory}</Typography>
                                <Typography variant="p" textAlign="justify">{categoryDetails.strCategoryDescription}</Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
                <h1>Meals of {categoryDetails.strCategory}</h1>
                <Grid container spacing={3}>
                    {
                        categoryMeals.map(meal => 
                            <Grid item sm={3} key={meal.idMeal}>
                                <Card style={style.cardHeight}>
                                    <CardMedia component="img" image={meal.strMealThumb} />
                                    <CardContent>
                                        <Typography variant="h5">{meal.strMeal}</Typography>
                                    </CardContent>
                                    <CardActions>
                                        <Link to={`/getMealDetails/${meal.idMeal}`}>
                                            <Button size="small" color="error" className="fw-bold">Learn More</Button>
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

export default CategoryMeals;