import React, { useEffect, useState } from 'react';
import Example from './Example';
import styled from 'styled-components';
import useHost from '../../contexts/host';

const TestApiButton = styled.button`
    width:400px;
    height:50px;
    background-color:whitesmoke;
    color:black;
    &:hover {
        cursor:pointer;
    }
`;

export const LandingPage = () => {
    const { hostApi } = useHost();

    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(undefined);

    useEffect(() => {
        const api = `${hostApi}/home`;
        fetch(`${api}`).then(res => {
            console.log("An example of fetching data while component did mount.")
            console.log(res);
            return res.json();
        }).then(data => {
            setIsLoading(false);
            console.log(data);
        })
        .catch(err => {
            console.log(err);
            setError(err);
        });
    }, [])

    const testApi = () => {
        const api = `${hostApi}/home`;
        fetch(`${api}`).then(res => {
            console.log("An example of fetching data on click.")
            console.log(res);
            return res.json();
        }).then(data => {
            setIsLoading(false);
            console.log(data);
        })
        .catch(err => {
            console.log(err);
            setError(err);
        });    }

    if(error) {
        return (
            <Example>
                ERROR :(
            </Example>
        )
    }
    
    if(isLoading) {
        return (
            <Example>
                LOADING...
            </Example>
        )
    }

    return (
        <Example>
            <TestApiButton onClick={() => testApi()}>
                Click me to test API. (Check console)
            </TestApiButton>
        </Example>
    )
}

export default LandingPage;