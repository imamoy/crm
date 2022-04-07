import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';

Vue.use(Vuetify);

export default new Vuetify({
    theme: {
        themes: {
            light: {
                primary: '#518BF2',
                secondary: '#1C1E4F',
                success: '#00AA60',
                error: '#F05975',
                aliceBlue: '#F1F6FF',
                green: '#00AA60',
                red: '#F05975',
                gary: '#808080',
                lightGary: '#BEBEBE',
                orange: '#F2A041',
                purple: '#7B68EE',
                white: '#FFFFFF',
                cancel: '#808080',
            },
            dark: {
                primary: '#518BF2',
                secondary: '#1C1E4F',
                success: '#00AA60',
                error: '#F05975',
                aliceBlue: '#F1F6FF',
                green: '#00AA60',
                red: '#F05975',
                gary: '#808080',
                lightGary: '#BEBEBE',
                orange: '#F2A041',
                purple: '#7B68EE',
                white: '#FFFFFF',
                cancel: '#808080',
            },
        },
    },
});
