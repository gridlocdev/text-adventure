import Vue from 'vue';
import Vuetify from 'vuetify/lib';


Vue.use(Vuetify);

export default new Vuetify({
    theme: {
        options: { customProperties: true },
        themes: {
            dark: {
                primary: '#1976D2',
                secondary: '#424242',
                accent: '#82B1FF',
                error: '#BB0000',
                info: '#2196F3',
                success: '#4CAF50',
                warning: '#FFC107',
                background: '#121212',
            },
            light: {
                primary: '#1976D2',
                secondary: '#424242',
                accent: '#82B1FF',
                error: '#FF0000',
                info: '#2196F3',
                success: '#4CAF50',
                warning: '#FFC107',
                background: '#EEEEEE',
            },
        }
    }
});

// const vuetify = new Vuetify({
//     theme: {
//         dark:{},
//         light: {
//             primary: '#FFFFF',
//             secondary: '#b0bec5',
//             anchor: '#8c9eff',
//         },
//     },
// })

// export default vuetify

