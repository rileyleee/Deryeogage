import {atom} from "recoil"

export const SimulationStartAtom = atom({
    key: 'SimulationStartAtom',
    default:'default'
})

export const SimulationExistAtom = atom({
    key: 'SimulationExistAtom',
    default:{}
})

export const SimulationNum = atom({
    key: 'SimulationNum',
    default:0
})