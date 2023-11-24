'use client'

import { useState, useEffect, ReactElement } from "react"
import EditButton from "@/app/components/EditButton/editButton";
import LoadingSpinner from "@/app/components/Loading/loading";
import MainBtn from "@/app/components/MainMenuBtn/mainMenuBtn";
import DeleteBtn from "@/app/components/DeleteButton/deleteBtn";
import CreateBtn from "@/app/components/CreateButton/createBtn";
import { SortType, UniversalName, PlanetType } from "@/app/services/universeTypes";

import style from "./page.module.css"

export default function Menu() {
  const [uniList, setList] = useState<ReactElement[]>([])
  const [optionUni, setOption] = useState<ReactElement[]>([])
  const [optionStar, setStar] = useState<ReactElement[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  
  const finalArr: ReactElement[] = [] 
  const uniArr: ReactElement[] = [] 
  const starArr: ReactElement[] = [] 
  const solarSystemName: UniversalName[] = [] 
  const starName: UniversalName[] = []

  const findSolarSystem = async () => {
    const solarSystem = await fetch(`${process.env.BASE_URL}/pages/api/solarSystem`)
    const solarSystemJson = await solarSystem.json()
    solarSystemJson.sort((a:SortType, b: SortType) => {
        return Number(a.name.slice(7, 20)) - Number(b.name.slice(7, 20)) 
    }).map(({ id, name }: UniversalName) => {
        solarSystemName.push({name, id})
        uniArr.push(
          <option key={id} value={id}>{name}</option>
        )
    })
    setOption(uniArr)

    const star = await fetch(`${process.env.BASE_URL}/pages/api/star`)
    const starJson = await star.json()
    starJson.sort((a:SortType, b: SortType) => {
        return Number(a.name.slice(7, 20)) - Number(b.name.slice(7, 20)) 
    }).map(({ id, name }: UniversalName) => {
        starName.push({name, id})
        starArr.push(
        <option key={id} value={id}>{name}</option>
        )
    })
    setStar(starArr)
  }

  const findDatabase = async () => {
    setLoading(false)
    await findSolarSystem()
    const planet = await fetch(`${process.env.BASE_URL}/pages/api/planet`)
    const planetJson = await planet.json()
    planetJson.sort((a: SortType, b: SortType) => {
      return Number(a.name.slice(9, 20)) - Number(b.name.slice(9, 20)) 
    }).map(({ solarSystem_id, name, id, age, population }: PlanetType) => {
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
          <h4 className={`${id}`}> População: {population}</h4>
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
        <h1>ADICIONE UM NOVO PLANETA:</h1>
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
          <input className={style.uniAge} name="age" id="age" type="number" min={1} max={2147483647}  onChange={e => {
            if(Number(e.currentTarget.value) > 2147483647) {
              alert("o valor máximo é 2147483647")
            }
          }
          } />
          <label htmlFor="solarId" className={style.uniId}>Pertence ao sistema solar:</label>
          <select className={style.selectID} name="solarId" id="solarId">
            {optionUni}
          </select>
          <label htmlFor="starId" className={style.starId}>Pertence a estrela:</label>
          <select className={style.selectID} name="starId" id="starId">
            {optionStar}
          </select>
          <div className={style.habbited}>
            <div className={style.habbitedInput}>
              <label className={style.formUniverseHab} id="habitado" htmlFor="habitado">
                É habitado?:
              </label>
              <input className={style.uniHabi} name="habitado" id="habitadoY" type="radio" value="true" />
              <label htmlFor="habitado">Sim</label>
              <input className={style.uniHabi} name="habitado" id="habitadoN" type="radio" value="false" />
              <label htmlFor="habitado">Não</label>
            </div>
            <div className={style.populationInput}>
              <label htmlFor="population">População:</label>
              <input type="number" id="population"/>
            </div>
          </div>
        </form>
        <CreateBtn props={{ findDatabase, 'url': `${process.env.BASE_URL}/pages/api/planet`}} />
      </div>
    </div>
    <section className={style.section}>
      <div className={style.divAll}>
        {uniList.map(uniData => {
        const dataId = uniData.props.children[0].props.className
        return (
          <div className={style.details} key={dataId}>
          {uniData}
            <div className={style.btns}>
              <DeleteBtn props={{'url': `${process.env.BASE_URL}/pages/api/planet`, findDatabase, 'uniData': dataId}} />
              <EditButton props={`/pages/planet/edit/${dataId}`}/>
            </div>
          </div>
          )
        })}
      </div>
    </section>
  </>
  ) : (
    <LoadingSpinner />
  )
}
