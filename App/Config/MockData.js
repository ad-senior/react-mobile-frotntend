export default {
  moods: [
    {   
      id: 'HP',
      name: 'Happy',
      image: require('../Images/default/like-2.png'),
    },
    {
      id: 'CT',
      name: 'Content',
      image: require('../Images/default/like-2.png'),
    },
    {
      id: 'DP',
      name: 'Disappointed',
      image: require('../Images/default/like-2.png'),
    },
    {
      id: 'SD',
      name: 'Sad',
      image: require('../Images/default/like-2.png'),
    },
    {
      id: 'DL',
      name: 'Delighed',
      image: require('../Images/default/like-2.png'),
    },
    {
      id: 'EX',
      name: 'Excited',
      image: require('../Images/default/like-2.png'),
    },
    {
      id: 'AX',
      name: 'Anxious',
      image: require('../Images/default/like-2.png'),
    },
    {
      id: 'FT',
      name: 'Frustrated',
      image: require('../Images/default/like-2.png'),
    },
    {
      id: 'CD',
      name: 'Confident',
      image: require('../Images/default/like-2.png'),
    },
    {
      id: 'CM',
      name: 'Calm',
      image: require('../Images/default/like-2.png'),
    },
    {
      id: 'IR',
      name: 'Irritated',
      image: require('../Images/default/like-2.png'),
    },
    {
      id: 'AN',
      name: 'Angry',
      image: require('../Images/default/like-2.png'),
    },
    {
      id: 'DF',
      name: 'Defensive',
      image: require('../Images/default/like-2.png'),
    },
    {
      id: 'CF',
      name: 'Confused',
      image: require('../Images/default/like-2.png'),
    },
    {
      id: 'DO',
      name: 'Disoriented',
      image: require('../Images/default/like-2.png'),
    },
    {
      id: 'FN',
      name: 'Frightened',
      image: require('../Images/default/like-2.png'),
    }
  ],
  ratings: [
    {   
      rating: '1',
      name: '1',
    },  
    {   
      rating: '2',
      name: '2',
    },  
    {   
      rating: '3',
      name: '3',
    },  
    {   
      rating: '4',
      name: '4',
    },  
    {   
      rating: '5',
      name: '5',
    },  
  ],
  categories: [
    {   
      id: '0',
      name: 'Accidents & incidents',
      icon: '../assets/default/compose.png',
    },
    {
      id: '1',
      name: 'Health monitoring',
      icon: '../assets/default/compose.png',
    },
    {
      id: '2',
      name: 'Personal care',
      icon: '../assets/default/compose.png',
    },
    {
      id: '3',
      name: 'Medications',
      icon: '../assets/default/compose.png',
    },
    {
      id: '4',
      name: 'Meals',
      icon: '../assets/default/compose.png',
    },
    {
      id: '5',
      name: 'Night checks',
      icon: '../assets/default/compose.png',
    },
    {
      id: '6',
      name: 'Contact log',
      icon: '../assets/default/compose.png',
    },
    {
      id: '7',
      name: 'Leisure activities',
      icon: '../assets/default/compose.png',
    }
  ],
  navigateCategories: {   
    '0': 'NotFound404',
    '1': 'NotFound404',
    '2': 'PersonalCareScreen',
    '3': 'NotFound404',
    '4': 'MealScreen',
    '5': 'NotFound404',
    '6': 'NotFound404',
    '7': 'NotFound404',
  },
  sections: [
    {
      title: "TODAY'S CALENDAR",
      data: ['Medication', 'Activity', 'Personal Care', 'Dinner']
    },
    {
      title: 'COMPLETED',
      data: ['Medication', 'Activity', 'Washing', 'Dinner']
    },
  ],
  careProvideChoices: [
    {
      label: "Personal care",
      value: "PC",
    },
    {
      label: "Toileting",
      value: "TL",
    },
    {
      label: "Oral Hygiene",
      value: "OH",
    },
    {
      label: "Dressing",
      value: "DR",
    },
  ],
  cleanerChoices: [
    {
      label: "Shower gel",
      value: "SHOW_GEL",
    },
    {
      label: "Soap bar",
      value: "SOAP",
    },
    {
      label: "Body location",
      value: "LOTION",
    },
    {
      label: "Other",
      value: "OTHER",
    },
  ],
  bodyPartChoices: [
    {
      label: "Whole body",
      value: "W",
    },
    {
      label: "Upper body",
      value: "U",
    },
    {
      label: "Lower body",
      value: "L",
    },
    {
      label: "Other",
      value: "OTHER",
    },
  ],
  toolChoices: [
    {
      label: "Sponge",
      value: 1,
    },
    {
      label: "Other tool",
      value: 2,
    },
    {
      label: "Other tool 2",
      value: 3,
    },
  ],
  dryChoices: [
    {
      label: "By Him/Herself",
      value: "SELF",
    },
    {
      label: "Staff Assisted",
      value: "ASSIST",
    },
    {
      label: "Alone and Staff",
      value: "BOTH",
    },
  ]
}
