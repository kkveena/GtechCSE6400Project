import React from "react";
import Loader from "react-loader-spinner";

export function Report9() {

    const [data, setData ]= React.useState([]);
    const [loading, setLoading ]= React.useState(false);
    const getMoreDataT = React.useCallback(() => {
        setLoading(true);
        // Make sure to pass in city and state to the request
        fetch('http://localhost:8080/report9?subTask=0', {
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
    const getMoreDataB = React.useCallback(() => {
        setLoading(true);
        // Make sure to pass in city and state to the request
        fetch('http://localhost:8080/report9?subTask=1', {
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
        fetch('http://localhost:8080/report9', {
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
          <h2>Grand Showcase Store Category Comparison</h2>
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
                        <b>(Sorted by difference in descending order, product ID in ascending order.)</b>
                        <br/>
                        <button onClick={getMoreDataT}>Show Top 5 Products</button>
                        <br/>
                        <button onClick={getMoreDataB}>Show Bottom 5 Products</button>
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
            productName,
            productID,
            allSales,
            showcaseStoresSales,
            excessSalesByWillmartStores
        } = datumFromDB;

        if(reducedDataAsObject[productName] === undefined) {
            reducedDataAsObject[productName] = {
                productName: productName,
                productID: productID,
                allSales: allSales,
                showcaseStoresSales: showcaseStoresSales,
                excessSalesByWillmartStores: excessSalesByWillmartStores,
            }
        }

    });

    const reducedData = [];
    Object.keys(reducedDataAsObject).forEach((productName) => {
        reducedData.push(reducedDataAsObject[productName]);
    });

    return reducedData;
}

function getRowContents(data){
    const rows = [
        <tr key="header-1" id="header-1">
            <th>Product-Name</th>
            <th>Product-ID</th>
            <th>Total-Sales</th>
            <th>Showcase-Stores-Sales</th>
            <th>Excess-Sales-By-Non-Showcase-Stores</th>
        </tr>
    ]
    data.forEach(datum => {
        const {
            productName,
            productID,
            allSales,
            showcaseStoresSales,
            excessSalesByWillmartStores,
        } = datum;

        rows.push(
            <tr key={productName} id={productName}>
                <td>{productName}</td>
                <td>{productID}</td>
                <td>{allSales}</td>
                <td>{showcaseStoresSales}</td>
                <td>{excessSalesByWillmartStores}</td>
            </tr>
        )
    });

    return rows;
}