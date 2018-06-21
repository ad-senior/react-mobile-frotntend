export default {
  moods: [
    {   
      id: '0',
      name: 'Happy',
      image: require('../Images/default/like-2.png'),
    },  
    {   
      id: '1',
      name: 'Delighted',
      image: require('../Images/default/like-2.png'),
    },  
    {   
      id: '2',
      name: 'Content',
      image: require('../Images/default/like-2.png'),
    },  
    {   
      id: '3',
      name: 'Excited',
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
  ]
}
