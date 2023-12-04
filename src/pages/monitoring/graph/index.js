import ItemLineChart from "components/ItemLineChart";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import itemService from "services/itemService";
import JSAlert from "js-alert";

function ItemGraph() {
    const queryString = new URLSearchParams(useLocation().search);
    const [itemid, setItemid] = useState(() => {
        return queryString.get("itemid");
    });
    const [item, setItem] = useState();
    useEffect(() => {
        const func = async () => {
            const response = await itemService.getItem(itemid)
            console.log(response)
            if(response.error)
            {
                JSAlert.alert("Error", response.error.data)
                return
            }
            setItem(response.result[0])
        }
        func()
    }, [itemid])
    return ( 
        <>
            {item && <ItemLineChart item={item}/> }
        </>
     );
}

export default ItemGraph;