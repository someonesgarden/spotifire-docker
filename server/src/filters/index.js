import Vue from 'vue'
import moment from 'moment'


//Filter
Vue.filter('listdate', time => moment(time).format('MMMM Do YYYY'));
Vue.filter('date2', time => moment(time).format('MMM.YYYY'));
Vue.filter('date', time => moment(time).format('DD/MM/YY, HH:mm'));
Vue.filter('year', time => moment(time).format('YYYY'));
Vue.filter('month', time => moment(time).format('M'));
Vue.filter('m4', time => moment(time).format('MMMM'));
Vue.filter('date', time => moment(time).format('D'));
Vue.filter('d2', time => moment(time).format('DD'));
Vue.filter('fancyTimeFormat', s=> (s - (s %= 60)) / 60 + (9 < s ? ":" : ":0") + s);

Vue.filter( 'toCommas', ( num, decimals ) => {
    let o = { style: 'decimal', minimumFractionDigits: decimals, maximumFractionDigits: decimals };
    return new Intl.NumberFormat( 'en-US', o ).format( num );
});
Vue.filter( 'toSpaces', ( str ) => {
    return String( str || '' ).trim().replace( /[^\w\`\'\-]+/g, ' ' ).trim();
});
Vue.filter( 'toText', ( str, def ) => {
    str = String( str || '' ).replace( /[^\w\`\'\-\.\!\?]+/g, ' ' ).trim();
    return str || String( def || '' );
});

Vue.filter('truncate', function(value) {

    let str = value.replace(/<("[^"]*"|'[^']*'|[^'">])*>/g,'');

    //var length = length ? parseInt(length, 10) : 20;
   let length = 220;
   let ommision = '...';

    if(str.length <= length) {
        return str;
    }
    else {
        return str.substring(0, length) + ommision;
    }
});
