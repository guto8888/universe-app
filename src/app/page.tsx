'use client'

import { useState, useEffect } from "react"
import Link from "next/link"
import LoadingSpinner from "./components/Loading/loading"

import style from "@/app/page.module.css"

interface TableType {
  table_name: string,
}

export default function Tables() {
  const [uniList, setList] = useState<React.ReactNode[]>([])  
  const [loaded, setLoaded] = useState<boolean>(false)

  const finalArr: React.ReactElement[] = []

  const findDatabase = async () => {
    setLoaded(false)
    const universe = await fetch("http://localhost:3000/pages/api/api_getTable")
    const universeJson = await universe.json()
    universeJson.map((table: TableType) => {
      let name
      switch(table.table_name) {
        case "universe":
          name = "Universe"
        break
        case "galaxy":
          name = "Galaxy"
        break
        case "solarSystem":
          name = "Solar System"
        break
        case "star":
          name = "Star"
        break
        case "planet":
          name = "Planet"
        break
        case "satellite":
          name = "Satellite"
        break
        case "remainingCelestialBodies":
          name = "Remaining Celestial Bodies"
        break
        case "blackHole":
          name = "Black Hole"
        break
        default:
          name = "Error"
      }

      if(table.table_name !== "SequelizeMeta" && table.table_name !== "_prisma_migrations") {
        finalArr.push(
          <Link href={`/pages/${table.table_name === "remainingCelestialBodies" ? "restCelestialBodies" : table.table_name}`} className={style.divItem} id={table.table_name} key={table.table_name}>
            <h1>
            {name}
          </h1>
          </Link>
          )
      }
        })
        function sortArr() {
          finalArr.sort((a, b) => {
            let idA
            let idB
            switch(a.key) {
              case "universe":
               idA = 1
              break
              case "galaxy":
               idA = 2
              break
              case "solarSystem":
               idA = 3
              break
              case "star":
               idA = 4
              break
              case "planet":
               idA = 5
              break
              case "satellite":
               idA = 6
              break
              case "remainingCelestialBodies":
               idA = 7
              break
              case "blackHole":
               idA = 8
              break
              default:
                return 10
            }
  
            switch(b.key) {
              case "universe":
                idB = 1
              break
              case "galaxy":
                idB = 2
              break
              case "solarSystem":
                idB = 3
              break
              case "star":
                idB = 4
              break
              case "planet":
                idB = 5
              break
              case "satellite":
                idB = 6
              break
              case "remainingCelestialBodies":
                idB = 7
              break
              case "blackHole":
                idB = 8
              break
              default:
                 return 10
            }
            return idA! - idB!
          })
  
        }
         sortArr()
        setList(finalArr)
        setLoaded(true)
  }

  useEffect(() => {
   findDatabase()
  }, [])

  return loaded ? (
    <>
    <div className={style.mainDiv}>
      <div className={style.titleDiv}>
    <h1 className={style.title}>Selecione onde deseja Adicionar ou Atualizar um item:</h1>
      </div>
    <div className={style.boxName}>
    {uniList}
    </div>
    </div>
</>
  ) : (
    <LoadingSpinner />
  )
}