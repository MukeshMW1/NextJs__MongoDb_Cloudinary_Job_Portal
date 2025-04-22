'use client'
import About from "@/components/About";
import Form from "@/components/Form";
import { useParams } from 'next/navigation';
const ApplyJob =() =>{
    const { id } = useParams();
    console.log(id);   
    return(
        <div>
            <About id={id}/>
            <Form id={id}/>
        </div>
    )
}

export default ApplyJob;