import React from 'react';
import Head from 'next/head';
import PropTypes from 'prop-types';
import 'antd/dist/antd.css';

import styled from 'styled-components';

import {wrapper} from "./../store";

const Container = styled.div`
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;

    // min-height: 100%;

    background-color: gray;

`;

const App = ({Component}) => {

    
    return (
        <>
            <Head>
                <title>
                    Get To Know
                </title>
            </Head>
            <style jsx global>{
            `
                body {
                    background: gray;
                }
            `
            }
            </style>
            
            <Component/>
        </>
    );
};

App.protoTypes ={
    Component: PropTypes.elementType.isRequired,
};

export default wrapper.withRedux(App);
// export default App;