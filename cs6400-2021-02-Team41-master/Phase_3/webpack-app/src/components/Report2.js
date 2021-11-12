import React from "react";
import Loader from "react-loader-spinner";

export function Report2() {

    const [data, setData ]= React.useState([]);
    const [loading, setLoading ]= React.useState(false);

    // Fetch data when the component gets rendered
    React.useEffect(() => {
        setLoading(true);
        fetch('http://localhost:8080/report2?subTask=0', {
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
            <h2>Category Report</h2>
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
            category_name,
            total_products,
            avg_retail_price,
            max_retail_price,
            min_retail_price
        } = datumFromDB;

        if(reducedDataAsObject[category_name] === undefined) {
            reducedDataAsObject[category_name] = {
                category_name: category_name,
                total_products: "",
                avg_retail_price: "",
                max_retail_price: "",
                min_retail_price: ""
            }
        }
        reducedDataAsObject[category_name].total_products = total_products;
        reducedDataAsObject[category_name].avg_retail_price = avg_retail_price;
        reducedDataAsObject[category_name].max_retail_price = max_retail_price;
        reducedDataAsObject[category_name].min_retail_price = min_retail_price;

    });

    const reducedData = [];
        Object.keys(reducedDataAsObject).forEach(category_name => {
            reducedData.push(reducedDataAsObject[category_name]);
        });

     return reducedData;
}



function getRowContents(data){
    const rows = [
        <tr key="header-1" id="header-1">
            <th>Category_Name</th>
            <th>Total_Products</th>
            <th>Avg_Retail_Price</th>
            <th>Max_Retail_Price</th>
            <th>Min_Retail_Price</th>
        </tr>
    ]
    data.forEach(datum => {
        const {
            category_name,
            total_products,
            avg_retail_price,
            max_retail_price,
            min_retail_price

        } = datum;

        rows.push(
            <tr key={category_name} id={category_name}>
                <td>{category_name}</td>
                <td>{total_products}</td>
                <td>{avg_retail_price}</td>
                <td>{max_retail_price}</td>
                <td>{min_retail_price}</td>
            </tr>
        )
    });

    return rows;
}

