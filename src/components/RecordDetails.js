import React from "react";
import RecordItem from "./RecordItem";

const recordFields = [
  {
    name: "Total Cases",
    key: "total_cases",
  },
  {
    name: "Total Recovered Cases",
    key: "total_recovered",
    valueClass: "green"
  },
  {
    name: "New Cases Today",
    key: "total_new_cases_today",
    valueClass: "red"
  },
  {
    name: "New Deaths Today",
    key: "total_new_deaths_today",
    valueClass: "red"
  },
  {
    name: "Active Cases",
    key: "total_active_cases",
    valueClass: "red"
  },
  {
    name: "Total Deaths",
    key: "total_deaths",
    valueClass: "red"
  }
]

const RecordDetails = ({ record }) => {
  return recordFields.map(
    (field, index) => (
      <RecordItem
        key={index}
        label={field.name}
        value={record[field.key]}
        valueClass={field.valueClass}
      />
    )
  )
}

export default RecordDetails
