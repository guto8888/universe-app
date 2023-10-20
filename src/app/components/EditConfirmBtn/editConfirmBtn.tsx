import Link from "next/link"
import style from './page.module.css'
import { NextResponse } from "next/server"
import { BodyObj, PropsElements } from "@/app/services/universeTypes"

export default function EditConfirmBtn (props: PropsElements) {
    const { population, type, href, name, id, age, url } = props.props

    const updateItem = async(objUpdate: BodyObj) => {
        const res = await fetch(url, {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          method: 'PUT',
          body: JSON.stringify(objUpdate)
        })
        return NextResponse.json(res)
      }

      let newHref = href

      if(name === 'undefined' || Number.isNaN(age)){
        alert("Nome e Idade devem ser preenchidos")
        newHref = ''
      }

    return (
        <>
        <Link href={href}>
          <button className={style.btnClick}>Voltar</button>
        </Link>
        <Link href={newHref}>
          <button className={style.btnClick} onClick={() => {
            const uniIdInput = document.querySelector("#uniId") as HTMLInputElement

            let habbited = true
            if(population === 0) {
              habbited = false
            }
            if(name !== 'undefined' && !Number.isNaN(age)) {
              updateItem({
                name, 
                age, 
                id, 
                solarSystem_id: Number(uniIdInput?.value), 
                type, 
                galaxy_id: Number(uniIdInput?.value),
                universe_id: Number(uniIdInput?.value), 
                planet_id: Number(uniIdInput?.value),
                population, 
                is_inhabited: habbited })
            }
          }}>Confirmar</button>
        </Link>
    </>
    )
}