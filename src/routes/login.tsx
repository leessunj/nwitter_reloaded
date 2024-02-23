import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { auth } from "../firebase";
import { Link, useNavigate } from "react-router-dom";
import { FirebaseError } from "firebase/app";
import { Form, Input, Switcher, Title, Wrapper,Error } from "../components/auth-components";


export default function Login(){
    const navigate=useNavigate();
    const [isLoading, setIsLoading]=useState(false);
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const [error, setError]=useState("");

    const onChange=(e: React.ChangeEvent<HTMLInputElement>)=>{
        const { 
            target: { name , value},
        }=e;

        if(name==="email"){
            setEmail(value);
        } else if(name==="password"){
            setPassword(value);
        }

    }

    const onSubmit=async (e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        setError("");
        if(isLoading ||  email==="" || password==="") return;
        try{
            setIsLoading(true);
            const credentials=await signInWithEmailAndPassword(auth, email, password);
            console.log(credentials)
            
            navigate("/");
        }catch(e){
            console.log(e);
            if(e instanceof FirebaseError){
                setError(e.message)
            }
        } finally{
            setIsLoading(false);
        }
        console.log(name, email, password);
    }

    return <Wrapper>
        <Title>Login</Title>
        <Form onSubmit={onSubmit}>
            <Input onChange={onChange} name="email" placeholder="email" type="email" required/>
            <Input onChange={onChange} name="password" placeholder="password" type="password" required/>
            <Input type="submit" value={isLoading?"Loading...":"Login"} />
        </Form>
        <Switcher>
            보여줄 계정이 없으세요? <Link to="/create-account">계정 생성 &rarr;   </Link>
        </Switcher>
        {error!==""?<Error>{error}</Error>:null}
    </Wrapper>
}