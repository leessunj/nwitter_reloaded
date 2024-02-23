import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import React, { useState } from "react";
import { auth } from "../firebase";
import { Link, useNavigate } from "react-router-dom";
import { FirebaseError } from "firebase/app";
import { Form, Input, Switcher, Title, Wrapper,Error } from "../components/auth-components";



export default function CreateAccount(){
    const navigate=useNavigate();
    const [isLoading, setIsLoading]=useState(false);
    const [name, setName]=useState("");
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const [error, setError]=useState("");

    const onChange=(e: React.ChangeEvent<HTMLInputElement>)=>{
        const { 
            target: { name , value},
        }=e;

        if(name==="name"){
            setName(value);
        } else if(name==="email"){
            setEmail(value);
        } else if(name==="password"){
            setPassword(value);
        }

    }

    const onSubmit=async (e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        setError("");
        if(isLoading ||  name==="" || email==="" || password==="") return;
        try{
            setIsLoading(true);
            const credentials=await createUserWithEmailAndPassword(auth, email, password);
            console.log(credentials)
            await updateProfile(credentials.user,{
                displayName: name,
            });
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
        <Title>Join</Title>
        <Form onSubmit={onSubmit}>
            <Input onChange={onChange} name="name" placeholder="name" type="text" required/>
            <Input onChange={onChange} name="email" placeholder="email" type="email" required/>
            <Input onChange={onChange} name="password" placeholder="password" type="password" required/>
            <Input type="submit" value={isLoading?"Loading...":"SUBMIT"} />
        </Form>
        <Switcher>
            이미 계정이 있으세요? <Link to="/login">로그인 &rarr; </Link>
        </Switcher>
        {error!==""?<Error>{error}</Error>:null}
    </Wrapper>
}