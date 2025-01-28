import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';

const Materials = () => {

    const {data:materials} = useQuery({
        queryKey:["materials"],
        queryFn:async()=>{
            const result = await axios.get("https://eduquest-server-side.vercel.app/materials")
            return result.data
        }
    })
    console.log(materials);



    return (
        <div>
            
        </div>
    );
};

export default Materials;