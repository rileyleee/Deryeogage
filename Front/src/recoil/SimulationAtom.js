import {atom} from "recoil"

export const SimulationStartAtom = atom({
    key: 'SimulationStartAtom',
    default:'default'
})

export const SimulationExistAtom = atom({
    key: 'SimulationExistAtom',
    default:{
        health: parseInt(localStorage.getItem('hpPercentage')) || 100,
        background : localStorage.getItem('background') || '',
        cost : parseInt(localStorage.getItem('cost')) || 30000,
        end : localStorage.getItem('end') || false,
        endCheck : localStorage.getItem('endCheck') || false,
        endTime : localStorage.getItem('endTime'),
        id : parseInt(localStorage.getItem('id')) || 0,
        lastTime : localStorage.getItem('lastTime'),
        petName : localStorage.getItem('petName') || '',
        petType : localStorage.getItem('petType') || '',
        quizNum : parseInt(localStorage.getItem('quizNum')) || 0,
        requirement : localStorage.getItem('requirement') || '00000',
        startTime : localStorage.getItem('startTime'),
        title : localStorage.getItem('title') || '',
        train : localStorage.getItem('train') || '00000000',
        user : localStorage.getItem('user') || 0
    }
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
    default: 100

})
export const requirementImagesState = atom({
  key: 'requirementImagesState',
  default: [
    {
      image: "assets/things/requirement1.png",
      timeRanges: [
        { startTime: 9, endTime: 10, check: 0 },
        { startTime: 17, endTime: 18, check: 0 },
      ],
      num: 8,
    },
    {
      image: "assets/things/requirement2.png",
      timeRanges: [
        { startTime: 12, endTime: 13, check: 0 },
        { startTime: 20, endTime: 21, check: 0 },
      ],
      num: 10,
    },
  ],
});

export const nextImageState = atom({
    key: 'nextImageState',
    default: null,
  });

export const Requirement = atom({
    key: 'Requirement',
    default: "0000",
  });

export const GameTitle = atom({
    key: 'GameTitle',
    default: {
        0: '도살자',
        1: '생초보 양육자',
        20: '새싹 양육자',
        40: '중급 양육자',
        60: '프로 양육러',
        85: '강아지 그 자체🐶',
        100: '미래의 강형욱✨'
    }
})

export const SelectedQuiz = atom({
    key: 'SelectedQuiz',
    default: {},
  });

