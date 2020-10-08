
import moment from 'moment';

const searchForProduct = function (search) {
    return function (x) {

        return x.title.toLowerCase().includes(search.toLowerCase()) || !search;
    }
}

const calculateDate = (num) => {
    console.log(moment().add(num, 'weeks').startOf('isoWeek'))
    let nextWeek = moment().add(num, 'weeks').startOf('isoWeek');
    nextWeek = nextWeek._d
    nextWeek.toDateString();
    return nextWeek
}


export { searchForProduct, calculateDate }