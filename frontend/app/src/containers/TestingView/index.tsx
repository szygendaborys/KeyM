import React from 'react';
import Wrapper from '../../components/Wrapper';
import SearchInput from '../LandingPage/SearchInput';

export const TestingView:React.FunctionComponent = () => {
    return (
        <Wrapper height="100%" width="100%">
            <SearchInput />
        </Wrapper>
    )
}

export default TestingView;