export const GameQuiz = atom({
    key: 'GameQuiz',
    default: {
            1: {
                "문제": "건강한 강아지는 항문 주위가 깨끗하다?",
                "정답": "O",
                "해설": "강아지가 몸이 불편할 때 하는 행동 중 하나는 항문을 지나치게 자주 비비거나 항문이나 항문 주위가 많이 부어요. 말을 하지 못하는 우리 강아지들은 본인의 몸을 통해 아픔을 표현하니 평소와 다르게 하지 않는 행동을 한다면 가장 먼저 건강체크를 해보는 것이 좋아요!"
            },
            2: {
                "문제": "강아지는 감기가 걸려도 식욕이 떨어지지 않는다?",
                "정답": "X",
                "해설": "강아지도 사람이랑 똑같아요. 감기는 물론 다른 질병에 걸렸을 때도 가장 눈에 띄는 점은 식욕 저하예요. 잘 먹던 아이가 먹지도 않고, 활동량도 줄어들었다면 건강검진을 해볼 필요가 있어요!"
            },
            3: {
                "문제": "강아지 발바닥 젤리는 미네랄이 부족해서 건조해질 수 있다?",
                "정답": "O",
                "해설": "발바닥 젤리는 신기하게도 미네랄의 영향을 받아요! 겨울이 아닌데도 발바닥이 까끌까끌하다면 비타민 혹은 미네랄 부족일 가능성이 높답니다."
            },
            4: {
                "문제": "대부분의 강아지는 봄에 털갈이 철이라고 할 수 있다?",
                "정답": "O",
                "해설": "봄과 가을은 강아지의 대표적인 털갈이 시즌이예요! 더운 여름을 이겨내기 위해 봄에 두꺼운 털을 벗어 던지기 때문이랍니다!"
            },
            5: {
                "문제": "강아지들끼리 놀 때와 싸울 때의 움직임을 같다?",
                "정답": "X",
                "해설": "아이들이 서로 장난치고 놀 때와, 싸울 때의 모습은 교묘하게 달라요! 꼬리가 빳빳하게 위로 솟아나있거나, 반대로 다리 사이로 말려 들어가 있을 경우, 귀가 뒤로 젖쳐져 있는 경우, 계속 고개와 몸을 반대로 돌리며 피하는 경우 등에는 놀이가 아닌 싸움일 확률이 높으니 침착하게 둘을 떨어트려 놓으세요!"
            },
            6: {
                "문제": "강아지가 난로 옆에 오래 있으면 주의가 필요하다?",
                "정답": "O",
                "해설": "강아지나 고양이는 몸에 털이 있기 때문에 오랜 시간 난로 곁에 머물면 화상을 입을 수 있으니 주의해주세요!"
            },
            7: {
                "문제": "칼슘은 진단을 받지 않은 이상 추가로 급여하지 않아도 괜찮다?",
                "정답": "O",
                "해설": "칼슘은 보통 건사료에도 포함되어 있어, 기본적으로는 별도의 급여가 필요하지 않습니다. 잘못된 급여로 인한 골다공증 등의 질병 발생 가능성이 있으니 진단을 받지 않은 이상 주지 않는 것이 좋습니다."
            },
            8: {
                "문제": "개와 고양이는 같은 음식을 먹여도 괜찮다?",
                "정답": "X",
                "해설": "강아지와 고양이는 영양소 요구량이 다릅니다. 강아지 음식에는 고양이가 필요한 특정 영양소가 부족할 수 있으며, 고양이 음식은 강아지에게 부적합한 성분이 포함될 수 있습니다."
            },
            9: {
                "문제": "강아지는 일주일에 세 번 씩 목욕을 시켜야 한다?",
                "정답": "X",
                "해설": "너무 자주 목욕을 시키면 피부 건강을 해칠 수 있어요. 강아지의 품종, 활동량, 피부 상태 등을 고려하여 목욕 주기를 결정하는 것이 좋습니다."
            },
            10: {
                "문제": "강아지는 2살이 되면, 인간으로 치면 24살이다?",
                "정답": "O",
                "해설": "전통적인 '강아지 한 살은 인간의 7살'이라는 계산법은 정확하지 않습니다. 실제로는 첫 해가 인간으로 치면 15살 정도이며, 두 번째 해에는 9살 정도가 더해져 2살의 강아지는 인간의 24살 정도로 볼 수 있습니다."
            },
            11: {
                "문제": "강아지는 기본적으로 창밖을 보는 것을 좋아한다?",
                "정답": "O",
                "해설": "강아지는 외부의 움직임과 소리에 자연스럽게 반응하며 호기심이 많아 창밖을 보는 것을 좋아합니다. 창가에 안락한 공간을 마련해주면 행복해 할 것입니다."
            },
            12: {
                "문제": "겨울철 강아지는 실내에서만 지내게 해도 괜찮다?",
                "정답": "X",
                "해설": "강아지는 신선한 공기와 활동이 필요합니다. 겨울이라도 적절한 옷을 입히고 짧은 시간이라도 산책을 하게 해주는 것이 건강에 좋습니다."
            },
            13: {
                "문제": "강아지는 가급적 많은 단백질을 섭취해야 한다?",
                "정답": "O",
                "해설": "강아지는 단백질을 기본 에너지원으로 활용하며, 건강한 피부와 털, 그리고 근육 발달에 필요합니다. 다만, 과다 섭취는 피해야 하며, 특별한 의료 상황에서는 단백질 제한이 필요할 수도 있습니다."
            },
            14: {
                "문제": "어린 강아지는 물에 빠지면 헤엄칠 수 있다?",
                "정답": "X",
                "해설": "강아지가 헤엄치는 것은 본능이지만, 모든 강아지가 자연스럽게 헤엄칠 수 있는 것은 아닙니다. 특히 어린 강아지는 물에 빠지면 위험할 수 있으니 주의가 필요합니다."
            },
            15: {
                "문제": "강아지는 치약을 삼켜도 괜찮다?",
                "정답": "X",
                "해설": "일반적인 인간용 치약은 플루오린 등 강아지에게 해로운 성분을 포함할 수 있습니다. 강아지의 치아 관리에는 반드시 애완동물 전용 치약을 사용해야 합니다."
            },
            16: {
                "문제": "강아지가 생식을 하면 질병에 대한 예방이 되고 건강에 좋다?",
                "정답": "X",
                "해설": "강아지가 생식을 하면 반드시 건강에 좋은 것은 아닙니다. 오히려 생식 활동과 관련된 질병 또는 상처 등의 위험이 있을 수 있습니다. 중성화 수술 등을 통해 예방하는 것이 건강에 더 좋을 수 있습니다."
            },
            17: {
                "문제": "강아지는 고양이처럼 자기 몸을 핥아서 목욕을 한다?",
                "정답": "X",
                "해설": "강아지는 몸을 핥아서 깨끗이 하긴 하지만, 고양이처럼 전체 몸을 핥아 깨끗이 하는 목욕 행동은 하지 않습니다. 깨끗이 하려면 정기적인 목욕이 필요합니다."
            },
            18: {
                "문제": "강아지는 소금기를 좋아해서 짠 음식을 먹어도 괜찮다?",
                "정답": "X",
                "해설": "강아지는 소금기를 인식할 수 있지만, 인간의 음식처럼 과도한 소금 섭취는 건강에 해로울 수 있습니다. 강아지 전용 음식을 급여하는 것이 좋습니다."
            },
            19: {
                "문제": "강아지는 앉은 자세로 잠을 자도 괜찮다?",
                "정답": "O",
                "해설": "강아지는 앉은 자세로 잠을 자는 것이 익숙하고 편안할 수 있습니다. 다만, 이러한 자세가 지속될 경우 건강 문제를 확인해볼 필요가 있을 수도 있으니 주의해야 합니다."
            },
            20: {
                "문제": "강아지의 코가 축축하면 건강하다는 뜻이다?",
                "정답": "X",
                "해설": "강아지의 코가 축축한 것이 항상 건강한 상태를 의미하는 것은 아닙니다. 코의 상태는 다양한 요소에 의해 변할 수 있으며, 강아지의 전반적인 건강 상태를 판단하기 위해서는 다른 증상과 함께 종합적으로 평가해야 합니다."
            }
    }
})