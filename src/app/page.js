"use client"
import axios from "axios";
import { useEffect, useState } from "react";

const getData = async () => {
  try {
    const res = await axios.get("https://randomuser.me/api/?results=10")
    const { results } = res.data
    // console.log(results)
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
      //could you break this down 
      objectsKeysFlattened = [...objectsKeysFlattened, ...extractObjectKeys(value)]
    }
  });
  console.table(objectKeys)
  return objectsKeysFlattened;
}

export default function Home() {
  const [people, setPeople] = useState([])
  const [flattenedLocations, setFlattenedLocations] = useState({ 
    head: [], 
    data: [] 
  })

  const sortByColumn = (locationString) => {
    console.log(locationString)
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
      <table>
        <thead>
          <tr>
            {flattenedLocations && flattenedLocations.head.map(function (location, locationIdx) {
              return (
                <th
                  key={locationIdx}
                  onClick={() => {sortByColumn(location)}}
                >{location}
                </th>
              )
            })
            }
          </tr>
        </thead>
        <tbody>
          {
            flattenedLocations && flattenedLocations.data.map(function (location, locationIdx) {
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

