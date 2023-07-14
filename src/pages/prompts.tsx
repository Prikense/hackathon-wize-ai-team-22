import React, { useState, useEffect, useRef } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/esm/Button';
import DropdownButton from 'react-bootstrap/esm/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import { getResponse } from '../api';


const Prompts=()=> {
    var refThing = useRef(false)
    //initial variables for setting the query up
    const [age,setAge]=useState<string | null>(null);
    const saveAge=(v: React.SetStateAction<string | null>)=>{
        setAge(v);
        console.log(age);
    }
    const [condition,setCond]=useState<string | null>(null);
    const saveCond=(v: React.SetStateAction<string | null>)=>{
        setCond(v);
        console.log(condition);
    }
    
    //query constructor
    const [query, setQuery]=useState<String>('');
    const queryCraft =()=>{
        console.log(age)
        console.log(condition)

//        setQuery("Generate a diagnostic with the following info, not as a final diagnostic but as support for a doctor, especify needing to be checked by profesional specialists: "+condition+", GDL, MEXICO, "+age+"years old. Take into account the disease, location and age. Do it as a medical report, give observations and recomendations for the patient, Mention that your name as AI is dIAgnostica, in Spanish")
        setQuery("Generate a text for explaining in in brief a "+age + " year old about how it feels like to have "+condition+" in spanish");
        console.log("crafting done")
        console.log(query)
        refThing.current = true
    };
    useEffect(() => {
        if(refThing.current){
            console.log(query)
            const callAPI = async ()=>{
                const APIesponse = await askOpenAi()
                setText(APIesponse);
                console.log(generatedTxt);
            }
            callAPI();
    }
    }, [query]);
    
    //variable to save the returned prompt into
    const [generatedTxt, setText]=useState<String>('');
    async function askOpenAi(): Promise<String> {
        return await getResponse(query);
    }
    //regex for cleanup of text
    var reg = /\\n\d?/g;
    return(
        <div>
            <div className='result'>
            {refThing.current && query.length>5 &&(
                <h3>
                    {generatedTxt.replace(reg," ")}
                </h3>)}
            </div>
            {generatedTxt.length <= 0 &&(
            <div className='stuff'>
                <h2>Datos del paciente</h2>
                <br></br>
                <DropdownButton id="conditions-dropdown" title="Condición" onSelect={saveCond}>
                    <Dropdown.Item eventKey="Type 2 Diabetes">Diabetes tipo 2</Dropdown.Item>
                    <Dropdown.Item eventKey="Parkinsons Disease">Parkinson</Dropdown.Item>
                    <Dropdown.Item eventKey="Astma">Asma</Dropdown.Item>
                    <Dropdown.Item eventKey="HIV">VIH</Dropdown.Item>
                </DropdownButton>
                <br></br>
                <DropdownButton id="age-dropdown" title="Edad" onSelect={saveAge}>
                    <Dropdown.Item eventKey="6">5-10</Dropdown.Item>
                    <Dropdown.Item eventKey="12">11-15</Dropdown.Item>
                    <Dropdown.Item eventKey="20">16-20</Dropdown.Item>
                    <Dropdown.Item eventKey="30 or more">21+</Dropdown.Item>
                </DropdownButton>
                <br></br>
                {condition !== null && age !== null &&(
                <Button className='button' id="sendBtn" variant='info' onClick={queryCraft} >Generar Interpretación</Button>
                )}
            </div>
            )}
        </div>




    );
};

export default Prompts;