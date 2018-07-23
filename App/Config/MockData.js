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
      name: 'Accidents & incidents',
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
    '1': 'NotFound404',
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
  ],
  optionChoices: [
    {
      label: "Option 1",
      value: "1",
    },
    {
      label: "Option 2",
      value: "2",
    },
    {
      label: "Option 3",
      value: "3",
    },
  ]
}
