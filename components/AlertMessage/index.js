import React, {useEffect, useState, useCallback} from 'react';
import styled from 'styled-components';
import {Alert} from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import {
    ALERT_SUCCESS,
    ALERT_INFO,
    ALERT_WARNING,
    ALERT_ERROR,
    ALERT_SHIFT
} from "store/modules/alertState"


const Wrapper = styled.div`
    position: fixed;
    top: 5vw;
    z-index: 3;

    display: flex;
    flex-direction: column;
    width: 100vw;
    align-items: center;

    gap: 3vh;
`;

const AlertMessage = () => {

    //state
    const [alertList, setAlertList] = useState([]);
    const [alertKey, setAlertKey] = useState(0);

    //redux
    const alertState = useSelector(({alertState}) => alertState);

    const alertRenderList = [];

    useEffect( () => {
        if(alertState.alertSuccess !== null){
            setAlertList(prev => [
                ...prev,
                {
                    id: alertKey,
                    message: alertState.alertSuccess
                }
            ]);
            setAlertKey(alertKey+1);
        }

    },[alertState.alertSuccess]);

    useEffect( () => {


    },[alertState.alertInfo]);

    useEffect( () => {


    },[alertState.alertWarning]);

    useEffect( () => {
        console.log("ERROR");

        if(alertState.alertError !== null){

            setAlertList(prev => [
                ...prev,
                {
                    id: alertKey,
                    message: alertState.alertError
                }
            ]);
            setAlertKey(alertKey+1);
        }
    },[alertState.alertError]);

    //delete closed element data from state
    const closeAlertHandler = useCallback( (id) => {
        setAlertList(alertList.filter((item) => item.id !== id));
    });


    console.log(alertList);

    return (
        <>
            <Wrapper>
                {
                    alertList.map((item, i) => {
                        return(
                            <AlertAlert alertInfo={item.message} key={item.id} onClose={ () => closeAlertHandler(item.id)} />
                        );
                    })
                }
            </Wrapper>
        </>
    );
};

export default AlertMessage;


const AlertAlert = ({alertInfo,onClose}) => {

    switch (alertInfo.type){
        case ALERT_SUCCESS: {
            return (<SuccessAlert message={alertInfo.message} onClose={onClose}/>);
        }
        case ALERT_INFO:{
            return(<InfoAlert message={alertInfo.message} onClose={onClose}/>);
        }
        case ALERT_WARNING: {
            return(<WarningAlert message={alertInfo.message} onClose={onClose}/>);
        }
        case ALERT_ERROR:{
            return(<ErrorAlert message={alertInfo.message} onClose={onClose}/>);
        }
    }   

    return(
        <>

        </>
    );
};






const SuccessAlert = ({message, onClose}) => {

    return(
        <Alert
            message="Success Tips"
            description={message}
            type="success"
            showIcon
            closable
            style={{width: "80%"}}
            onClose={onClose}
        />

    );
}



const InfoAlert = ({message,onClose}) => {

    return(
        <Alert
            message="Informational Notes"
            description={message}
            type="info"
            showIcon
            closable
            style={{width: "80%"}}
            onClose={onClose}
        />

    );
};


const WarningAlert = ({message, onClose}) => {

    return(
        <Alert
            message="Warning"
            description={message}
            type="warning"
            showIcon
            closable
            style={{width: "80%"}}
            onClose={onClose}
        />
    );
};


const ErrorAlert = ({message , onClose}) => {

    return(
        <Alert
            message="Error"
            description={message}
            type="error"
            showIcon
            closable
            style={{width: "80%"}}
            onClose={onClose}
        />
    );
};