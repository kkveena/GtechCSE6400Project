import React from "react";
import Loader from "react-loader-spinner";
import {Link} from 'react-router-dom';
import props from 'prop-types';

export function Report1(props) {

    const [data, setData ]= React.useState([]);
    const [loading, setLoading ]= React.useState(false);



    // Fetch data when the component gets rendered
    React.useEffect(() => {
        setLoading(true);
        fetch('http://localhost:8080/report1?subTask=0', {
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
            <h2>Manufacturer’s Product Report</h2>
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

function reduceData(dataFromDB){
    const reducedDataAsObject = {};
    dataFromDB.forEach(datumFromDB => {
        const {
            manufacturer_name,
            total_products,
            average_retail_price,
            maximum_non_discounted_retail_price,
            minimum_non_discounted_retail_price
        } = datumFromDB;

        if(reducedDataAsObject[manufacturer_name] === undefined) {
            reducedDataAsObject[manufacturer_name] = {
                manufacturer_name: manufacturer_name,
                total_products: "",
                average_retail_price: "",
                maximum_non_discounted_retail_price: "",
                minimum_non_discounted_retail_price: ""

            }
        }


        reducedDataAsObject[manufacturer_name].total_products = total_products;
        reducedDataAsObject[manufacturer_name].average_retail_price = average_retail_price;
        reducedDataAsObject[manufacturer_name].maximum_non_discounted_retail_price = maximum_non_discounted_retail_price;
        reducedDataAsObject[manufacturer_name].minimum_non_discounted_retail_price = minimum_non_discounted_retail_price;

    });

    const reducedData = [];
        Object.keys(reducedDataAsObject).forEach(manufacturer_name => {
            reducedData.push(reducedDataAsObject[manufacturer_name]);
        });

     return reducedData;
}



function getRowContents(data){
    const rows = [
        <tr key="header-1" id="header-1">
            <th>Manufacturer_Name</th>
            <th>Manufacturer_Details</th>
            <th>Total_Products</th>
            <th>Average_Retail_Price</th>
            <th>Maximum_Non_Discounted_Retail_Price</th>
            <th>Minimum_Non_Discounted_Retail_Price</th>
        </tr>
    ]
    data.forEach(datum => {
        const {
            manufacturer_name,
            total_products,
            average_retail_price,
            maximum_non_discounted_retail_price,
            minimum_non_discounted_retail_price

        } = datum;


        rows.push(
            <tr key={manufacturer_name} id={manufacturer_name}>

                <td>{manufacturer_name}</td>
                <td>

                <Link to={{pathname:"/report1detail/" +manufacturer_name}}> {manufacturer_name} </Link>

                </td>
                <td>{total_products}</td>
                <td>{average_retail_price}</td>
                <td>{maximum_non_discounted_retail_price}</td>
                <td>{minimum_non_discounted_retail_price}</td>
            </tr>
        )
    });

    return rows;
}

