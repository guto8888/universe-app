import prisma from "../base"
import { NextResponse } from 'next/server';

function getErrorMessage(error: unknown) {
  if(error instanceof Error) return error.message
  return String(error)
}

const newError = ({ message }: {message: string}) => {
  return NextResponse.json({error: message}) 
}

export async function GET() {
    const allPlanet = await prisma.planet.findMany()
    return NextResponse.json(allPlanet)
}

export async function POST(req: Request) {
  const {name, age, solarSystem_id, star_id, is_inhabited, population } = await req.json()

  try {  
    
    await prisma.planet.create({
      data: {
        name,
        age,
        is_inhabited,
        population,
        solarSystem_id,
        star_id
      }
    })
    return NextResponse.json({ message: "Item adicionado"})
  }  catch (error) {
    newError({message: getErrorMessage(error)})
  }

}

export async function DELETE(req: Request) {
  const { id, name, age, is_inhabited, population, solarSystem_id, star_id} = await req.json().then(async({ id }) => {
      return await prisma.planet.findUnique({
          where: {
              id: Number(id),
            }
        })
    })
    

try {
  await prisma.planet.delete({
    where: {
      id,
      name,
      age,
      is_inhabited,
      population,
      solarSystem_id,
      star_id
    }
  })
  return NextResponse.json({ message: "Item deletado"})
}  catch (error) {
  newError({message: getErrorMessage(error)})
}
}

export async function PUT(req: Request) {
  const { id, name, age, population, solarSystem_id, is_inhabited } = await req.json()

try {
   await prisma.planet.update({
    where: {
      id
    },
    data: {
      name,
      age,
      is_inhabited,
      population,
      solarSystem_id,
    }
  })

  return NextResponse.json({ message: "Item atualizado"})
}  catch (error) {
  newError({message: getErrorMessage(error)})
}
}
  