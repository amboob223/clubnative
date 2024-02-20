import react, {useState,useEffect} from "react";
import {Button, View, Text, ScrollView,Alert} from "react-native";

export default function Table(){

    const [tableData,setTableData] = useState([])

    const handleTable = async() =>{
        try {
            const response = await fetch("http://192.168.1.81:3000/promo/text")

            if(!response.ok){
                Alert.alert("error", "this is how you do it ")
                console.error(response.status,response.statusText)
            }

            const text = await response.text() // returns a parsed object 

            const parsedResponse = JSON.parse(text)

            setTableData(
                parsedResponse.rows
            )
        } catch (error) {
            console.error(error)
            Alert.alert("fail","this ain it either")
        }
    }
    return(
        <ScrollView>
            
        </ScrollView>
    )
}