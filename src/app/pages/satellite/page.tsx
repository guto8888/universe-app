'use client'

import { useState, useEffect, ReactElement } from "react"
import EditButton from "@/app/components/EditButton/editButton";
import LoadingSpinner from "@/app/components/Loading/loading";
import DeleteBtn from "@/app/components/DeleteButton/deleteBtn";
import CreateBtn from "@/app/components/CreateButton/createBtn";
import MainBtn from "@/app/components/MainMenuBtn/mainMenuBtn";
import { UniversalName, SortType, SatType } from "@/app/services/universeTypes";

import style from "./page.module.css"

export default function Menu() {
  const [loading, setLoading] = useState(false)
  const [uniList, setList] = useState<ReactElement[]>([])
  const [optionUni, setOption] = useState<ReactElement[]>([])
  
  const finalArr: ReactElement[] = [] 
  const uniArr: ReactElement[] = [] 
  const planetName: UniversalName[] = [] 
  
  const findPlanet = async () => {
    const planet = await fetch("http://localhost:3000/pages/api/planet")
    const planetJson = await planet.json()
    planetJson.sort((a: SortType, b: SortType) => {
      return Number(a.name.slice(9, 20)) - Number(b.name.slice(9, 20)) 
    }).map(({ name, id }: UniversalName) => {
      planetName.push({name, id})
      uniArr.push(
        <option key={id} value={id}>{name}</option>
      )
    })
    setOption(uniArr)
  }

  const findDatabase = async () => {
    setLoading(false)
    await findPlanet()
    const satellite = await fetch("http://localhost:3000/pages/api/satellite")
    const satelliteJson = await satellite.json()
    satelliteJson.sort((a:SortType, b: SortType) => {
      return Number(a.name.slice(8, 20)) - Number(b.name.slice(8, 20)) 
    }).map(({ planet_id, id, name, age }: SatType) => {
      let gaxName = ""
      planetName.forEach(i => {
        if(planet_id === i.id) {
          gaxName = i.name
        }
      })
    finalArr.push(
        <div className={style.universeInfo}>
          <h1 className={`${id}`}>{name.toUpperCase()}</h1>
          <h3 className={`${id}`}> {age} anos</h3>
          <h3 className={`${id}`}> {gaxName}</h3>
        </div>
      )
    })
    setList(finalArr)     
    setLoading(true)
  }
  
  useEffect(() => {
   findDatabase()
  }, [])

  return loading ? (
    <>
    <div className={style.header}>
      <div className={style.title}>
      <h1>ADICIONE UM NOVO SATÉLITE:</h1>
      <MainBtn />
      </div>
      <div className={style.formUniverse} >
        <form className={style.form} onSubmit={e => e.preventDefault()}>
          <label className={style.formUniverseName} htmlFor="name">
            Nome:
          </label>
          <input className={style.uniName} name="name" id="name" type="text" />
          <label className={style.formUniverseAge}  htmlFor="age">
            Idade:
          </label>
          <input className={style.uniAge} name="age" id="age" type="number" min={1} max={2147483647} onChange={e => {
            if(Number(e.currentTarget.value) > 2147483647) {
            alert("o valor máximo é 2147483647")
            }
            }
          } />
          <label htmlFor="planetId">
            Pertence ao planeta:</label>
          <select className={style.selectID} name="planetId" id="planetId">
            {optionUni}
          </select>
        </form>
        <CreateBtn props={{ findDatabase, "url": 'http://localhost:3000/pages/api/satellite'}} />
      </div>
    </div>
    <div className={style.divAll}>
      {uniList.map(uniData => {
        const dataId = uniData.props.children[0].props.className
        return (
          <div className={style.details} key={dataId}>
            {uniData}
            <div className={style.btns}>
              <DeleteBtn props={{'uniData': dataId, findDatabase, 'url': 'http://localhost:3000/pages/api/satellite'}} />
              <EditButton props={`/pages/satellite/edit/${dataId}`}/>
            </div>
          </div>
        )
    })}
  </div>
  </>
  ) : (
    <LoadingSpinner />
  )
  }