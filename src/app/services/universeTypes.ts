export interface SortType {
    name: string
}
export interface UniversalName extends SortType {
    id: number
}
export interface UniversalType extends UniversalName {
    age: number,
}
export interface StarType extends UniversalType {
    type: string
    solarSystem_id: number, 
}
export interface SolarType extends UniversalType { 
    galaxy_id: number
}

export interface SatType extends UniversalType {
    planet_id: number
}  
export interface PlanetType extends UniversalType {
    population: number
    solarSystem_id: number, 
}
export interface GalaxyType extends UniversalType { 
    universe_id: number
}
export interface BodyObj {
    name?: string,
    age?: number,
    id?: number,
    solarSystem_id?: number,
    galaxy_id?: number,
    planet_id?: number,
    population?: number
    type?: string,
    is_inhabited?: boolean,
    universe_id?: number,
    star_id?: number
}
interface PropsTypes extends UniversalType {
    href: string,
    url: string,
    type?: string,
    population?: number,
}
interface FunctionType {
    findDatabase: Function,
    url: string
}
interface GenericTypes extends FunctionType {
    uniData: string,
}
export interface PropsInterface {
    props: GenericTypes
}
export interface FunctionInterface {
    props: FunctionType
}
export interface PropsElements {
    props: PropsTypes
}