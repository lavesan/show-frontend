import moment from 'moment';

export const cpfReg = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
export const onlyCharReg = /^[a-zA-Z\u00C0-\u00FF ]+$/;
export const onlyNumberReg = /^\d+$/;
export const dateReg = /^\d{2}\/\d{2}\/\d{4}$/;

export const isValidDate = value => {

    const momentDate = moment(value, 'DD/MM/YYYY');

    return momentDate.isBefore(moment())

}