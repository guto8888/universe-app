'use client'

import { useState, useEffect, ReactElement } from "react"
import EditButton from "@/app/components/EditButton/editButton";
import LoadingSpinner from "@/app/components/Loading/loading";
import DeleteBtn from "@/app/components/DeleteButton/deleteBtn";
import CreateBtn from "@/app/components/CreateButton/createBtn";
import MainBtn from "@/app/components/MainMenuBtn/mainMenuBtn";
import { SortType, UniversalName, StarType } from "@/app/services/universeTypes";

import style from "./page.module.css"

export default function Menu() {
  const [uniList, setList] = useState<ReactElement[]>([])
  const [optionUni, setOption] = useState<ReactElement[]>([])
  const [loading, setLoading] = useState(false)
  
  const finalArr: ReactElement[] = [] 
  const uniArr: ReactElement[] = [] 
  const restBodiesName: UniversalName[] = [] 

  const findSolarSystem = async () => {
    const solarSystem = await fetch("http://localhost:3000/pages/api/solarSystem")
    const solarSystemJson = await solarSystem.json()
    solarSystemJson.sort((a:SortType, b: SortType) => {
        return Number(a.name.slice(7, 20)) - Number(b.name.slice(7, 20)) 
    }).map(({ id, name }: UniversalName ) => {
      restBodiesName.push({name, id})
      uniArr.push(
        <option key={id} value={id}>{name}</option>
      )
    })
    setOption(uniArr)
  }

  const findDatabase = async () => {
    setLoading(false)
    await findSolarSystem()
    const restBodies = await fetch("http://localhost:3000/pages/api/restCelestialBodies")
    const restBodiesJson = await restBodies.json()
    restBodiesJson.sort((a:SortType, b: SortType) => {
      return Number(a.name.slice(9, 20)) - Number(b.name.slice(9, 20)) 
    }).map(({ solarSystem_id, id, name, age, type }: StarType) => {
      let gaxName = ""
      restBodiesName.forEach(i => {
        if(solarSystem_id === i.id ) {
          gaxName = i.name
        }
      })
      finalArr.push(
        <div className={style.universeInfo}>
          <h1 className={`${id}`}>{name.toUpperCase()}</h1>
          <h3 className={`${id}`}> {age} anos</h3>
          <h3 className={`${id}`}> {gaxName}</h3>
          <h4 className={`${id}`}> {type}</h4>
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
        <h1>ADICIONE UM NOVO CORPO CELESTE:</h1>
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
            }}
            }/>
          <label className={style.formUniverseName} htmlFor="type">
            Tipo:
          </label>
          <input className={style.uniType} name="type" id="type" type="text" />
          <label htmlFor="solarId">Pertence ao sistema solar:</label>
          <select className={style.selectID} name="solarId" id="solarId">
            {optionUni}
          </select>
        </form>
        <CreateBtn props={{ findDatabase, 'url': 'http://localhost:3000/pages/api/restCelestialBodies'}} />
      </div>
    </div>
    <div className={style.divAll}>
      {uniList.map(uniData => {
        const dataId = uniData.props.children[0].props.className
        return (
          <div className={style.details} key={dataId}>
            {uniData}
            <div className={style.btns}>
              <DeleteBtn props={{'url': 'http://localhost:3000/pages/api/restCelestialBodies', findDatabase, 'uniData': dataId}} />
              <EditButton props={`/pages/restCelestialBodies/edit/${dataId}`}/>
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