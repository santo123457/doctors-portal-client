import React, { useState } from 'react';

const Dashboard = () => {
    let [count, setCount]=useState(0);
    let handleCount =()=>{
        setCount(count+1)
    }
    return (
        <div>
            {count}
            <br />
            <button onClick={handleCount} className='btn'>click me</button>
        </div>
    );
};

export default Dashboard;