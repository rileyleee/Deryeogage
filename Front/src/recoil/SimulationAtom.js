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

export const SimulationWalkingCnt = atom({
    key: 'SimulationWalkingCnt',
    default:0
})

export const SimulationHours = atom({
    key: 'SimulationHours',
    default:0
})

export const SimulationMinutes = atom({
    key: 'SimulationMinutes',
    default:0
})

export const SimulationCost = atom({
    key: 'SimulationCost',
    default:300000
})

export const SimulationHp = atom({
    key: 'SimulationHp',
    default: localStorage.getItem('hpPercentage')
})


export const requirementImagesState = atom({
  key: 'requirementImagesState',
  default: [
    {
      image: "assets/things/requirement1.png",
      timeRanges: [
        { startTime: 8, endTime: 9, check: 0 },
        { startTime: 17, endTime: 18, check: 0 },
      ],
      num: 8,
    },
    {
      image: "assets/things/requirement2.png",
      timeRanges: [
        { startTime: 12, endTime: 13, check: 0 },
        { startTime: 23, endTime: 24, check: 0 },
      ],
      num: 10,
    },
  ],
});

export const nextImageState = atom({
    key: 'nextImageState',
    default: null,
  });