'use client'

import { useState, useEffect, ReactElement } from "react"
import EditButton from "@/app/components/EditButton/editButton";
import LoadingSpinner from "@/app/components/Loading/loading";
import DeleteBtn from "@/app/components/DeleteButton/deleteBtn";
import CreateBtn from "@/app/components/CreateButton/createBtn";
import MainBtn from "@/app/components/MainMenuBtn/mainMenuBtn";
import { SortType, UniversalName, GalaxyType } from "@/app/services/universeTypes";

import style from "./page.module.css"

export default function Menu() {
  const [uniList, setList] = useState<ReactElement[]>([])
  const [optionUni, setOption] = useState<ReactElement[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  
  const finalArr: ReactElement[] = [] 
  const uniArr: ReactElement[] = [] 
  const universeName: UniversalName[] = [] 

  const findUniverse = async () => {
    const universe = await fetch("http://localhost:3000/pages/api/universe")
    const universeJson = await universe.json()
    universeJson.sort((a:SortType, b: SortType) => {
      return Number(a.name.slice(9, 20)) - Number(b.name.slice(9, 20)) 
    }).map(({ id, name }: UniversalName) => {
      universeName.push({name, id})
      uniArr.push(
        <option key={id} value={id}>{name}</option>
      )
    })
    setOption(uniArr)
  }

  const findDatabase = async () => {
    setLoading(false)
    await findUniverse()

    const galaxy = await fetch("http://localhost:3000/pages/api/galaxy")
    const galaxyJson = await galaxy.json()
    galaxyJson.sort((a:SortType, b: SortType) => {
      return Number(a.name.slice(9, 20)) - Number(b.name.slice(9, 20)) 
    }).map(({ id, universe_id, name, age }: GalaxyType) => {
      let uniName = ""
      universeName.forEach(i => {
        if(universe_id === i.id ) {
          uniName = i.name
        }
      })
      finalArr.push(
        <div className={style.universeInfo}>
          <h1 className={`${id}`}>{name.toUpperCase()}</h1>
          <h3 className={`${id}`}> {age} anos</h3>
          <h3 className={`${id}`}> {uniName}</h3>
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
        <h1>ADICIONE UMA NOVA GALAXIA:</h1>
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
          <label htmlFor="universeId">Pertence ao universo:</label>
          <select className={style.selectID} name="universeId" id="universeId">
            {optionUni}
          </select>
        </form>
        <CreateBtn props={{findDatabase, 'url': 'http://localhost:3000/pages/api/galaxy'}} />
      </div>
    </div>
    <div className={style.divAll}>
      {uniList.map(uniData => {
        const dataId = uniData.props.children[0].props.className
        return (
          <div className={style.details} key={dataId}>
            {uniData}
            <div className={style.btns}>
              <DeleteBtn props={{findDatabase, 'url': 'http://localhost:3000/pages/api/galaxy', 'uniData': dataId }} />
              <EditButton props={`/pages/galaxy/edit/${dataId}`}/>
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