import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Wrapper from '../../components/Wrapper';
import Example from './Example';
import SearchInput from './SearchInput';

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
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(undefined);

    useEffect(() => {
        const api = `/api/home`;
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
        <Wrapper height="100%" width="100%">
            <SearchInput />
        </Wrapper>
    )
}

export default LandingPage;