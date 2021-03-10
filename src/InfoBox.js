/*
*
*
**** Author : Ankit Rana ****
*
*
*/

// rfce -> React Functional Component With Export
import { Card, CardContent, Typography } from '@material-ui/core'
import React from 'react'
import "./InfoBox.css"

// CardContent : Clean White Background For Our Card
// Typography : Fancy Way To Write Something 
// InfoBox Props : Title , Number of Cases, Total Number Of Cases
function InfoBox({title, cases, total,active,isRed, ...props}) {
    return (
        <Card
        /* This whenever is clicked it sets the className to be infoBox--selected && if it's IsRed then infoBox--red */
        onClick = {props.onClick} className={`infoBox ${active && "infoBox--selected"} ${
        isRed && "infoBox--red"
      }`}>
            <CardContent>
                {/* Title i.e. Corona Virus Cases */}
                <Typography className="infoBox__title" color="textSecondary">
                    {title}
                </Typography>
                {/* 120K+ Number of Cases */}
                <h2 className={`infoBox__cases ${!isRed && "infoBox__cases--green"}`}> {cases}</h2>
                {/* 1.2M Total Cases */}
                <Typography className="infoBox__total" color="textSecondary">
                    {total} Total
                </Typography>
            </CardContent>
            
        </Card>
    )
}

export default InfoBox
