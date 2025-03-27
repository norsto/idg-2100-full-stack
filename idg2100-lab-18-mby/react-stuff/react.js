//Apparently you need a new project, in the folders and allat yk help
//npm init
//npm install react 
//npm install react-dom
//npm run dev

import react from "react";
import bodyParser from "body-parser";
import {readFile, writeFile} from "fs/promises";

const ShoppingList = async() => {
    const allItemsAsText = await readFile("./data.txt", "utf8");

    return ( 
        <div>
            <h1>Shopping List</h1>
            <ul>
                {items.map((item, index) => (
                    <li key={index}>    
                        {item}
                    </li>
                ))}
            </ul>
        </div>
    );
}

/* import { StrictMode, useState } from "react"; */

