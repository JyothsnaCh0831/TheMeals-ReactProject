import { useParams } from "react-router-dom";
import { Fragment, useEffect, useState } from "react";
import { Card, CardContent, CardMedia, Grid, TableBody, TableCell, TableContainer, TableRow, Table, Typography, TableHead, Paper } from "@mui/material";
import axios from "axios";
import Header from "../main-component/header";

const MealDetails = function () {

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
        },
        cardImage: {
            width: "500px",
            height: "500px",
            borderRadius: "30px"
        }
    }

    // For getting parameters in url
    const params = useParams();

    // For storing the meal details
    const [mealDetails, setMealDetails] = useState([]);

    // For getting the meal details
    function getMealDetails() {
        axios({
            method: "get",
            url: `http://127.0.0.1:1500/getMealDetails/${params.id}`
        }).then((response) => {
            setMealDetails(response.data.meals);
        });
    }

    useEffect(() => {
        getMealDetails();
    }, [mealDetails]);
    
    return (
        <Fragment>
            <div className="container-fluid p-3">
                <Header />
                <Grid container style={style.containerMargin}>
                    {
                        mealDetails.map(meal => 
                            <Grid item>
                                <Card style={style.card}>
                                    <CardMedia component="img" image={meal.strMealThumb} style={style.cardImage}/>
                                    <CardContent>
                                        <Typography variant="h3" color="error">{meal.strMeal}</Typography>
                                        <br />
                                        <h4>Instructions</h4>
                                        <Typography variant="p" textAlign="justify">{meal.strInstructions}</Typography>
                                        <br /><br />
                                        <h4>Other Information</h4>
                                        <TableContainer component={Paper}>
                                            <Table sx={{minWidth: "400px"}}>
                                                <TableHead>
                                                    <TableRow>
                                                        <TableCell className="fw-bold" align="center">Information</TableCell>
                                                        <TableCell className="fw-bold" align="center">Details</TableCell>
                                                    </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                    <TableRow>
                                                        <TableCell align="center">Category</TableCell>
                                                        <TableCell align="center">{meal.strCategory}</TableCell>
                                                    </TableRow>
                                                    <TableRow>
                                                        <TableCell align="center">Area</TableCell>
                                                        <TableCell align="center">{meal.strArea}</TableCell>
                                                    </TableRow>
                                                    <TableRow>
                                                        <TableCell align="center">Tags</TableCell>
                                                        <TableCell align="center">{(meal.strTags !== null) ? meal.strTags : "No Tags"}</TableCell>
                                                    </TableRow>
                                                    <TableRow>
                                                        <TableCell align="center">Watch on Youtube</TableCell>
                                                        <TableCell align="center">
                                                            {(meal.strYoutube !== null) ? 
                                                            <a href={meal.strYoutube} target="_blank" rel="noopener noreferrer">
                                                                    Click Here
                                                            </a>
                                                             : "No URL"}
                                                        </TableCell>
                                                    </TableRow>
                                                </TableBody>
                                            </Table>
                                        </TableContainer>
                                    </CardContent>
                                </Card>
                            </Grid>
                        )
                    }
                </Grid>
            </div>
        </Fragment>
    );
}

export default MealDetails;