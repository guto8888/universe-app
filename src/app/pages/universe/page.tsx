'use client'

import { useState, useEffect, ReactElement } from "react"

import EditButton from "@/app/components/EditButton/editButton";
import DeleteBtn from "@/app/components/DeleteButton/deleteBtn";
import LoadingSpinner from "@/app/components/Loading/loading";
import CreateBtn from "@/app/components/CreateButton/createBtn";
import MainBtn from "@/app/components/MainMenuBtn/mainMenuBtn";
import { UniversalType, SortType } from "@/app/services/universeTypes";

import style from "./page.module.css"

export default function Menu() {
  const [uniList, setList] = useState<ReactElement[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  
  const finalArr: ReactElement[] = [] 

  const findDatabase = async () => {
    setLoading(false)
    const universe = await fetch("https://universe-app-iota.vercel.app/pages/api/universe")
    const universeJson = await universe.json()
    universeJson.sort((a: SortType, b: SortType) => {
      return Number(a.name.slice(9, 20)) - Number(b.name.slice(9, 20)) 
        }).map(({ id, name, age }: UniversalType) => {
          finalArr.push(
            <div className={style.universeInfo}>
              <h1 className={`${id}`}>{name.toUpperCase()}</h1>
              <h3 className={`${id}`}> {age} anos</h3>
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
      <h1>ADICIONE UM NOVO UNIVERSO:</h1>
      <MainBtn />
      </div>
      <div className={style.formUniverse} >
        <form onSubmit={e => e.preventDefault()}>
          <label className={style.formUniverseName} htmlFor="name">
            Nome:
          </label>
          <input className={style.uniName} name="name" id="name" type="text" />
          <label className={style.formUniverseAge}  htmlFor="age">
            Idade:
          </label>
          <input className={style.uniAge} name="age" id="age" type="number" />
        </form>
        <CreateBtn props={{findDatabase, 'url': 'https://universe-app-iota.vercel.app/pages/api/universe'}} />        
      </div>
    </div>
    <div className={style.divAll}>
        {uniList.map(uniData => {
          const dataId = uniData.props.children[0].props.className
          return (
            <div className={style.details} key={dataId}>
              {uniData}
              <div className={style.btns}>
              <DeleteBtn props={{'uniData': dataId, findDatabase, 'url': 'https://universe-app-iota.vercel.app/pages/api/universe'}} />
              <EditButton props={`/pages/universe/edit/${dataId}`}/>
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
