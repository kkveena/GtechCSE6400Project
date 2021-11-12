import React from "react";
import Loader from "react-loader-spinner";

export function Report5() {

    const [data, setData] = React.useState([]);
    const [loading, setLoading] = React.useState(false);

    // Fetch data when the component gets rendered
    React.useEffect(() => {
        setLoading(true);
        fetch('http://localhost:8080/report5?subTask=0', {
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
            <h2>Outdoor furniture on Groundhog Day’s summary</h2>
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
            yr,
            yearly_total_quantity,
            average_yearly_quantity,
            groundhog_day_quantity
        } = datumFromDB;

        if (reducedDataAsObject[yr] === undefined) {
            reducedDataAsObject[yr] = {
                yr: yr,
                yearly_total_quantity: "",
                average_yearly_quantity: "",
                groundhog_day_quantity:""
            }
        }

        reducedDataAsObject[yr].yearly_total_quantity= yearly_total_quantity;
        reducedDataAsObject[yr].average_yearly_quantity = average_yearly_quantity;
        reducedDataAsObject[yr].groundhog_day_quantity = groundhog_day_quantity;
    });

    const reducedData = [];
    Object.keys(reducedDataAsObject).forEach(yr => {
        reducedData.push(reducedDataAsObject[yr]);
    });

    return reducedData;
}

function getRowContents(data) {
    const rows = [
        <tr key="header-1" id="header-1">
            <th>yr</th>
            <th>yearly_total_quantity</th>
            <th>average_yearly_quantity</th>
            <th>groundhog_day_quantity</th>
        </tr>
    ]
    data.forEach(datum => {
        const {
            yr,
            yearly_total_quantity,
            average_yearly_quantity,
            groundhog_day_quantity,
        } = datum;

        rows.push(
            <tr key={yr} id={yr}>
                <td>{yr}</td>
                <td>{yearly_total_quantity}</td>
                <td>{average_yearly_quantity}</td>
                <td>{groundhog_day_quantity}</td>
            </tr>
        )
    });
    return rows;
}

