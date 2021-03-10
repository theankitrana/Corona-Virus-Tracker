/*
*
*
**** Author : Ankit Rana ****
*
*
*/

import React from 'react'
import './Table.css'
import numeral from "numeral";

// This Table Component Is Used To Display The Countries With It's Corresponding Number Of Cases
function Table({countries}) {
    return (
       <div className= "table">
            {countries.map(country =>(
             <tr>
                 <td>{country.country}</td>
                 <td><strong>{numeral(country.cases).format("0,0")}</strong></td>
             </tr>       
            ))}
        </div>
    )
}

export default Table
