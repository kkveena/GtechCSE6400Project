
import React from "react";
import Loader from "react-loader-spinner";

export function Report3() {

    const [data, setData] = React.useState([]);
    const [loading, setLoading] = React.useState(false);

    // Fetch data when the component gets rendered
    React.useEffect(() => {
        setLoading(true);
        fetch('http://localhost:8080/report3?subTask=1', {
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
            <h2>Report 3</h2>
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
            pID,
            product_name,
            retail_price,
            total_items,
            discount_items,
            total_revenue,
            predicted_revenue,
            diff_revenue
        } = datumFromDB;

        if (reducedDataAsObject[diff_revenue] === undefined) {
            reducedDataAsObject[diff_revenue] = {
                pID: "",
                product_name: "",
                retail_price: "",
                total_items: "",
                discount_items:"",
                total_revenue: "",
                predicted_revenue:"",
                diff_revenue:diff_revenue
            }
        }

        reducedDataAsObject[diff_revenue].product_name= product_name;
        reducedDataAsObject[diff_revenue].retail_price = retail_price;
        reducedDataAsObject[diff_revenue].total_items = total_items;
        reducedDataAsObject[diff_revenue].discount_items = discount_items;
        reducedDataAsObject[diff_revenue].total_revenue = total_revenue;
        reducedDataAsObject[diff_revenue].predicted_revenue = predicted_revenue;
        reducedDataAsObject[diff_revenue].diff_revenue =diff_revenue;
    });

    const reducedData = [];
    Object.keys(reducedDataAsObject).forEach(diff_revenue => {
        reducedData.push(reducedDataAsObject[diff_revenue]);
    });

    return reducedData;
}

function getRowContents(data) {
    const rows = [
        <tr key="header-1" id="header-1">
            <th>pID</th>
            <th>product_name</th>
            <th>retail_price</th>
            <th>total_items</th>
            <th>discount_items</th>
            <th>total_revenue</th>
            <th>predicted_revenue</th>
            <th>diff_revenue</th>
        </tr>
    ]
    data.forEach(datum => {
        const {
            pID,
            product_name,
            retail_price,
            total_items,
            discount_items,
            total_revenue,
            predicted_revenue,
            diff_revenue
        } = datum;

        rows.push(
            <tr key={diff_revenue} id={diff_revenue}>
                <td>{pID}</td>
                <td>{product_name}</td>
                <td>{retail_price}</td>
                <td>{total_items}</td>
                <td>{discount_items}</td>
                <td>{total_revenue}</td>
                <td>{predicted_revenue}</td>
                <td>{diff_revenue}</td>
            </tr>
        )
    });
    return rows;
}
