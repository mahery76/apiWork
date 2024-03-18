"use client"
import axios from "axios";
import { useEffect, useState } from "react";
const getData = async () => {
  try {
    const dataLocations = await axios.get("http://localhost:3000/api/randomUser")
    const { results } = dataLocations.data
    console.log(results)
    return results
  } catch (err) {
    console.log(err)
  }
}

const flattenLocations = (locations) => {
  const location = locations[0]
  let flattenedLocationsHead = extractObjectKeys(location)
  console.table(flattenedLocationsHead)

  let data = []

  for (const { street, coordinates, timezone, ...rest } of locations) {
    data.push({
      ...rest,
      number: street.number,
      name: street.name,
      latitude: coordinates.latitude,
      longitude: coordinates.longitude,
      offset: timezone.offset,
      description: timezone.description
    })
  }
  return { head: flattenedLocationsHead, data }
}

const extractObjectKeys = (object) => {
  // let objectsKeysFlattened = ["name", "mail", "street", "region"]
  let objectsKeysFlattened = []
  let objectKeys = Object.keys(object)
    objectKeys.forEach(key => {
    const value = object[key]
    if (typeof (value) !== "object") {
      objectsKeysFlattened.push(key)
    }
    else {
      objectsKeysFlattened = [...objectsKeysFlattened, ...extractObjectKeys(value)]
    }
  });
  console.table(objectKeys)
  return objectsKeysFlattened;
}
const getFilteredRows = (data, searchTerm) => {
return data.filter(function (row){
  return JSON.stringify(row).toLowerCase().includes(searchTerm)
})
} 

export default function Home() {
  const [people, setPeople] = useState([])
  const [flattenedLocations, setFlattenedLocations] = useState({ 
    head: [], 
    data: [] 
  })
  const [searchTerm, setSearchTerm] = useState('')
  
  const sortByColumn = (locationItem) => {
    const newFlattenedLocation = {
      head: [...flattenedLocations.head],
      data: [...flattenedLocations.data]
    }
    newFlattenedLocation.data.sort(function(a, b ){
      if(a[locationItem] < b[locationItem]){
        return -1
      }
      else if (a[locationItem] > b[locationItem]){
        return 1
      }
      else{
        return 0
      }
    } 
    )
    setFlattenedLocations(newFlattenedLocation)
    console.log(locationItem)
  }

  useEffect(() => {
    getData().then(data => {
      setPeople(data)
      let dataLocations = data.map(function (item) {
        return item.location
      })
      setFlattenedLocations(flattenLocations(dataLocations))
    })
  }, [])
  return (
    <main>
    <input value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}/>
      <table>
        <thead>
          <tr>
            {flattenedLocations && flattenedLocations.head.map(function (locationItem, locationIdx) {
              return (
                <th
                  key={locationIdx}
                  onClick={() => {sortByColumn(locationItem)}}
                >{locationItem}
                </th>
              )
            })
            }
          </tr>
        </thead>
        <tbody>
          {
            flattenedLocations && getFilteredRows(flattenedLocations.data, searchTerm).map(function (location, locationIdx) {
              return (
                <tr key={locationIdx}>
                  {flattenedLocations.head.map(function (headItem, headItemIdx) {
                    return <td key={headItemIdx}>{location[headItem]}</td>
                  })}
                </tr>
              )
            })
          }
        </tbody>
      </table>
    </main>
  );
}

