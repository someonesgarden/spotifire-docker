import axios from 'axios';

export default{

    computed:{

    },

    methods: {
        // sort an array by key and order
        sortList( list, param, order ) {
            return list.sort( ( a, b ) => {
                if ( a.hasOwnProperty( param ) && b.hasOwnProperty( param ) ) {
                    let _a = a[ param ];
                    let _b = b[ param ];

                    _a = ( typeof _a === 'string' ) ? _a.toUpperCase() : _a;
                    _b = ( typeof _b === 'string' ) ? _b.toUpperCase() : _b;

                    if ( order === 'asc' ) {
                        if ( _a < _b ) return -1;
                        if ( _a > _b ) return 1;
                    }
                    if ( order === 'desc' ) {
                        if ( _a > _b ) return -1;
                        if ( _a < _b ) return 1;
                    }
                }
                return 0;
            });
        },

        isString(obj) {
            return typeof (obj) == "string" || obj instanceof String;
        },
    }
}
