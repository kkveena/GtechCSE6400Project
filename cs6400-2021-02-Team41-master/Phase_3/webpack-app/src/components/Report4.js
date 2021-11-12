import React from "react";
import Loader from "react-loader-spinner";
import {Link} from 'react-router-dom';
import props from 'prop-types';

export function Report4(props) {

    const [data, setData ]= React.useState([]);
    const [loading, setLoading ]= React.useState(false);



    // Fetch data when the component gets rendered
    React.useEffect(() => {
        setLoading(true);
        fetch('http://localhost:8080/report4?subTask=1', {
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
            <h2>Report 4</h2>
            {loading ?
                <Loader
                    type="TailSpin"
                    color="#00BFFF"
                    height={80}
                    width={80}
                    timeout={3000}
                />
                :
                <table id="customtable">
                    <tbody>
                    {getRowContents(data)}
                    </tbody>
                </table>
            }
        </div>
    );
}

function reduceData(dataFromDB) {
    const reducedDataAsObject = {};
    dataFromDB.forEach(datumFromDB => {
        const {
            store_number,
            street_address,
            city_name,
            state_name,
            year,
            total_revenue
        } = datumFromDB;

        if (reducedDataAsObject[year] === undefined) {
            reducedDataAsObject[year] = {
                year: year,
                store_number: "",
                street_address: "",
                city_name: "",
                state_name: "",
                total_revenue: "",
            }
        }
        reducedDataAsObject[year].store_number = store_number;
        reducedDataAsObject[year].street_address = street_address;
        reducedDataAsObject[year].city_name = city_name;
        reducedDataAsObject[year].state_name = state_name;
        reducedDataAsObject[year].total_revenue = total_revenue
    });

    const reducedData = [];
    Object.keys(reducedDataAsObject).forEach(year => {
        reducedData.push(reducedDataAsObject[year]);
    });

    return reducedData;
}
function getRowContents(data) {
    const rows = [
        <tr key="header-1" id="header-1">
            <th>store_number</th>
            <th>street_address</th>
            <th>city_name</th>
            <th>state_name</th>
            <th>year</th>
            <th>total_revenue</th>
        </tr>
    ]
    data.forEach(datum => {
        const {
            store_number,
            street_address,
            city_name,
            state_name,
            year,
            total_revenue
        } = datum;

        rows.push(
            <tr key={year} id={year}>
                <td>{store_number}</td>
                <td>{street_address}</td>
                <td>{city_name}</td>
                <td>{state_name}</td>
                <td>{year}</td>
                <td>{total_revenue}</td>
            </tr>
        )
    });

    return rows;
}
