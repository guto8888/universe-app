'use client'

import { useState, useEffect, ReactElement } from "react"
import EditButton from "@/app/components/EditButton/editButton";
import LoadingSpinner from "@/app/components/Loading/loading";
import DeleteBtn from "@/app/components/DeleteButton/deleteBtn";
import CreateBtn from "@/app/components/CreateButton/createBtn";
import MainBtn from "@/app/components/MainMenuBtn/mainMenuBtn";
import { SortType, StarType, UniversalName } from "@/app/services/universeTypes";

import style from "./page.module.css"

export default function Menu() {
  const [uniList, setList] = useState<ReactElement[]>([])
  const [optionUni, setOption] = useState<ReactElement[]>([])
  const [loading, setLoading] = useState<boolean>(false)

  const finalArr: ReactElement[] = [] 
  const uniArr: ReactElement[] = [] 
  const solarSystemName: UniversalName[] = [] 

  const findSolarSystem = async () => {
    const solarSystem = await fetch("https://universe-app-iota.vercel.app/pages/api/solarSystem")
    const solarSystemJson = await solarSystem.json()
    solarSystemJson.sort((a: SortType, b: SortType) => {
        return Number(a.name.slice(7, 20)) - Number(b.name.slice(7, 20)) 
    }).map(({name, id}: UniversalName) => {
        solarSystemName.push({"name": name, "id": id})
        uniArr.push(
        <option key={id} value={id}>{name}</option>
      )
    })
    setOption(uniArr)
  }

  const findDatabase = async () => {
    await findSolarSystem()
    setLoading(false)
    const star = await fetch("https://universe-app-iota.vercel.app/pages/api/star")
    const starJson = await star.json()
    starJson.sort((a:SortType, b: SortType) => {
      return Number(a.name.slice(9, 20)) - Number(b.name.slice(9, 20)) 
    }).map(({ solarSystem_id, id, name, age, type }: StarType) => {
      let gaxName = ""
      solarSystemName.forEach(i => {
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
    <h1>ADICIONE UMA NOVA ESTRELA:</h1>
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
      <input className={style.uniAge} name="age" id="age" type="number" />
      <label className={style.formUniverseName} htmlFor="type">
        Tipo:
      </label>
      <input className={style.uniType} name="type" id="type" type="text" />
      <label htmlFor="solarId">Pertence ao sistema solar:</label>
      <select className={style.selectID} name="solarId" id="solarId">
      {optionUni}
      </select>
    </form>
    <CreateBtn props={{findDatabase, 'url': 'https://universe-app-iota.vercel.app/pages/api/star'}} />
    </div>
  </div>
  <div className={style.divAll}>
    {uniList.map(uniData => {
    const dataId = uniData.props.children[0].props.className
    return (
    <div className={style.details} key={dataId}>
    {uniData}
    <div className={style.btns}>
    <DeleteBtn props={{'uniData': dataId, findDatabase, 'url': 'https://universe-app-iota.vercel.app/pages/api/star'}} />
    <EditButton props={`/pages/star/edit/${dataId}`}/>
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
