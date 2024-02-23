import { addDoc, collection } from "firebase/firestore";
import React, { useState } from "react";
import styled from "styled-components";
import { auth, db } from "../firebase";

const Wrapper = styled.div``;

const Form = styled.form``;
const TextArea = styled.textarea``;
const AttachFileButton = styled.label``;
const AttachFileInput = styled.input`
  display: none;
`;
const SubmitButton = styled.input``;

export default function PostTweetForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [tweet, setTweet] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTweet(e.target.value);
  };

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target ;
    if (files && (files.length === 1)) {
      setFile(files[0]);
    }
  };

  const onSubmit=async (e: React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault();
    const user=auth.currentUser;
    if(isLoading || tweet==="" || tweet.length>180) return;
    try{
        setIsLoading(true);
        await addDoc(collection(db, "tweets"),{
            tweet,
            createdAt: Date.now(),
            username: user?.displayName || "Annonymous",
            userId: user?.uid
        })
    } catch(e){
        console.log(e)
    }
        finally{
            setIsLoading(false);
        }
    }
  
  return (
    <Wrapper>
      <Form onSubmit={onSubmit}>
        <TextArea rows={5} placeholder="What's happening?" onChange={onChange} value={tweet}/>
        <AttachFileButton htmlFor="file"> {file?"Photo added":"Add Photo"}</AttachFileButton>
        <AttachFileInput type="file" id="file" accept="image/*" onChange={onFileChange}/>
        <SubmitButton type="submit" value={isLoading?"Loading...":"Post Tweet"} />
      </Form>
    </Wrapper>
  );
}
