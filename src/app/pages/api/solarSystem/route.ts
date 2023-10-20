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
    const allSolarSystem = await prisma.solarSystem.findMany()
    return NextResponse.json(allSolarSystem)
}

export async function POST(req: Request) {
  const { name, age, galaxy_id } = await req.json()
  try {  
        await prisma.solarSystem.create({
          data: {
            name,
            age,
            galaxy_id
          }
        })
        return NextResponse.json({ message: "Item adicionado"})
    
  } catch (error) {
    newError({message: getErrorMessage(error)})
  }

}

export async function DELETE(req: Request) {
  const { id, name, age } = await req.json().then(async({ id }) => {
    return await prisma.solarSystem.findUnique({
     where: {
       id: Number(id),
     },
   })

  })


try {
  await prisma.solarSystem.delete({
    where: {
      id,
      name,
      age
    }
  })
  
  return NextResponse.json({ message: "Item deletado"})
}  catch (error) {
  newError({message: getErrorMessage(error)})
}

}

export async function PUT(req: Request) {
  const { id, name, age, galaxy_id} = await req.json()

try {
   await prisma.solarSystem.update({
    where: {
      id,
    },
    data: {
      name,
      age,
      galaxy_id
    }
  })

  return NextResponse.json({ message: "Item atualizado"})
}  catch (error) {
  newError({message: getErrorMessage(error)})
}

}
  