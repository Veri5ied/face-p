
import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';


const ActivityIndicator = () => {
    return (
        <div>
            <div className='h-screen w-full absolute top-0 left-0 z-50 bg-violet-400 justify-center items-center'>
                <CircularProgress color='secondary' />
            </div>
        </div>
    );
}

export default ActivityIndicator;
