import React from "react";
import Loader from "react-loader-spinner";

export function Report8() {

    const [data, setData ]= React.useState([]);
    const [loading, setLoading ]= React.useState(false);

    // Fetch data when the component gets rendered
    React.useEffect(() => {
        setLoading(true);
        fetch('http://localhost:8080/report8?subTask=0', {
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

    // When ready with real data pass in `data` instead of `mockedData`
    // const mockedData = reduceData([{
    //     YEAR: "2021",
    //     IS_SHOWCASE_STORE: "false",
    //     MIN_SALES: "30",
    //     MAX_SALES: "80",
    //     AVG_SALES: "55",
    //     SUM_OF_SALES: "110"
    // },
    // {
    //     YEAR: "2021",
    //     IS_SHOWCASE_STORE: "true",
    //     MIN_SALES: "4",
    //     MAX_SALES: "30",
    //     AVG_SALES: "21.333333",
    //     SUM_OF_SALES: "64"
    // },
    // {
    //     YEAR: "2022",
    //     IS_SHOWCASE_STORE: "false",
    //     MIN_SALES: "15",
    //     MAX_SALES: "15",
    //     AVG_SALES: "15",
    //     SUM_OF_SALES: "30"
    // },
    // {
    //     YEAR: "2022",
    //     IS_SHOWCASE_STORE: "true",
    //     MIN_SALES: "15",
    //     MAX_SALES: "30",
    //     AVG_SALES: "20",
    //     SUM_OF_SALES: "60"
    // },
    // {
    //     YEAR: "2023",
    //     IS_SHOWCASE_STORE: "false",
    //     MIN_SALES: "24",
    //     MAX_SALES: "28",
    //     AVG_SALES: "26",
    //     SUM_OF_SALES: "52"
    // },
    // {
    //     YEAR: "2023",
    //     IS_SHOWCASE_STORE: "true",
    //     MIN_SALES: "28",
    //     MAX_SALES: "28",
    //     AVG_SALES: "28",
    //     SUM_OF_SALES: "84"
    // }]);
    return (
        <div>
            <h2>Report 8</h2>
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
//{
//  2021: {
//   year:
//   minGrand:
//   avgGrand:
//   maxGrand:
//   totalGrand:
//   minStore:
//   avgStore:
//   maxStore:
//   totalStore:
//  }
//  ...
//}
    const reducedDataAsObject = {};
    dataFromDB.forEach(datumFromDB => {
        const {
            YEAR,
            IS_SHOWCASE_STORE,
            MIN_SALES,
            MAX_SALES,
            AVG_SALES,
            SUM_OF_SALES
        } = datumFromDB;

        if(reducedDataAsObject[YEAR] === undefined) {
            reducedDataAsObject[YEAR] = {
                year: YEAR,
                minGrand: "",
                avgGrand: "",
                maxGrand: "",
                totalGrand: "",
                minStore: "",
                avgStore: "",
                maxStore: "",
                totalStore: ""
            }
        }

        if(IS_SHOWCASE_STORE === true){
            reducedDataAsObject[YEAR].minGrand = MIN_SALES;
            reducedDataAsObject[YEAR].avgGrand = AVG_SALES;
            reducedDataAsObject[YEAR].maxGrand = MAX_SALES;
            reducedDataAsObject[YEAR].totalGrand = SUM_OF_SALES;
        } else {
            reducedDataAsObject[YEAR].minStore = MIN_SALES;
            reducedDataAsObject[YEAR].avgStore = AVG_SALES;
            reducedDataAsObject[YEAR].maxStore = MAX_SALES;
            reducedDataAsObject[YEAR].totalStore = SUM_OF_SALES;
        }
    });

    const reducedData = [];
    Object.keys(reducedDataAsObject).forEach(year => {
        reducedData.push(reducedDataAsObject[year]);
    });

    return reducedData;
}

function getRowContents(data){
    const rows = [
        <tr key="header-1" id="header-1">
            <th>Year</th>
            <th>Min-Revenue-GrandStore</th>
            <th>Avg-Revenue-GrandStore</th>
            <th>Max-Revenue-GrandStore</th>
            <th>Total-Revenue-GrandStore</th>
            <th>Min-Revenue-Store</th>
            <th>Avg-Revenue-Store</th>
            <th>Max-Revenue-Store</th>
            <th>Total-Revenue-Store</th>
        </tr>
    ]
    data.forEach(datum => {
        const {
            year,
            minGrand,
            avgGrand,
            maxGrand,
            totalGrand,
            minStore,
            avgStore,
            maxStore,
            totalStore
        } = datum;

        rows.push(
            <tr key={year} id={year}>
                <td>{year}</td>
                <td>{minGrand}</td>
                <td>{avgGrand}</td>
                <td>{maxGrand}</td>
                <td>{totalGrand}</td>
                <td>{minStore}</td>
                <td>{avgStore}</td>
                <td>{maxStore}</td>
                <td>{totalStore}</td>
            </tr>
        )
    });

    return rows;
}