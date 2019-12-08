let params =
    {
        user: {
            validEmail: "student@cdto.ru",
            uppercaseEmail: "STUDENT@cdto.ru",
            firstName: 'Андрей',
            lastName: 'Андреев',
            middleName: 'Андреевич',
            changedLastName: 'Борисов',
            changedFirstName: 'Борис',
            changedMiddleName: 'Борисович'
        },
        nonValidEmail: 'non_valid',
        validPswd: 'qwe123',
        emailDomain: 'dayrep.com',
        validPhone: '+79258487661',
        authorityNames: {
            regional: 'Региональный орган исполнительной власти',
            deliverAuthority: 'Первомаским РОВД'
        },
        gender: {
            male: 'мужской',
            female: 'женский'
        },
        delivery: {
            post: 'По почте',
            personally: 'Лично'
        },
        month: {
            jan: 'Январь',
            oct: 'Октябрь',
            aug: 'Август',
            dec: 'Декабрь'
        },
        passport: {
            series: 1111,
            number: 222222,
            issuedCode: 123456
        },
        educationDoc: {
            series: 3333,
            number: 'abcv333',
            regNumber: '125-gh'
        },
        educationLevels: {
            bachelor: 'Бакалавр'
        }
    };
export default params