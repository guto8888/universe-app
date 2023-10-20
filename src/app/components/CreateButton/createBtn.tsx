import { NextResponse } from "next/server";
import { FunctionInterface, BodyObj } from "@/app/services/universeTypes";

export default function CreateBtn(props: FunctionInterface) {
    const { findDatabase, url } = props.props

    const saveToDatabase = async (bodyObj: BodyObj) => {
        const res = await fetch(url, {
          headers: {
            'Accept': 'application/json',
          'Content-Type': 'application/json',
          },
          method: 'POST',
          body: JSON.stringify(bodyObj),
        })
        findDatabase()
        return NextResponse.json(res)
    };

    return (
        <button onClick={() => {
          const nameInput = document.querySelector("#name") as HTMLInputElement
          const ageInput = document.querySelector("#age") as HTMLInputElement
          const typeInput = document.querySelector("#type") as HTMLInputElement
          const solarSystem = document.querySelector("#solarId") as HTMLInputElement
          const galaxy = document.querySelector("#galaxyId") as HTMLInputElement
          const planet = document.querySelector("#planetId") as HTMLInputElement
          const universeId = document.querySelector("#universeId") as HTMLInputElement
          const starIdInput = document.querySelector("#starId") as HTMLInputElement
          const habitadoRespY = document.querySelector("#habitadoY") as HTMLInputElement
          const populationInput = document.querySelector("#population") as HTMLInputElement

          if(nameInput.value !== '' && Number(ageInput.value) !== 0){
            if(habitadoRespY?.checked === true && Number(populationInput.value) === 0) {
                populationInput.placeholder = 'Campo Obrigatório'
                return
            }
            if(typeInput?.value === '') {
              typeInput.placeholder = 'Campo Obrigatório'
              return
            }
              saveToDatabase({
                name: nameInput?.value, 
                age: Number(ageInput?.value), 
                type: typeInput?.value,
                solarSystem_id: Number(solarSystem?.value), 
                galaxy_id: Number(galaxy?.value),
                planet_id: Number(planet?.value), 
                star_id: Number(starIdInput?.value), 
                is_inhabited: Boolean(habitadoRespY?.checked), 
                population: Number(populationInput?.value), 
                universe_id: Number(universeId?.value)
                })
              
          } else {
            nameInput.placeholder = 'Campo Obrigatório'
            ageInput.placeholder = 'Campo Obrigatório'
            if(typeInput?.value === '') {
              typeInput.placeholder = 'Campo Obrigatório'
            }
            if(habitadoRespY?.checked === true) {
              if(Number(populationInput.value) === 0) {
                populationInput.placeholder = 'Campo Obrigatório'
              }
            }
          }
        }
        }>Adicionar</button>
    )
}