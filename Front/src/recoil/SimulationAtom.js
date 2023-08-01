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

export const SimulationDog = atom({
    key: 'SimulationDog',
    default:0
})

export const SimulationName = atom({
    key: 'SimulationName',
    default:''
})

export const SimulationBGI = atom({
    key: 'SimulationBGI',
    default:0
})


export const SimulationNameCalling = atom({
    key: 'SimulationNameCalling',
    default:0
})

export const SimulationWaiting = atom({
    key: 'SimulationWaiting',
    default:0
})

export const SimulationHouse = atom({
    key: 'SimulationHouse',
    default:0
})

export const SimulationSit = atom({
    key: 'SimulationSit',
    default:0
})