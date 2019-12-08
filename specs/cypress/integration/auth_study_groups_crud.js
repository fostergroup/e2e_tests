var authKey = "";
const randomId = Cypress._.random(0, 10000);

describe('Auth test.', function () {
    it('manager successfully authorized', function () {
        cy.request('POST',
            'api/v1/user/auth',
            {
                "email": "manager@cdto.ru",
                "password": "qwe123",
                "rememberMe": true
            })
            .then(cr => {
                expect(cr).ok;
                expect(cr.body).not.empty;
                authKey = cr.body.result.authToken;
                expect(authKey, 'auth is empty').to.be.not.empty;
            });
    });
});

describe('Study groups CRUD tests.', function () {
    var createdID = 0;
    it('Create', function () {
        cy.request({
            method: 'POST',
            url: 'api/v1/study-groups',
            headers: {
                'Cookie': `session=${authKey}`,
            },
            body: {
                "syllabusID": 1,
                "managerID": 12,
                "caption": "Учебная группа " + randomId.toString(),
                "startDate": "2019-05-01T00:00:00Z",
                "finishDate": "2020-11-01T00:00:00Z"
            },
        }).then(resp => {
            expect(resp).ok;
            expect(resp.body.result).gt(0);
            createdID = resp.body.result;
        });
    });

    it('Read', function () {
        cy.request({
            method: 'GET',
            url: `api/v1/study-groups/by-id/${createdID}`,
            headers: {
                'Cookie': `session=${authKey}`,
            },
        })
            .its('body.result')
            .then(sg =>
                expect(sg).to.have.all.keys('id', 'caption', 'syllabusId', 'syllabusCaption', 'isCompleted',
                    'syllabusLengthDays', 'managerID', 'startDate', 'finishDate', 'isActive', 'studentsCount',
                    'workgroupsCount'));
    });

    it('Update', function () {
        cy.request({
            method: 'PUT',
            url: `api/v1/study-groups/${createdID}`,
            headers: {
                'Cookie': `session=${authKey}`,
            },
            body: {
                "syllabusID": 1,
                "managerID": 12,
                "caption": "Новое название группы",
                "startDate": "2019-04-24T00:00:00Z",
                "finishDate": "2019-07-26T00:00:00Z"
            },
        })
            .its('body.result')
            .should('eq', 'ok');
    });

    it('Delete', function () {
        cy.request({
            method: 'DELETE',
            url: `api/v1/study-groups/by-id/${createdID}`,
            headers: {
                'Cookie': `session=${authKey}`,
            },
        }).its('body.result')
            .should('eq', 'ok');
    });

});