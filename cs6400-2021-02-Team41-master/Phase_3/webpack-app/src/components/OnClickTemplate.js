import React from "react";

function OnClickTemplate(props) {
    const [data, setData] = React.useState({});
    const [loading, setLoading] = React.useState(false);

    const getMoreData1 = React.useCallback(() => {
        setLoading(true);
        // Make sure to pass in city and state to the request
        fetch('data1', {
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

    const getMoreData2 = React.useCallback(() => {
        setLoading(true);
        // Make sure to pass in city and state to the request
        fetch('data2', {
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

    return (
        <div>
            <button
                type="button"
                onClick={getMoreData1}>
                Get new data 1
            </button>
            <button
                type="button"
                onClick={getMoreData2}>
                Get new data 2
            </button>
        </div>
    );
}