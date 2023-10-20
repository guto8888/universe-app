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
    const allUniverse = await prisma.universe.findMany()
    return NextResponse.json(allUniverse)
}

export async function POST(req: Request) {
  const {name, age} = await req.json()
  try {  
        await prisma.universe.create({
          data: {
            name,
            age
          }
        })

        return NextResponse.json({ message: "Item adicionado"})
    
  } catch (error) {
    newError({message: getErrorMessage(error)})
  }

}

export async function DELETE(req: Request) {

  const { name, age, id } = await req.json().then(async({ id }) => {
    return await prisma.universe.findUnique({
     where: {
       id: Number(id),
     },
   })
  })

try {
  await prisma.universe.delete({
    where: {
      id,
      name,
      age
    }
  })
  
  return NextResponse.json({ message: "Item deletado"})
} catch (error) {
  newError({message: getErrorMessage(error)})
}
}

export async function PUT(req: Request) {
  const { name, age, id } = await req.json()

try {
   await prisma.universe.update({
    where: {
      id,
    },
    data: {
      name,
      age
    }
  })

  return NextResponse.json({ message: "Item atualizado"})
} catch (error) {
  newError({message: getErrorMessage(error)})
}
}
  