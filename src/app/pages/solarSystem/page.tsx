'use client'

import { useState, useEffect, ReactElement } from "react"
import EditButton from "@/app/components/EditButton/editButton";
import LoadingSpinner from "@/app/components/Loading/loading";
import MainBtn from "@/app/components/MainMenuBtn/mainMenuBtn";
import DeleteBtn from "@/app/components/DeleteButton/deleteBtn";
import CreateBtn from "@/app/components/CreateButton/createBtn";
import { SortType, UniversalType, SolarType, UniversalName } from "@/app/services/universeTypes";

import style from "./page.module.css"

export default function Menu() {
  const [loading, setLoading] = useState(false)
  const [uniList, setList] = useState<ReactElement[]>([])
  const [optionUni, setOption] = useState<ReactElement[]>([])
  
  const finalArr: ReactElement[] = [] 
  const uniArr: ReactElement[] = [] 
  const galaxyName: UniversalName[] = [] 

  const findGalaxy = async () => {
    const galaxy = await fetch("https://universe-app-iota.vercel.app/pages/api/galaxy")
    const galaxyJson = await galaxy.json()
    galaxyJson.sort((a: SortType, b: SortType) => {
      return Number(a.name.slice(9, 20)) - Number(b.name.slice(9, 20)) 
    }).map(({ name, id }: UniversalType) => {
      galaxyName.push({"name": name, "id": id})
      uniArr.push(
       <option key={id} value={id}>{name}</option>
      )
    })
    setOption(uniArr)
  }

  const findDatabase = async () => {
    setLoading(false)
    await findGalaxy()

    const solarSystem = await fetch("https://universe-app-iota.vercel.app/pages/api/solarSystem")
    const solarSystemJson = await solarSystem.json()
    solarSystemJson.sort((a:SortType, b: SortType) => {
      return Number(a.name.slice(8, 20)) - Number(b.name.slice(8, 20)) 
    }).map(({ galaxy_id, id, name, age }: SolarType) => {
      let gaxName = ""
      galaxyName.forEach(i => {
        if(galaxy_id === i.id ) {
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
        <h1>ADICIONE UM NOVO SISTEMA SOLAR:</h1>
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
          <label htmlFor="galaxyId">
            Pertence a galáxia:
          </label>
          <select className={style.selectID} name="galaxyId" id="galaxyId">
          {optionUni}
          </select>
        </form>
        <CreateBtn props={{findDatabase, 'url': "https://universe-app-iota.vercel.app/pages/api/solarSystem"}} />
      </div>
    </div>
    <div className={style.divAll}>
      {uniList.map(uniData => {
        const dataId = uniData.props.children[0].props.className
      return (
        <div className={style.details} key={dataId}>
          {uniData}
          <div className={style.btns}>
            <DeleteBtn props={{'uniData': dataId, findDatabase, 'url': 'https://universe-app-iota.vercel.app/pages/api/solarSystem'}} />
            <EditButton props={`/pages/solarSystem/edit/${dataId}`}/>
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
