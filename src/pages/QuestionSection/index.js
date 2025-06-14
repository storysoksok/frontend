import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Main from '../../components/Main';
import './QuestionSection.css';

const enumMap = {
  character: {
    '토끼': 'RABBIT', '강아지': 'DOG', '고양이': 'CAT', '친구': 'FRIEND',
    '선생님': 'TEACHER', '엄마': 'MOM', '아기 곰': 'BABY_BEAR', '공주님': 'PRINCESS',
    '로봇': 'ROBOT', '괴물': 'MONSTER', '마법사': 'WIZARD', '오이': 'CUCUMBER',
    '요리사': 'CHEF', '고래': 'WHALE', '거북이': 'TURTLE', '해님': 'SUN',
    '구름 요정': 'CLOUD_FAIRY', '자동차': 'CAR', '도깨비': 'DOKKAEBI', '유령 친구': 'GHOST_FRIEND'
  },
  location: {
    '우리 집': 'HOME', '학교': 'SCHOOL', '놀이터': 'PLAYGROUND', '병원': 'HOSPITAL',
    '유치원 교실': 'KINDERGARTEN_CLASSROOM', '바닷가': 'BEACH', '숲속': 'FOREST', '하늘 위': 'SKY',
    '동물원': 'ZOO', '장난감 가게': 'TOY_STORE', '마트': 'SUPERMARKET', '꿈나라': 'DREAMLAND',
    '성 안': 'CASTLE', '동굴': 'CAVE', '공룡나라': 'DINOSAUR_LAND', '빵집': 'BAKERY',
    '수영장': 'SWIMMING_POOL', '놀이공원': 'AMUSEMENT_PARK', '마법 나라': 'MAGIC_LAND', '버스 안': 'INSIDE_BUS'
  },
  subject: {
    '친구와 놀러 가는 이야기': 'HANGING_OUT_WITH_FRIEND', '동물이 모험하는 이야기': 'ANIMAL_ADVENTURE',
    '선물을 찾는 이야기': 'SEARCHING_FOR_PRESENT', '마법을 쓰는 이야기': 'USING_MAGIC',
    '생일 파티 이야기': 'BIRTHDAY_PARTY', '무서운 괴물과 만나는 이야기': 'MEETING_SCARY_MONSTER',
    '길을 잃고 돌아오는 이야기': 'LOST_AND_FOUND_WAY', '비 오는 날 이야기': 'RAINY_DAY',
    '숨은 보물을 찾는 이야기': 'FINDING_HIDDEN_TREASURE', '친구랑 싸우고 화해하는 이야기': 'FIGHT_AND_MAKE_UP_WITH_FRIEND',
    '잃어버린 장난감을 찾는 이야기': 'FINDING_LOST_TOY', '꿈속 세상 이야기': 'DREAM_WORLD',
    '동물 병원 이야기': 'ANIMAL_HOSPITAL', '학교에서 있었던 이야기': 'AT_SCHOOL',
    '신기한 물건을 발견한 이야기': 'DISCOVERING_STRANGE_OBJECT', '미끄럼틀에서 생긴 이야기': 'SLIDE_ADVENTURE',
    '마트에 간 이야기': 'TRIP_TO_SUPERMARKET', '피자를 만들던 이야기': 'MAKING_PIZZA',
    '아기 동물을 돌보는 이야기': 'CARING_BABY_ANIMAL', '소풍 가는 이야기': 'GOING_ON_FIELD_TRIP'
  }
};

const questions = [
  { title: '어떤 이야기를 만들고 싶나요?', options: Object.keys(enumMap.subject) },
  { title: '이야기는 어디에서 일어나나요?', options: Object.keys(enumMap.location) },
  { title: '어떤 등장인물이 있나요?', options: Object.keys(enumMap.character) }
];

