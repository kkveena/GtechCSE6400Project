import React from "react";
import {Link} from "react-router-dom";
import Loader from "react-loader-spinner";

export function MainMenu() {

    // Use this when you are ready to make the request.
    const [user, setUser ]= React.useState({uid: "", typeOfUser: ""});
    const [loadingUser, setLoadingUser ] = React.useState(false);
    const [storeData, setStoreData] = React.useState(undefined);
    const [loadingStores, setLoadingStores ] = React.useState(false);
    const [manufacturerCount, setManufacturerCount] = React.useState(0);
    const [loadingManufacturers, setLoadingManufacturers ] = React.useState(false);
    const [productCount, setProductCount] = React.useState(0);
    const [loadingProducts, setLoadingProducts ] = React.useState(false);
    const [specialSavingCount, setSpecialSavingCount] = React.useState(0);
    const [loadingSavings, setLoadingSavings ] = React.useState(false);
    const [viewableStores, setViewableStores] = React.useState([]);
    const [loadingViewableStores, setLoadingViewableStores ] = React.useState(false);


    // Get user data when the component gets rendered
    React.useEffect(() => {
        setLoadingUser(true);
        fetch('http://localhost:8080/loggedInInfo', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
            },
        }).then (function (response) {return response.json()})
            .then(function (json) {
                // Make sure to set the shape of the data correctly before setting it
                // {
                //   uid: "storeNumber1",
                //   typeOfUser: "marketing"
                // }
                const properlyShapedData = reduceUserData(json);
                setUser(properlyShapedData);
                getViewableStores(properlyShapedData.uid, setViewableStores, setLoadingViewableStores);
                setLoadingUser(false);
            })
            .catch(function (error) {
                // set back to default value
                console.log(error);
                setUser({uid: "", typeOfUser: ""});
                setLoadingUser(false);
            });
    }, []);

    // Get number of Grand Showcase stores and regular stores
    React.useEffect(() => {
        setLoadingStores(true);
        fetch('http://localhost:8080/report8?subTask=1', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
            },
        }).then(function (response) {
            return response.json()
        }).then(function (json) {
            const properlyShapedData = reduceStoreData(json);
            setStoreData(properlyShapedData);
            setLoadingStores(false);
        }).catch(function (error) {
            // set back to default value
            console.log(error);
            setStoreData(undefined);
            setLoadingStores(false);
        });
    }, []);

    // Get number of manufacturers
    React.useEffect(() => {
        setLoadingManufacturers(true);
        fetch('http://localhost:8080/statistics?subTask=manufacturer', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
            },
        }).then(function (response) {
            return response.json()
        }).then(function (json) {
            const properlyShapedData = reduceCountData(json);
            setManufacturerCount(properlyShapedData);
            setLoadingManufacturers(false);
        }).catch(function (error) {
            // set back to default value
            console.log(error);
            setManufacturerCount(0);
            setLoadingManufacturers(false);
        });
    }, []);

    // Get number of products
    React.useEffect(() => {
        setLoadingProducts(true);
        fetch('http://localhost:8080/statistics?subTask=product', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
            },
        }).then(function (response) {
            return response.json()
        }).then(function (json) {
            const properlyShapedData = reduceCountData(json);
            setProductCount(properlyShapedData);
            setLoadingProducts(false);
        }).catch(function (error) {
            // set back to default value
            console.log(error);
            setProductCount(0);
            setLoadingProducts(false);
        });
    }, []);

    // Get number of special savings day
    React.useEffect(() => {
        setLoadingSavings(true);
        fetch('http://localhost:8080/statistics?subTask=special', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
            },
        }).then(function (response) {
            return response.json()
        }).then(function (json) {
            const properlyShapedData = reduceCountData(json);
            setSpecialSavingCount(properlyShapedData);
            setLoadingSavings(false);
        }).catch(function (error) {
            // set back to default value
            console.log(error);
            setSpecialSavingCount(0);
            setLoadingSavings(false);
        });
    }, []);

    // const mockedUser = {
    //     uId: "1234",
    //     typeOfUser: "marketing"
    // };

    // Make sure that you add a loading condition for every stat that requires a call to DB.
    const isLoadingMainMenu = loadingUser || loadingStores || loadingManufacturers || loadingProducts || loadingSavings || loadingViewableStores;
    return (
        <>
            <h1>Main Menu</h1>
            {getMainMenuContent(isLoadingMainMenu, user, storeData, manufacturerCount, productCount, specialSavingCount, viewableStores)}
        </>
    )
}

