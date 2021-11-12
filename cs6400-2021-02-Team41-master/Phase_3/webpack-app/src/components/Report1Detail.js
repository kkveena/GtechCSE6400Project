import React from "react";
import Loader from "react-loader-spinner";
import {Link} from 'react-router-dom';
import props from 'prop-types';
import { useLocation } from 'react-router-dom';

export function Report1Detail(props) {
    const { state } = useLocation();
    const [data, setData ]= React.useState([]);
    const [loading, setLoading ]= React.useState(false);
    const [manufacturerDetails, setManufacturerDetails] = React.useState([]);
    const [loadingManufacturersDetails, setLoadingManufacturersDetails ] = React.useState(false);
    const manuName = props.match.params.manufacturer_name;

    // Get manufacturers Details
    React.useEffect(() => {
        setLoadingManufacturersDetails(true);
        fetch('http://localhost:8080/report1details?subTask=0&manufacturerName='+ manuName, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
            },
        }).then(function (response) {
            return response.json()
        }).then(function (json) {
            const properlyShapedData = reduceDataDetails(json);
            setManufacturerDetails(properlyShapedData);
            console.log(properlyShapedData);
            setLoadingManufacturersDetails(false);
        }).catch(function (error) {
            // set back to default value
            console.log(error);
            setManufacturerDetails(undefined);

            setLoadingManufacturersDetails(false);
        });
    }, []);


    // Fetch data when the component gets rendered
    React.useEffect(() => {
        setLoading(true);
        fetch('http://localhost:8080/report1details?subTask=1&manufacturerName='+ manuName, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
            },
        }).then(function (response) {
            return response.json()
        }).then(function (json) {
            const properlyShapedData = json;

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
            <h2>Manufacturer Product's Detail Report</h2>
            {loading ?
                <Loader
                    type="TailSpin"
                    color="#00BFFF"
                    height={80}
                    width={80}
                    timeout={3000}
                />
                :
                <div>
                    {getReport1HeaderContents(manufacturerDetails)}
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


function getRowContents(data){
    const rows = [
        <tr key="header-1" id="header-1">

            <th>Product_Id</th>
            <th>Product_Name</th>
            <th>Categories</th>
            <th>Retail_Price</th>

        </tr>
    ]
    data.forEach(datum => {
        const {

            product_id,
            product_name,
            categories,
            retail_price

        } = datum;
        rows.push(
            <tr key={product_id} id={product_id}>

                <td>{product_id}</td>
                <td>{product_name}</td>
                <td>{categories}</td>
                <td>{retail_price}</td>

            </tr>
        )
    });
    return rows;
}

function reduceDataDetails(dataFromDB){
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


function getReport1HeaderContents(manufacturerDetails){
    const rows = [
        <tr key="header-2" id="header-2">
            <th style={{width:160}}>Manufacturer_Name</th>
            <th style={{width:110}}>Total_Products</th>
            <th style={{width:170}}>Average_Retail_Price</th>
            <th style={{width:170}}>Maximum_Retail_Price</th>
            <th style={{width:190}}>Minimum_Retail_Price</th>
        </tr>
    ]
    manufacturerDetails.forEach(manufacturerDetails => {
                const {
                    manufacturer_name,
                    total_products,
                    average_retail_price,
                    maximum_non_discounted_retail_price,
                    minimum_non_discounted_retail_price
                } = manufacturerDetails;
        rows.push(
            <tr key={manufacturer_name} id={manufacturer_name}>
                <td >{manufacturer_name}</td>
                <td >{total_products}</td>
                <td >{average_retail_price}</td>
                <td >{maximum_non_discounted_retail_price}</td>
                <td >{minimum_non_discounted_retail_price}</td>
            </tr>
        )
    });
    return rows;
}









