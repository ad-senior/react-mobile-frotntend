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
      icon: require('../Images/Category/accidents_incedents.png'),
      color: '#e25b4d'
    },
    {
      id: '1',
      name: 'Health monitoring',
      icon: require('../Images/Category/accidents_incedents.png'),
      color: '#c7db3a'
    },
    {
      id: '2',
      name: 'Personal care',
      icon: require('../Images/Category/personal_care.png'),
      color: '#7c8ce9'
    },
    {
      id: '3',
      name: 'Medications',
      icon: require('../Images/Category/medications.png'),
      color: '#e052e5'
    },
    {
      id: '4',
      name: 'Meals',
      icon: require('../Images/Category/meals.png'),
      color: '#f9c117'
    },
    {
      id: '5',
      name: 'Night checks',
      icon: require('../Images/Category/night_checks.png'),
      color: '#366597'
    },
    {
      id: '6',
      name: 'Contact log',
      icon: require('../Images/Category/contacts_log.png'),
      color: '#697574'
    },
    {
      id: '7',
      name: 'Leisure activities',
      icon: require('../Images/Category/leisure_activities.png'),
      color: '#55b9b2'
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
  mealChoices: [
    {
      label: "Breakfast",
      value: "BF",
    },
    {
      label: "Lunch",
      value: "LH",
    },
    {
      label: "Dinner",
      value: "DN",
    },
    {
      label: "Snack",
      value: "SN",
    }
  ],
  mealPreparedChoices: [
    {
      label: "Staff",
      value: "ST_OL",
    },
    {
      label: "SU alone",
      value: "SU_OL",
    },
    {
      label: "SU with support",
      value: "SU_ST",
    },
    {
      label: "Other",
      value: "OTHER",
    }
  ],
  foodChoices: [
    {
      label: "Cheese pizza",
      value: "0",
    },
    {
      label: "Mushroom soap",
      value: "1",
    },
  ],
  eatingMethodChoices: [
    {
      label: "Independently",
      value: "IDP",
    },
    {
      label: "Fed",
      value: "FED",
    },
    {
      label: "Supported",
      value: "SPT",
    }
  ],
  eatingAmountChoices: [
    {
      label: "Less than Half",
      value: "LH",
    },
    {
      label: "Half",
      value: "H",
    },
    {
      label: "More than Half",
      value: "MH",
    },
    {
      label: "All",
      value: "A",
    }
  ],
  suChoices:[
    {
      label: "Vegetarian",
      value: "VG",
    },
    {
      label: "Pescetarian",
      value: "PPC",
    },
    {
      label: "Vegan",
      value: "VG",
    },
    {
      label: "Halal",
      value: "HL",
    },
    {
      label: "Glucose intl.",
      value: "GC",
    },
    {
      label: "Kosher",
      value: "KS",
    },
    {
      label: "Celiac",
      value: "CL",
    },
    {
      label: "Other",
      value: "OTHER",
    }
  ],
  nutritionChoices: [
    {
      label: "Disphagia diet",
      value: "DD",
    },
    {
      label: "Soft food diet",
      value: "SF",
    },
    {
      label: "Mashed food",
      value: "MF",
    },
    {
      label: "Cut food in small pcs",
      value: "PCS",
    },
    {
      label: "Other",
      value: "OTHER",
    },
  ],
  drinkChoices: [
    {
      label: "Water",
      value: "WT",
    },
    {
      label: "Vegetable juice",
      value: "VGJ",
    },
    {
      label: "Fruit juice",
      value: "FJ",
    }
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
