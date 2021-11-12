import React from "react";
import Loader from "react-loader-spinner";

export function Report7() {

    const [data, setData ]= React.useState([]);
    const [loading, setLoading ]= React.useState(false);
    const getMoreDataS = React.useCallback(() => {
        setLoading(true);
        // Make sure to pass in city and state to the request
        fetch('http://localhost:8080/report7?subTask=s', {
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
                setData(json);
                setLoading(false);
            })
            .catch(function (error) {
                // set back to default value
                console.log(error);
                setData({});
                setLoading(false);
            });

    }, []);
    const getMoreDataM = React.useCallback(() => {
        setLoading(true);
        // Make sure to pass in city and state to the request
        fetch('http://localhost:8080/report7?subTask=m', {
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
                setData(json);
                setLoading(false);
            })
            .catch(function (error) {
                // set back to default value
                console.log(error);
                setData({});
                setLoading(false);
            });

    }, []);
    const getMoreDataL = React.useCallback(() => {
        setLoading(true);
        // Make sure to pass in city and state to the request
        fetch('http://localhost:8080/report7?subTask=l', {
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
                setData(json);
                setLoading(false);
            })
            .catch(function (error) {
                // set back to default value
                console.log(error);
                setData({});
                setLoading(false);
            });

    }, []);
    const getMoreDataX = React.useCallback(() => {
        setLoading(true);
        // Make sure to pass in city and state to the request
        fetch('http://localhost:8080/report7?subTask=x', {
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
                setData(json);
                setLoading(false);
            })
            .catch(function (error) {
                // set back to default value
                console.log(error);
                setData({});
                setLoading(false);
            });

    }, []);
    // Fetch data when the component gets rendered
    React.useEffect(() => {
        setLoading(true);
        fetch('http://localhost:8080/report7?subTask=s', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
            },
        }).then(function (response) {
            return response.json()
        }).then(function (json) {
            const properlyShapedData = reduceData(json);
            setData(properlyShapedData);
            setLoading(false);
        }).catch(function (error) {
            // set back to default value
            console.log(error);
            setData([]);
            setLoading(false);
        });
    }, []);
    return (
        <div>
          <h2>Revenue by Population</h2>
                {loading ?
                    <Loader
                        type="TailSpin"
                        color="#00BFFF"
                        height={80}
                        width={80}
                        timeout={3000}
                    />
                    :
                    <div id="any">
                        <b>(Sorted by city size ascending, year ascending.)</b>
                        <br/>
                        <button onClick={getMoreDataS}>Small (population &lt; 3,700,000) </button>
                        <br/>
                        <button onClick={getMoreDataM}>Medium population >= 3,700,000 and &lt; 6,700,000</button>
                        <br/>
                        <button onClick={getMoreDataL}>Large population >= 6,700,000 and &lt; 9,000,000</button>
                        <br/>
                        <button onClick={getMoreDataX}>Extra Large population &gt; 9,000,000</button>
                        <br/>
                        <table id="customtable">
                            <tbody>
                            {getRowContents(data)}
                            </tbody>
                        </table>
                    </div>
                }
        </div>
    );
}

function reduceData(dataFromDB){
    const reducedDataAsObject = {};
    dataFromDB.forEach(datumFromDB => {
        const {
            yos,
            cityName,
            totalSales,
        } = datumFromDB;

        if(reducedDataAsObject[yos] === undefined) {
            reducedDataAsObject[yos] = {
                yos: yos,
                cityName: cityName,
                totalSales: totalSales,
            }
        }

    });

    const reducedData = [];
    Object.keys(reducedDataAsObject).forEach((cityName) => {
        reducedData.push(reducedDataAsObject[cityName]);
    });

    return reducedData;
}

function getRowContents(data){
    const rows = [
        <tr key="header-1" id="header-1">
            <th>Year</th>
            <th>City-Name</th>
            <th>Total-Sales</th>
        </tr>
    ]
    data.forEach(datum => {
        const {
            yos,
            cityName,
            totalSales,
        } = datum;

        rows.push(
            <tr key={yos} id={yos}>
                <td>{yos}</td>
                <td>{cityName}</td>
                <td>{totalSales}</td>
            </tr>
        )
    });

    return rows;
}