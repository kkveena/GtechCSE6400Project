import React from "react";
import Loader from "react-loader-spinner";

export function EditCityStatePopulation() {
    const [city, setCity] = React.useState("");
    const [state, setState] = React.useState("");
    const [currentPopulation, setCurrentPopulation] = React.useState("");
    const [newPopulation, setNewPopulation] = React.useState("");
    const [loadingGetCurrentPopulation, setLoadingGetCurrentPopulation ] = React.useState(false);
    const [loadingEditPopulation, setLoadingEditPopulation ] = React.useState(false);
    const [errorEditPopulation, setErrorEditPopulation ] = React.useState(false);
    const [errorGetPopulation, setErrorGetPopulation ] = React.useState(false);

    const getCurrentPopulation = React.useCallback(() => {
        setLoadingGetCurrentPopulation(true);
        setErrorGetPopulation(false);
        setErrorEditPopulation(false);
        // Make sure to pass in city and state to the request
        fetch(`http://localhost:8080/citystate?subTask=getPop&city=${city}&state=${state}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
            },
        }).then(function (response) {
            return response.json()
        })
        .then(function (json) {
            // Make sure to set the shape of the data correctly before setting it
            // number as string
            const properlyShapedData = reduceCurrentPopulation(json, setErrorGetPopulation);
            setCurrentPopulation(properlyShapedData);
            setLoadingGetCurrentPopulation(false);
        })
        .catch(function (error) {
            // set back to default value
            console.log(error);
            setCurrentPopulation("");
            setLoadingGetCurrentPopulation(false);
            setErrorGetPopulation(true);
        });

    }, [city, state]); // need to have these as dependencies as they will change when input changes

    const editPopulation = React.useCallback(() => {
        setLoadingEditPopulation(true);
        setErrorEditPopulation(false);
        setErrorGetPopulation(false);
        // Make sure to pass in city, state, and newPopulation to the request
        fetch(`http://localhost:8080/citystate?subTask=editPop&city=${city}&state=${state}&pop=${newPopulation}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
            },
        }).then (function (response) {return response.json()})
            .then(function (json) {
                setLoadingEditPopulation(false);
                checkForSuccessfulEditPopulation(json);
            })
            .catch(function (error) {
                console.log(error);
                setLoadingEditPopulation(false);
                setErrorEditPopulation(true);
            });

    }, [city, state, newPopulation]); // need to have these as dependencies as they will change when input changes

    return (
        <div>
            <h2>Edit city/state population</h2>

            <div>
                <div>
                    <label htmlFor="city">City:</label>
                    &nbsp;
                    <input type="text" id="city" name="city" onChange={(e) => {
                        setCity(e.target.value );
                        console.log(e.target.value);
                    }}/>
                </div>
                <br/>
                <div>
                    <label htmlFor="state">State:</label>
                    &nbsp;
                    <input type="text" id="state" name="state" onChange={(e) => {
                        setState(e.target.value );
                        console.log(e.target.value);
                    }}/>
                </div>
                <br/>
                {getCurrentPopulationSection(loadingGetCurrentPopulation, currentPopulation, getCurrentPopulation)}
                <br/>
                <div>
                    <label htmlFor="newPop">New population:</label>
                    &nbsp;
                    <input type="text" id="newPop" name="newPop" onChange={(e) => {
                        setNewPopulation(e.target.value );
                        console.log(e.target.value);
                    }}/>
                </div>
                <br/>
                {loadingEditPopulation ?
                    <Loader type="TailSpin" color="#00BFFF" height={40} width={40} timeout={3000} /> :
                    <button type="button" onClick={editPopulation}>Submit</button>
                }
                <br/>
                {errorEditPopulation || errorGetPopulation ? <div>Incorrect city and state pair combination</div> : null}
            </div>
        </div>
    );
}

function getCurrentPopulationSection(isLoading, population, getCurrentPopulation) {
    let populationField = null;
    if(isLoading){
        populationField = (
            <span>
                <Loader type="TailSpin" color="#00BFFF" height={40} width={40} timeout={3000} />
            </span>
        );
    }

    if(population !== "") {
        populationField = (
                <span>Current population:&nbsp;{population}</span>
        );
    }
    return (
        <div>
            <span>
                <button disabled={isLoading} type="button" onClick={getCurrentPopulation}>Get current population!</button>
            </span>
            &nbsp;
            {populationField}
        </div>
    );
}

function reduceCurrentPopulation(currentPopulationData, setErrorGetPopulation) {
    if(currentPopulationData === undefined||
        currentPopulationData.length === 0
    )  {
        setErrorGetPopulation(true);
        return ''
    }
    const { population } = currentPopulationData[0];
    return population.toString();
}

function checkForSuccessfulEditPopulation(editPopulationData, setErrorEditPopulation) {
    if(editPopulationData === undefined||
        editPopulationData.length === 0
    )  {
        setErrorEditPopulation(true);
    }

    const { rowsAffected } = editPopulationData[0];
    if(rowsAffected === 0){
        setErrorEditPopulation(true);
    }
}