import React, { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/esm/Button';
import DropdownButton from 'react-bootstrap/esm/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import { getResponse } from '../api';
import { text } from 'stream/consumers';
import { stringify } from 'querystring';


const Prompts=()=> {
    //initial variables for setting the query up
    const [age,setAge]=useState<string | null>(null);
    const saveAge=(v: React.SetStateAction<string | null>)=>{
        setAge(v);
        console.log(age);
    }
    const [condition,setCond]=useState<string | number>();
    const saveCond=(v: React.SetStateAction<string | number | undefined>)=>{
        setCond(v);
        console.log(condition);
    }
    //variable to save the returned prompt into
    const [generatedTxt, setText]=useState<String>('');
    async function askOpenAi(): Promise<String> {
        return await getResponse(query);
    }
    
    //query constructor
    const [query, setQuery]=useState('');
    async function queryCraft(){
        console.log(age)
        console.log(condition)
        setQuery("Generate a text for explaining in 2 minutes or less a "+age + " year old about "+condition);
        console.log("crafting done")
        console.log(query)
        setText(await askOpenAi())
        console.log(generatedTxt)
    };


    useEffect(() => {
        
    });
    var reg = /\\n\d?/g;
    return(
        <div>
            <div className='result'>
                <h1>
                    {generatedTxt.replace(reg," ")}
                </h1>
            </div>
            {generatedTxt.length <= 0 ||true &&(
            <div className='stuff'>
                <h2>Coso</h2>
                <DropdownButton id="age-dropdown" title="Edad" onSelect={saveAge}>
                    <Dropdown.Item eventKey="6">5-10</Dropdown.Item>
                    <Dropdown.Item eventKey="12">11-15</Dropdown.Item>
                    <Dropdown.Item eventKey="20">16-20</Dropdown.Item>
                    <Dropdown.Item eventKey="30 or more">21+</Dropdown.Item>
                </DropdownButton>
                <Form className='mb-3'>
                    <Form.Group controlId='conditionQuery'>
                        <Form.Label></Form.Label>
                        <Form.Control type = "query" placeholder='Condición' value ={condition} onChange={(event) => saveCond(event?.target.value)}/>
                    </Form.Group>
                </Form>
                {condition != '' && condition != undefined && age != undefined &&(
                <Button id="sendBtn" variant='danger' onClick={queryCraft} >Lets GOOOO</Button>
                )}
            </div>
            )}
        </div>
    );
};

export default Prompts;