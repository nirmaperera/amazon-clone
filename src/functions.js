
import moment from 'moment';

const searchForProduct = function (search) {
    return function (x) {
        return x.title.toLowerCase().includes(search.toLowerCase()) || !search;
    }
}

const calculateDate = (num) => {
    return moment(moment().add(num, 'd'))
}


export { searchForProduct, calculateDate }