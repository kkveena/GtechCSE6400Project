import React from "react";
import Loader from "react-loader-spinner";

export function Report6() {

    const [month, setMonth] = React.useState("");
    const [year, setYear] = React.useState("");

    const [data, setData] = React.useState([]);
    const [loading, setLoading] = React.useState(false);

    // Fetch data when the component gets rendered
    const getReport6 = React.useCallback(() => {
        setLoading(true);

        console.log("Input month:" + month);
        console.log("Input year:" + year);

        var url = 'http://localhost:8080/report6?subTask=0&year=' + year + '&month=' + month;
        console.log("Input url:" + url);

        // Make sure to pass in city and state to the request
        fetch(url, {
        //fetch('http://localhost:8080/report6?subTask=0&year=2012&month=02', {
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
                console.log("before reduceData json:" + json);
                const properlyShapedData = reduceData(json);
                console.log("after properlyShapedData:" + properlyShapedData);

                setData(properlyShapedData);
                setLoading(false);
            })
            .catch(function (error) {
                // set back to default value
                console.log(error);
                setData("");
                setLoading(false);
            });

    }, [year, month]); // need to have these as dependencies as they will change when input changes

  
    return (

        <div>
            <h2>State with highest volume</h2>
            <b>Make the Month and Year selection</b>

            <div>
                <label htmlFor="month">Month:</label>
                &nbsp;
                    <input type="text" id="month" name="month" onChange={(e) => {
                    setMonth(e.target.value);
                    console.log(e.target.value);
                }} />
            </div>
            <br />
            <div>
                <label htmlFor="year">Year:</label>
                &nbsp;
                    <input type="text" id="year" name="year" onChange={(e) => {
                    setYear(e.target.value);
                    console.log(e.target.value);
                }} />
            </div>
            <br />
            <button type="button" onClick={getReport6}>Submit</button>
            {getReport6Section(loading, data)
            }
        </div>
    );
}

function getReport6Section(isLoading, data) {
    if (isLoading) {
        return (
                <Loader type="TailSpin" color="#00BFFF" height={40} width={40} timeout={3000} />
        );
    }

    return (<table id="customtable">
        <tbody>
            {getRowContents(data)}
        </tbody>
    </table>);

    
}

function reduceData(dataFromDB) {
    const reducedDataAsObject = {};
    dataFromDB.forEach(datumFromDB => {
        const {
            category_name,
            state_name,
            max_quantity_sold
        } = datumFromDB;

        if (reducedDataAsObject[category_name] === undefined) {
            reducedDataAsObject[category_name] = {
                category_name: category_name,
                state_name: "",
                max_quantity_sold: ""
            }
        }

        reducedDataAsObject[category_name].state_name = state_name;
        reducedDataAsObject[category_name].max_quantity_sold = max_quantity_sold;
    });

    const reducedData = [];
    Object.keys(reducedDataAsObject).forEach(category_name => {
        reducedData.push(reducedDataAsObject[category_name]);
    });

    return reducedData;
}

function getRowContents(data) {
    const rows = [
        <tr key="header-1" id="header-1">
            <th>category_name</th>
            <th>state_name</th>
            <th>max_quantity_sold</th>
        </tr>
    ]
    data.forEach(datum => {
        const {
            category_name,
            state_name,
            max_quantity_sold,
        } = datum;

        rows.push(
            <tr key={category_name} id={category_name}>
                <td>{category_name}</td>
                <td>{state_name}</td>
                <td>{max_quantity_sold}</td>
            </tr>
        )
    });

    return rows;
}
