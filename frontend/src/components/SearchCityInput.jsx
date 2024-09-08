import {PlacePicker } from '@googlemaps/extended-component-library/react';
import { LoadScript } from "@react-google-maps/api";
import config from '../config';
import { useState } from 'react';

function SearchCityInput({setCitta, formData}){

    const [cittàPrint, setCittàPrint]  = useState('')
    const handleChangeCity = (e) =>{
        setCittàPrint(e.target.value?.formattedAddress ?? '')
        setCitta(e.target.value?.formattedAddress ?? '')
    }
    return(
        <>
        <LoadScript googleMapsApiKey={config.googleAPIkey} libraries={["places"]}></LoadScript>
        <PlacePicker id="cityInput"
        placeholder="Inserisci città"
        types={['(cities)']}
        onPlaceChange={(e) => handleChangeCity(e)}/>
            
        <div className="result">
            {cittàPrint}
        </div>
        </>
    )
}

export default SearchCityInput