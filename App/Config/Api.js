//const BASE_URL = 'https://pegasus.moharadev.com/api';
const BASE_URL = 'https://pegasus-dev.bloomsupport.co/api';
//const BASE_URL = 'http://localhost:8000/api';
const endpoint = () => ({
    TOKEN: '/token/',
    REFRESH_TOKEN: '/token/refresh/',
    SERVICE_USER: '/serviceuser/',
    PERSONAL_CARE: '/personal-care/',
    MEAL: '/meal/',
    MEAL_MENU: '/meal-menu/',
    MOOD: '/mood/',
    ACCIDENT: '/accident/',
    ACTIVITY: '/leisure-activity/',
    CONTACT_LOG: '/contact-log/',
    HEALTH: '/health-monitoring/',
    NIGHT_CHECK: '/night-check/',
    MEDICATION: '/medication/',
    CAREPLAN: '/careplan/',
    CALENDAR:  '/calendarnotes/',
    BUISNESS_ACCOUNT: `${BASE_URL}/account/`,
    PAST_NOTES: '/past-notes/'
});

export default {
    PATH: endpoint(),
};
