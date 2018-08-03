export default {
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
      name: 'Incidents/accidents',
      icon: require('../Images/Category/accidents_incedents.png'),
      color: '#e25b4d'
    },
    {
      id: '1',
      name: 'Health monitoring',
      icon: require('../Images/Category/health_monitoring.png'),
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
    '0': 'AccidentsScreen',
    '1': 'HealthScreen',
    '2': 'PersonalCareScreen',
    '3': 'MedicationsScreen',
    '4': 'MealScreen',
    '5': 'NightChecksScreen',
    '6': 'ContactLogScreen',
    '7': 'ActivityScreen',
  },
  sections: [
    {
      title: "TODAY'S CALENDAR",
      data: [
        {
          'name': 'Lunch',
          'time': '12.30',
          'color': '#f9c117',
          'completed': false,
          'active': true,
          'navigate': 'MealScreen',
          'image': require('../Images/Category/meals.png')
        },
        {
          'name': 'Medication',
          'time': '14.00',
          'color': '#e052e5',
          'completed': false,
          'active': false,
          'navigate': 'MedicationsScreen',
          'image': require('../Images/Category/medications.png')
        },
        {
          'name': 'Activity',
          'time': '15.30',
          'color': '#55b9b2',
          'completed': false,
          'active': false,
          'navigate': 'ActivityScreen',
          'image': require('../Images/Category/leisure_activities.png')
        },
        {
          'name': 'Washing',
          'time': '17.30',
          'color': '#7c8ce9',
          'completed': false,
          'active': false,
          'navigate': 'PersonalCareScreen',
          'image': require('../Images/Category/personal_care.png')
        },
        {
          'name': 'Dinner',
          'time': '18.30',
          'color': '#f9c117',
          'completed': false,
          'active': false,
          'navigate': 'MealScreen',
          'image': require('../Images/Category/meals.png')
        }
      ]
    },
    {
      title: 'COMPLETED',
      data: [
        {
          'name': 'Breakfast',
          'time': '14.00',
          'color': '#ccc',
          'completed': true,
          'active': false,
          'navigate': '',
          'image': require('../Images/Category/meals.png')
        },
        {
          'name': 'Medication',
          'time': '14.00',
          'color': '#ccc',
          'completed': true,
          'active': false,
          'navigate': '',
          'image': require('../Images/Category/medications.png')
        },
        {
          'name': 'Activity',
          'time': '15.30',
          'color': '#ccc',
          'completed': true,
          'active': false,
          'navigate': '',
          'image': require('../Images/Category/leisure_activities.png')
        },
        {
          'name': 'Washing',
          'time': '17.30',
          'color': '#ccc',
          'completed': true,
          'active': false,
          'navigate': '',
          'image': require('../Images/Category/personal_care.png')
        }
      ]
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
      value: "2",
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
      value: "VEG",
    },
    {
      label: "Pescetarian",
      value: "PES",
    },
    {
      label: "Vegan",
      value: "VEG",
    },
    {
      label: "Halal",
      value: "HAL",
    },
    {
      label: "Glucose intl.",
      value: "GLU",
    },
    {
      label: "Kosher",
      value: "KOS",
    },
    {
      label: "Celiac",
      value: "CEL",
    },
    {
      label: "Other",
      value: "OTH",
    }
  ],
  nutritionChoices: [
    {
      label: "Disphagia diet",
      value: "DISP",
    },
    {
      label: "Soft food diet",
      value: "SOFT",
    },
    {
      label: "Mashed food",
      value: "MASH",
    },
    {
      label: "Cut food in small pcs",
      value: "CUT",
    },
    {
      label: "Other",
      value: "OTH",
    },
  ],
  drinkChoices: [
    {
      label: "Water",
      value: "WATER",
    },
    {
      label: "Vegetable juice",
      value: "VEGE",
    },
    {
      label: "Fruit juice",
      value: "FRUIT",
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
  ],
  optionChoices: [
    {
      label: "Option 1",
      value: "OP1",
    },
    {
      label: "Option 2",
      value: "OP2",
    },
    {
      label: "Option 3",
      value: "OP3",
    },
  ],
  activityTypeChoices: [
    {
      label: "Physical activity",
      value: "PHYSICAL",
    },
    {
      label: "Sensory activity",
      value: "SENSORY",
    },
    {
      label: "Creative activity",
      value: "CREATIVE",
    },
    {
      label: "Mentally stimulating",
      value: "MENTALLY",
    },
    {
      label: "Domestic activity",
      value: "DOMESTIC",
    },
    {
      label: "Leisure activity",
      value: "LEISURE",
    },
  ],
  activityEngagedChoices: [
    {
      label: "Left hand",
      value: "LH",
    },
    {
      label: "Right hand",
      value: "RH",
    },
    {
      label: "Both hands",
      value: "BH",
    },
    {
      label: "Left legs",
      value: "LL",
    },
    {
      label: "Right legs",
      value: "RL",
    },
    {
      label: "Both legs",
      value: "BL",
    },
    {
      label: "Other",
      value: "OTHER",
    },
  ],
  activityTookPlaceChoices: [
    {
      label: "Location A",
      value: 1,
    },
    {
      label: "Location B",
      value: 2,
    },
    {
      label: "Location C",
      value: 3,
    },
    {
      label: "Location D",
      value: 4,
    },
  ],
  healthChoices: [
    {
      label: "Blood test",
      value: "BLOOD_TEST"
    },
    {
      label: "Blood pressure",
      value: "BLOOD_PRESSURE"
    },
    {
      label: "Foot check",
      value: "FOOT"
    },
    {
      label: "BMI",
      value: "BMI"
    },
    {
      label: "Heart rate",
      value: "HEART"
    },
    {
      label: "Temperature",
      value: "TEMP"
    },
    {
      label: "Glucose",
      value: "GLU"
    },
    {
      label: "Seizure chart",
      value: "SEIZ"
    },
    {
      label: "Test result",
      value: "TEST"
    },
    {
      label: "Wounf care",
      value: "WOUND"
    }
  ]
}