function QuestionSectionPage() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [shuffledChoices, setShuffledChoices] = useState({});
  const navigate = useNavigate();
  const current = questions[step];

  const getFixedChoiceForNextStep = (step, currentAnswer) => {
    if (step === 0) {
      if (currentAnswer === '친구의 마음을 이해하는 이야기') return '숲속 놀이터';
      if (currentAnswer === '서로 다른 속도를 이해하는 이야기') return '숲속 유치원';
      if (currentAnswer === '친구가 되는 이야기') return '별빛이 내리는 숲속';
      if (currentAnswer === '함께하는 기쁨을 알려주는 이야기') return '눈 내리는 하얀 나라';
    }
    if (step === 1) {
      if (answers[0] === '서로 다른 속도를 이해하는 이야기' && currentAnswer === '숲속 유치원') {
        return '느린 코끼리';
      }
      if (answers[0] === '친구의 마음을 이해하는 이야기' && currentAnswer === '숲속 놀이터') {
        return '토끼';
      }
      if (answers[0] === '친구가 되는 이야기' && currentAnswer === '눈 내리는 하얀 나라') {
        return '북극곰';
      }
      if (answers[0] === '함께하는 기쁨을 알려주는 이야기' && currentAnswer === '별빛이 내리는 숲속') {
        return '고슴도치';
      }
    }
    return null;
  };

  useEffect(() => {
    localStorage.removeItem('midPartStory');
    localStorage.removeItem('secondHalfSubject');
    localStorage.removeItem('secondHalfResultStory');
    localStorage.removeItem('secondHalfEtc');

    if (shuffledChoices[step]) return;

    const shuffle = (array) => {
      const copy = [...array];
      for (let i = copy.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [copy[i], copy[j]] = [copy[j], copy[i]];
      }
      return copy;
    };

    const currentOptions = current.options;
    const subject = answers[0];
    const location = answers[1];
    let fixed = null;

    const predefinedSubjects = ['친구의 마음을 이해하는 이야기', '서로 다른 속도를 이해하는 이야기', '친구가 되는 이야기', '함께하는 기쁨을 알려주는 이야기', '차이를 존중하는 이야기'];

    if (step === 0) {
      const fixedCandidates = predefinedSubjects;
      fixed = fixedCandidates[Math.floor(Math.random() * fixedCandidates.length)];
    } else if (step === 1 && predefinedSubjects.includes(subject)) {
      if (subject === '친구의 마음을 이해하는 이야기') fixed = '숲속 놀이터';
      if (subject === '서로 다른 속도를 이해하는 이야기') fixed = '숲속 유치원';
      if (subject === '친구가 되는 이야기') fixed = '눈 내리는 하얀 나라';
      if (subject === '함께하는 기쁨을 알려주는 이야기') fixed = '별빛이 내리는 숲속';
      if (subject === '차이를 존중하는 이야기') fixed = '푸른 숲';
    } else if (step === 2 && predefinedSubjects.includes(subject)) {
      if (subject === '서로 다른 속도를 이해하는 이야기' && location === '숲속 유치원') fixed = '느린 코끼리';
      if (subject === '친구의 마음을 이해하는 이야기' && location === '숲속 놀이터') fixed = '토끼';
      if (subject === '친구가 되는 이야기' && location === '눈 내리는 하얀 나라') fixed = '북극곰';
      if (subject === '함께하는 기쁨을 알려주는 이야기' && location === '별빛이 내리는 숲속') fixed = '고슴도치';
      if (subject === '차이를 존중하는 이야기' && location === '푸른 숲') fixed = '달팽이';
    }

    const filtered = fixed ? currentOptions.filter(o => o !== fixed) : currentOptions;
    const randomChoices = shuffle(filtered).slice(0, fixed ? 2 : 3);

    // 실제 고정 조건을 만족할 때만 포함
    let includeFixed = false;

    if (step === 0) {
      includeFixed = true; // 주제는 항상 포함
    } else if (step === 1) {
      includeFixed =
        (subject === '친구의 마음을 이해하는 이야기' && fixed === '숲속 놀이터') ||
        (subject === '서로 다른 속도를 이해하는 이야기' && fixed === '숲속 유치원') ||
        (subject === '친구가 되는 이야기' && fixed === '눈 내리는 하얀 나라') ||
        (subject === '함께하는 기쁨을 알려주는 이야기' && fixed === '별빛이 내리는 숲속') ||
        (subject === '차이를 존중하는 이야기' && fixed === '푸른 숲');
    } else if (step === 2) {
      includeFixed =
        (subject === '서로 다른 속도를 이해하는 이야기' && location === '숲속 유치원' && fixed === '느린 코끼리') ||
        (subject === '친구의 마음을 이해하는 이야기' && location === '숲속 놀이터' && fixed === '토끼') ||
        (subject === '친구가 되는 이야기' && location === '눈 내리는 하얀 나라' && fixed === '북극곰') ||
        (subject === '함께하는 기쁨을 알려주는 이야기' && location === '별빛이 내리는 숲속' && fixed === '고슴도치') ||
        (subject === '차이를 존중하는 이야기' && location === '푸른 숲' && fixed === '달팽이');
    }

    const finalChoices = includeFixed && fixed
      ? [...randomChoices, fixed]
      : randomChoices;

    setShuffledChoices(prev => ({ ...prev, [step]: finalChoices }));
  }, [step, answers, current.options]);




  const handleChoice = (choice) => {
    setAnswers((prev) => ({ ...prev, [step]: choice }));
  };

  const handleNext = () => {
    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      const subject = answers[0];
      const location = answers[1];
      const character = answers[2];

      const predefinedCombos = [
        {
          subject: '서로 다른 속도를 이해하는 이야기',
          location: '숲속 유치원',
          character: '느린 코끼리',
          storyData: {
            title: [
              '느려도 괜찮아'
            ],
            midPartFairyTaleStory: [
              '숲속 유치원에는 오늘도 동물 친구들이 모였어요. “안녕!” 원숭이는 아기 코끼리 옆을 팔짝팔짝 뛰며 인사했어요. 코끼리는 천천히 고개를 끄덕이며 웃었지요. 모두가 다 같은 속도로 움직이는 건 아니에요.',
              '“이따가 그네 타자! 그리고 모래놀이도 하고, 미끄럼틀도 타자!” 원숭이는 빠르게 말하며 신이 났어요. 코끼리는 조심스럽게 말하려 했지만, 입을 열기도 전에 원숭이는 벌써 딴 데를 보고 있었지요.',
              '코끼리는 조심스럽게 입을 열었어요. “나도... 그네... 타고 싶...” 하지만 원숭이는 이미 저 멀리 뛰어가고 있었지요. 코끼리의 말은 끝까지 닿지 못했어요.',
              '원숭이는 벌써 저 멀리 달려가고 있었어요. 코끼리는 아무 말도 하지 못한 채, 그 자리에 가만히 서 있었지요. 입을 열었지만, 마음은 닿지 않았어요.'
            ],
            secondHalfFairyTaleStory: [
              '작은 병아리가 다가와 조용히 말을 걸어요.',
              '코끼리는 혼자 멀리 놀이터를 떠나요.',
              '원숭이는 코끼리에게 장난감을 던지며 장난쳐요.'
            ],
            imageUrls: [
              '/slowspeak/slowspeak1.png',
              '/slowspeak/slowspeak2.png',
              '/slowspeak/slowspeak3.png',
              '/slowspeak/slowspeak4.png'
            ],
            titleImageUrls: [
              '/slowspeak/slowspeak0.png'
            ]
          }
        },
        {
          subject: '친구의 마음을 이해하는 이야기',
          location: '숲속 놀이터',
          character: '토끼',
          storyData: {
            title: [
              '친구를 지킬거야'
            ],
            midPartFairyTaleStory: [
              '숲속 놀이터는 오늘도 시끌벅적했어요. 친구들이 웃고 떠들며 뛰어놀고 있었지요. 다람쥐는 미끄럼틀에서 내려오며 크게 웃었고, 토끼는 그네에 조용히 앉아 하늘을 올려다보았어요.',
              '곰이 공을 들고 토끼 쪽으로 다가갔어요. “야, 너 여기서 뭐 해?” 곰이 말했어요. 토끼는 말없이 고개만 숙였지요. 다람쥐는 멀리서 그 모습을 조용히 바라보고 있었어요.',
              '“이 공 받아 봐!” 곰이 갑자기 소리쳤어요. 토끼는 깜짝 놀라 그네에 꼭 붙어 앉았지요. 곰은 웃고 있었지만, 토끼는 점점 더 무서워졌어요. 그 모습을 본 다람쥐의 눈이 점점 커졌어요.',
              '“그만해, 곰!” 다람쥐가 크게 외쳤어요. 곰은 깜짝 놀라 멈춰 섰고, 공을 꼭 쥔 손을 내렸지요. “토끼는 지금 무서워하고 있어.” 다람쥐의 눈빛은 누구보다 진지했어요.',
            ],
            secondHalfFairyTaleStory: [
              '토끼는 놀이터에서 달아나고 다시는 돌아오지 않아요.',
              '곰은 멈춰 서서 조용히 자신의 행동을 되돌아봐요.',
              '다람쥐는 곰에게 공을 빼앗고 혼자 놀기 시작해요.'
            ],
            imageUrls: [
              '/friendprotect/friendprotect1.png',
              '/friendprotect/friendprotect2.png',
              '/friendprotect/friendprotect3.png',
              '/friendprotect/friendprotect4.png'
            ],
            titleImageUrls: [
              '/friendprotect/friendprotect0.png'
            ]
          }
        },
        {
          subject: '친구가 되는 이야기',
          location: '눈 내리는 하얀 나라',
          character: '북극곰',
          storyData: {
            title: [
              '친구가 필요해'
            ],
            midPartFairyTaleStory: [
              '하얀 나라, 눈으로 덮인 들판에 크고 하얀 북극곰 한 마리가 살았어요. 곰은 늘 혼자였지만, 친구들과 놀고 싶었답니다. 그저 멀리서 바라보기만 했어요.',
              '북극곰은 조심스럽게 다가가 보았어요. 하지만 친구들은 놀라며 도망쳐 버렸죠. “내가 너무 커서 그런 걸까?”  곰은 그 자리에 멈춰 섰어요.',
              '“나는 그냥… 같이 놀고 싶었는데…” 북극곰은 앞발로 눈을 톡톡 건드렸어요. 친구들의 웃음소리는 멀리서 들렸지만, 곰은 등을 돌리고 조용히 앉아 있었어요.',
              '곰은 작은 눈사람을 만들어 조심스럽게 놔두었어요. “이걸 보면 조금은… 웃을 수 있을까?” 곰은 아무 말도 없이 조용히 돌아섰어요. 하얀 눈 위엔 커다란 발자국만 남았답니다.',
            ],
            secondHalfFairyTaleStory: [
              '친구들이 곰을 찾아가 함께 놀자고 해요', //✅
              '북극곰은 영원히 혼자 살게 되었어요.',
              '친구들이 눈사람을 부수고 도망가요.'
            ],
            imageUrls: [
              '/friendbear/friednbear1.png',
              '/friendbear/friednbear2.png',
              '/friendbear/friednbear3.png',
              '/friendbear/friednbear4.png'
            ],
            titleImageUrls: [
              '/friendbear/friednbear0.png'
            ]
          }
        },
        {
          subject: '함께하는 기쁨을 알려주는 이야기',
          location: '별빛이 내리는 숲속',
          character: '고슴도치',
          storyData: {
            title: [
              '달빛을 나눈 도치'
            ],
            midPartFairyTaleStory: [
              '깊고 조용한 숲, 밤하늘엔 둥근 달이 떴어요. 고슴도치 한 마리가 풀밭에 앉아 하늘을 올려다보았죠. “오늘 달은 정말 밝고 예쁘다…” 고슴도치는 혼잣말을 하며 조용히 미소 지었어요.',
              '그때였어요. 풀밭 사이에서 반짝이는 빛이 하나둘 떠올랐어요. 고슴도치는 눈을 동그랗게 뜨고 속삭였죠. “이건… 달빛 조각인가?”',
              '고슴도치는 조심스럽게 달빛 조각 하나를 손에 올렸어요. 따뜻하고 부드러운 빛이 손끝을 간질였죠. “진짜 달의 조각일까?” 그는 가슴이 두근두근했어요.',
              '고슴도치는 달빛 조각들을 하나씩 모았어요. 작은 가방 속에 조심조심 담았지요. “이걸로 뭘 하면 좋을까?” 눈빛이 반짝이는 고슴도치의 머릿속엔 멋진 생각이 떠오르고 있었어요.',
            ],
            secondHalfFairyTaleStory: [
              '달빛 조각을 친구들에게 나눠주고 싶어요', //✅
              '달빛 조각을 숨겨 깊은 땅속에 묻어요',
              '달빛 조각으로 집을 지어 혼자 살기로 해요.'
            ],
            imageUrls: [
              '/hedgehog/hedgehog1.png',
              '/hedgehog/hedgehog2.png',
              '/hedgehog/hedgehog3.png',
              '/hedgehog/hedgehog4.png'
            ],
            titleImageUrls: [
              '/hedgehog/hedgehog0.png'
            ]
          }
        },
        {
          subject: '차이를 존중하는 이야기',
          location: '푸른 숲',
          character: '달팽이',
          storyData: {
            title: [
              '아기 달팽이 달록'
            ],
            midPartFairyTaleStory: [
              '푸른 숲속, 조용히 길을 걷는 달팽이 ‘달록’이 있었어요. 토끼와 다람쥐 친구들은 폴짝폴짝 뛰어가며 신나게 놀고 있었지요. 달록은 천천히 움직였지만, 얼굴에는 부드러운 미소가 있었어요. “나는 내 속도로 오늘도 여행을 떠나볼 거야!” 달록은 속삭였어요.',
              '하지만 숲속 친구들은 달록을 보며 웃기 시작했어요. “저 달팽이는 왜 이렇게 느려?” 다람쥐와 토끼가 킥킥대며 말했죠. 달록은 고개를 숙이고 조용히 멈춰 섰어요. 처음으로 ‘나는 너무 느린 걸까?’ 하는 생각이 들었답니다.',
              '달록은 조용히 혼자 길을 걸었어요. 다람쥐와 토끼는 저 멀리서 떠들며 앞서 나갔지요. 달록은 괜히 마음이 무거워졌어요. “내가 느리다고 해서 친구가 될 수 없는 걸까…” 달록은 속으로 중얼였어요.',
              '달록은 조용히 숲길을 걷다가 이상한 기운을 느꼈어요. 커다란 덤불 속에서 반짝이는 눈 두 개가 그를 지켜보고 있었죠. “어… 저건 뭐지?” 달록은 살짝 멈춰서 긴장했어요. 주변은 조용했지만, 마음속엔 작은 두려움이 스며들었어요.',
            ],
            secondHalfFairyTaleStory: [
              '달록이 풀숲 속 새를 발견한다.', //✅
              '달록이 숲을 떠나기로 한다.',
              '달록이 토끼와 다람쥐에게 사과한다.'
            ],
            imageUrls: [
              '/snail/snail1.png',
              '/snail/snail2.png',
              '/snail/snail3.png',
              '/snail/snail4.png'
            ],
            titleImageUrls: [
              '/snail/snail0.png'
            ]
          }
        }                 
      ];

      const matched = predefinedCombos.find(
        (combo) => combo.subject === subject && combo.location === location && combo.character === character
      );

      if (matched) {
        localStorage.setItem('midPartStory', JSON.stringify(matched.storyData));
        navigate('/precreating');
        return;
      }

      const requestBody = {
        fairyTaleSubject: enumMap.subject[subject] || 'ETC',
        fairyTaleLocation: enumMap.location[location] || 'ETC',
        fairyTaleCharacter: enumMap.character[character] || 'ETC',
        otherSubject: enumMap.subject[subject] === 'ETC' ? subject : '',
        otherLocation: enumMap.location[location] === 'ETC' ? location : '',
        otherCharacter: enumMap.character[character] === 'ETC' ? character : ''
      };

      navigate('/creating', { state: requestBody });
    }
  };

  const handlePrev = () => {
    if (step > 0) setStep(step - 1);
  };

  return (
    <Main>
      <div className="question-section">
        <div className="question-box">
          <div className="circle-deco top" />
          <div className="question-title">{current.title}</div>
          {(shuffledChoices[step] || []).map((c) => (
            <button
              key={c}
              className="choice-btn"
              onClick={() => handleChoice(c)}
              style={{
                borderColor: answers[step] === c ? '#F6DF7B' : '#222',
                background: answers[step] === c ? '#F6DF7B' : '#fff'
              }}
            >
              {c}
            </button>
          ))}
          <input
            className="custom-input"
            placeholder="직접 적어보세요!"
            value={answers[step] || ''}
            onChange={(e) => handleChoice(e.target.value)}
          />
          <div className="button-row">
            <button className="prev-btn" onClick={handlePrev} disabled={step === 0}>이전</button>
            <button className="next-btn" onClick={handleNext} disabled={!answers[step]}>
              {step < questions.length - 1 ? '다음' : '완료'}
            </button>
          </div>
          <div className="circle-deco bottom" />
        </div>
      </div>
    </Main>
  );
}

export default QuestionSectionPage;