function getMainMenuContent(isLoading, userData, storeData, manufacturerCount, productCount, specialSavingCount, viewableStores){
    if(isLoading){
        return <Loader type="TailSpin" color="#00BFFF" height={80} width={80} timeout={3000} />
    }

    if(userData === undefined || storeData === undefined){
        return null;
    }

    return (
        <>
            <h2>Statistics</h2>
            {getStatistics(userData.typeOfUser, storeData, manufacturerCount, productCount, specialSavingCount, viewableStores)}
            <h2>Navigation</h2>
            <ul>
                {
                    userData.typeOfUser === "marketing" ?
                        <li>
                            <Link to="/editPop">Edit city/state population</Link>
                        </li>
                        :
                        null
                }
                <li>
                    <Link to="/report1">Report 1</Link>
                </li>
                <li>
                    <Link to="/report2">Report 2</Link>
                </li>
                <li>
                    <Link to="/report3">Report 3</Link>
                </li>
                <li>
                    <Link to="/report4">Report 4</Link>
                </li>
                <li>
                    <Link to="/report5">Report 5</Link>
                </li>
                <li>
                    <Link to="/report6">Report 6</Link>
                </li>
                <li>
                    <Link to="/report7">Report 7</Link>
                </li>
                <li>
                    <Link to="/report8">Report 8</Link>
                </li>
                <li>
                    <Link to="/report9">Report 9</Link>
                </li>
            </ul>
        </>
    )
}

function getStatistics(typeOfUser, storeData, manufacturerCount, productCount, specialSavingCount, viewableStores){
    const {grandStoreCount, storeCount} = storeData;
    return (
        <div>
            <span><b>Count of stores:</b>&nbsp;{storeCount}</span>
            &nbsp;
            <span><b>Count of Grand Showcase stores:</b>&nbsp;{grandStoreCount}</span>
            &nbsp;
            {
                typeOfUser === "store_manager" //should not be displayed for read-only or marketing users!
                    ? <span>
                        <b>Number of viewable stores:</b>
                        &nbsp;
                        <Link to={{
                            pathname:"/viewableStores",
                            state: {storeInfo: viewableStores}
                        }}>
                           {viewableStores.length}
                        </Link>
                      </span>
                    : null
            }
            &nbsp;
            <span><b>Count of manufactures:</b>&nbsp;{manufacturerCount}</span>
            &nbsp;
            <span><b>Count of products:</b>&nbsp;{productCount}</span>
            &nbsp;
            <span><b>Count of special savings day:</b>&nbsp;{specialSavingCount}</span>
        </div>
    )
}

function reduceStoreData(storeData) {
    if(storeData === undefined || storeData.length === 0) {
        return {grandStoreCount: 0, storeCount: 0};
    }

    const {SHOWCASE_STORE, REGULAR_STORE} = storeData[0];

    return {
        grandStoreCount: SHOWCASE_STORE === null ? 0 : SHOWCASE_STORE,
        storeCount: REGULAR_STORE === null ? 0: REGULAR_STORE
    };
}

function reduceCountData(data) {
    if(data.length > 0){
        const datum = data[0];
        const {COUNT} = datum;
        return COUNT;
    }
    return 0;
}

function reduceUserData(data) {
    const result = {uid: "", typeOfUser: ""};
    if(data.length > 0){
        const datum = data[0];
        const {uId, corpUID, marketingUID, storeMUID} = datum;
        result.uid = uId;

        if(corpUID) {
            result.typeOfUser = "corp";
        }

        if(marketingUID) {
            result.typeOfUser = "marketing";
        }

        if(storeMUID) {
            result.typeOfUser = "store_manager";
        }
    }
    return result;
}

function reduceViewableStoresData(data) {
    return data.map(datum => {
        const {store_number, phone_no, street_address, is_showcasestore} = datum;
        return {
            storeNumber: store_number,
            phoneNumber: phone_no,
            address: street_address,
            isGrandShowcaseStore: is_showcasestore.toString()
        };
    });
}

function getViewableStores(uId, setViewableStores, setLoadingViewableStores){
    fetch(`http://localhost:8080/statistics?subTask=viewableStores&uid=${uId}`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
        },
    }).then(function (response) {
        return response.json()
    }).then(function (json) {
        const properlyShapedData = reduceViewableStoresData(json);
        setViewableStores(properlyShapedData);
        setLoadingViewableStores(false);
    }).catch(function (error) {
        // set back to default value
        console.log(error);
        setViewableStores([]);
        setLoadingViewableStores(false);
    });
}