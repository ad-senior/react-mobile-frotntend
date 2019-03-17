import {emptyString} from '../Common/Strings';

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
            label: 'Accidents\n& incidents',
            icon: require('../Images/Category/accidents_incedents.png'),
            color: '#e25b4d',
            plan: 'accidentsincidents'
        },
        {
            id: '1',
            name: 'Health monitoring',
            label: 'Health\nmonitoring',
            icon: require('../Images/Category/health_monitoring.png'),
            color: '#c7db3a',
            plan: 'healthmonitoring'
        },
        {
            id: '2',
            name: 'Personal care',
            label: 'Personal\ncare',
            icon: require('../Images/Category/personal_care.png'),
            color: '#7c8ce9',
            plan: 'personalcare'
        },
        {
            id: '3',
            name: 'Medications',
            label: 'Medications\n\u200A',
            icon: require('../Images/Category/medications.png'),
            color: '#e052e5',
            plan: 'medication'
        },
        {
            id: '4',
            name: 'Meals',
            label: 'Meals\n\u200A',
            icon: require('../Images/Category/meals.png'),
            color: '#f9c117',
            plan: 'meal'
        },
        {
            id: '5',
            name: 'Night checks',
            label: 'Night\nchecks',
            icon: require('../Images/Category/night_checks.png'),
            color: '#366597',
            plan: 'nightcheck'
        },
        {
            id: '6',
            name: 'Contact log',
            label: 'Contact\nlog',
            icon: require('../Images/Category/contacts_log.png'),
            color: '#697574',
            plan: 'contactlog'
        },
        {
            id: '7',
            name: 'Leisure activities',
            label: 'Leisure\nactivities',
            icon: require('../Images/Category/leisure_activities.png'),
            color: '#55b9b2',
            plan: 'leisureactivity'
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
                    'image': require('../Images/Category/meals.png'),
                    'infoScreen': {
                        meal: {
                            label: "Lunch",
                            value: "LH",
                        }
                    }
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
                    'image': require('../Images/Category/meals.png'),
                    'infoScreen': {
                        meal: {
                            label: "Dinner",
                            value: "DN",
                        }
                    }
                }
            ]
        },
        {
            title: 'COMPLETED',
            data: [
                {
                    'name': 'Breakfast',
                    'time': '14.00',
                    'color': '#f9c117',
                    'completed': true,
                    'active': false,
                    'navigate': emptyString,
                    'image': require('../Images/Category/meals.png')
                },
                {
                    'name': 'Medication',
                    'time': '14.00',
                    'color': '#e052e5',
                    'completed': true,
                    'active': false,
                    'navigate': emptyString,
                    'image': require('../Images/Category/medications.png')
                },
                {
                    'name': 'Activity',
                    'time': '15.30',
                    'color': '#55b9b2',
                    'completed': true,
                    'active': false,
                    'navigate': emptyString,
                    'image': require('../Images/Category/leisure_activities.png')
                },
                {
                    'name': 'Washing',
                    'time': '17.30',
                    'color': '#7c8ce9',
                    'completed': true,
                    'active': false,
                    'navigate': emptyString,
                    'image': require('../Images/Category/personal_care.png')
                }
            ]
        },
    ],
    accidentReportChoices: [
        {
            label: "Manager A",
            value: "MA",
        },
        {
            label: "Manager B",
            value: "MB",
        },
        {
            label: "Manager C",
            value: "MC",
        },
        {
            label: "Manager D",
            value: "MD",
        },
        {
            label: "Other",
            value: "OTH",
        },
    ],
    medicationChoices: [
        {
            label: 'Medication',
        },
        {
            label: 'Medication 1',
        }
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
        },
        {
            label: "Other",
            value: "OTH",
        },
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
            value: "OTH",
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
        {
            label: "Other",
            value: "3",
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
        },
        {
            label: "Other",
            value: "OTH",
        },
    ],
    suChoices: [
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
        },
        {
            label: "Other",
            value: "OTH",
        },
    ],
    contactLogChoices: [
        {
            label: "Visit received",
            value: "VR",
            text: "Visit was received"
        },
        {
            label: "SU visited",
            value: "SUV",
            text: "SU visited"
        },
    ],
    healthBMIChoices: [
        {
            id: '0',
            label: "Imperial",
            value: "I",
        },
        {
            id: '1',
            label: "Metric",
            value: "M",
        },
    ],

    careProvideChoices: [
        {
            label: "Oral Care",
            value: "OC",
        },
        {
            label: "Washing",
            value: "WS",
        },
        {
            label: "Dressing",
            value: "DR",
        },
        {
            label: "Toileting",
            value: "TL",
        },
    ],
    nightCheckChoices: [
        {
            label: "Going to bed",
            value: "GB",
        },
        {
            label: "Night check",
            value: "NC",
        },
    ],
    dosageTaken: [
        {
            label: "As Per MAR chart",
            value: "AS_PER_MAR_CHART",
        },
        {
            label: "Other",
            value: "OTH",
        },
    ],
    seizureAssistanceSought: [
        {value: true, label: "Y"},
        {value: false, label: "N"},
    ],
    assistanceChoices: [
        {
            label: "full support",
            value: "FULL_SUPPORT",
        },
        {
            label: "minimal support",
            value: "MIN_SUPPORT",
        },
        {
            label: "prompts",
            value: "PROMPTS",
        },
        {
            label: "no support",
            value: "NO_SUPPORT",
        },
    ],
    assistanceOralCareChoices: [
        {
            label: "Full support",
            value: "FULL_SUPPORT",
        },
        {
            label: "Minimal support",
            value: "MIN_SUPPORT",
        },
        {
            label: "Prompts",
            value: "PROMPTS",
        },
        {
            label: "Loading toothbrush",
            value: "LOADING_TOOTHBRUSH",
        },
    ],
    assistanceWashingChoices: [
        {
            label: "Full support",
            value: "PC",
        },
        {
            label: "Minimal support",
            value: "WS",
        },
        {
            label: "Prompts",
            value: "DR",
        },
    ],
    assistanceDryChoices: [
        {
            label: "Full support",
            value: "PC",
        },
        {
            label: "Minimal support",
            value: "WS",
        },
        {
            label: "Prompts",
            value: "DR",
        },
    ],
    assistanceDressingChoices: [
        {
            label: "Full support",
            value: "FULL_SUPPORT",
        },
        {
            label: "Minimal support",
            value: "MIN_SUPPORT",
        },
        {
            label: "Prompts, weather guidance",
            value: "PROMPTS_WEATHER_GUIDENCE",
        },
    ],
    cleanerChoices: [
        {
            label: "sponge",
            value: "SPONGE",
        },
        {
            label: "flannel",
            value: "FLANNEL",
        },
        {
            label: "Shower gel",
            value: "SHOWER_GEL",
        },
        {
            label: "Soap",
            value: "SOAP",
        },
        {
            label: "Other",
            value: "OTH",
        },
    ],
    bodyCareChoices: [
        {
            label: "Shower",
            value: "SHOWER",
        },
        {
            label: "body wash",
            value: "BODY_WASH",
        },
        {
            label: "bath",
            value: "BATH",
        },
        {
            label: "Bed Bath",
            value: "BED_BATH",
        },
    ],
    suClothingChoices: [
        {
            label: "Service User",
            value: "SU",
        },
        {
            label: "Support Worker",
            value: "SW",
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
            value: "OTH",
        },
    ],
    booleanChoices: [
        {
            label: "Yes",
            value: "YES",
        },
        {
            label: "No",
            value: "NO",
        }
    ],
    washEquipmentChoices: [
        {
            label: "hoist",
            value: 'HOIST',
        },
        {
            label: "slide sheet",
            value: 'SLIDE_SHEET',
        },
        {
            label: "grab rail",
            value: 'GRAB_RAIL',
        },
        {
            label: "shower chair",
            value: 'SHOWER_CHAIR',
        },
        {
            label: "bath seat",
            value: 'BATH_SEAT',
        },
        {
            label: "banana board",
            value: 'BANANA_BOARD',
        },
        {
            label: "other",
            value: 'OTH',
        },
        {
            label: "non slip mat",
            value: 'NON_SLIP_MAT',
        },
    ],
    toiletEquipmentChoices: [
        {
            label: "hoist",
            value: 'HOIST',
        },
        {
            label: "slide sheet",
            value: 'SLIDE_SHEET',
        },
        {
            label: "grab rail",
            value: 'GRAB_RAIL',
        },
        {
            label: "commode",
            value: 'COMMODE',
        },
        {
            label: "incontinence pad",
            value: 'INCONTINENCE_PAD',
        },
        {
            label: "wipes",
            value: 'WIPES',
        },
        {
            label: "sanitary pad",
            value: 'SANITARY_PAD',
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
        {
            label: "Other",
            value: 4,
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
        {
            label: "Other",
            value: "OTH",
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
        {
            label: "Other",
            value: "OTH",
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
        {
            label: "Other",
            value: "OTH",
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
            value: "OTH",
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
        {
            label: "Other",
            value: 0,
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
            label: "Wound care",
            value: "WOUND"
        },
        {
            label: "Other",
            value: "OTH",
        },
    ],
    seizureTypes: [
        {
            label: "Generalized seizures",
            value: "Generalized seizures"
        },
        {
            label: "Absence seizures",
            value: "Absence seizures"
        },
        {
            label: "Myoclonic seizures",
            value: "Myoclonic seizures"
        },
        {
            label: "Clonic seizures",
            value: "Clonic seizures"
        },
        {
            label: "Tonic seizures",
            value: "Tonic seizures"
        },
        {
            label: "Atonic seizures",
            value: "Atonic seizures"
        },
        {
            label: "Partial seizures",
            value: "Partial seizures"
        },
        {
            label: "Simple partial seizures",
            value: "Simple partial seizures"
        },
        {
            label: "Complex partial seizures",
            value: "Complex partial seizures"
        },
        {
            label: "Focal seizures",
            value: "Focal seizures"
        }
    ]
};
