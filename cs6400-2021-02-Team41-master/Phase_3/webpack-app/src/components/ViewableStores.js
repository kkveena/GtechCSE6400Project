import React from "react";

export function ViewableStores(props) {

    // When ready with real data pass in `data` instead of `mockedData`
    const mockedData = [{
       storeNumber: "storeNumber1",
       address: "address1",
       phoneNumber: "phoneNumber1",
       isGrandShowcaseStore: "true"
     },
    {
        storeNumber: "storeNumber2",
        address: "address2",
        phoneNumber: "phoneNumber2",
        isGrandShowcaseStore: "false"
    }];
    return (
        <div>
            <h2>Viewable stores</h2>
                <table id="customtable">
                    <tbody>
                        {getRowContents(props.location.state.storeInfo)}
                    </tbody>
                </table>
        </div>
    );
}

function getRowContents(data){
    const rows = [
        <tr key="header-1" id="header-1">
            <th>Store number</th>
            <th>Street address</th>
            <th>Phone number</th>
            <th>Is Grand Showcase store</th>
        </tr>
    ]
    data.forEach(datum => {
        const {storeNumber, address, phoneNumber, isGrandShowcaseStore} = datum;
        rows.push(
            <tr key={storeNumber} id={storeNumber}>
                <td>{storeNumber}</td>
                <td>{address}</td>
                <td>{phoneNumber}</td>
                <td>{isGrandShowcaseStore}</td>
            </tr>
        )
    });

    return rows;
}