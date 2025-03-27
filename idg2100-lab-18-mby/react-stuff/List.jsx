// import styles from "./styles"
import {useEffect, useState} from "react";
import styles from "./listModule.css";
import { set } from "mongoose";

export default function List(){
    //const items = ["Milk", "Butter", "Bread", "icecream"];
    const [isLoading, setIsLoading] = useState(true);
    const [items, setItems] = useState([]);
    const [errMsg, setErrMsg] = useState("");
    const URL = "http://localhost:8089/items";

    useEffect(() => {
        fetch(URL)
            .then(res => {
                if(!res.ok) throw new Error("couldn't load data from server"); 
                return res.json();
            })
            .then(dat=>{
                setItems(dat);
            })
            .catch(err=>setErrMsg(err.toString()))
            .finally(() =>setIsLoading(false));
    }, []);

    if(errMsg) {
        return (
            <p>Error message</p>
        )
    }

    if(isLoading) {
        return (
            <p className=""></p>
        )
    }

    return (
        <ul>
            {items.map((item, i)=> {
                return <li key={i} className={styles["list-item"]}>{item}</li>;
            })}
        </ul>
    )
}