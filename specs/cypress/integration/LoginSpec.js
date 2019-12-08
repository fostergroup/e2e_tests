import LoginActions from '../src/actions/LoginActions.js';
import {checkModalError, submit} from '../src/actions/CommonElementsActions.js';
import params from '../src/utils/params.js';
import titles from '../src/utils/titles.js';
import urls from '../src/utils/urls.js';

let loginact = new LoginActions();
describe('Login spec', () => {
    it('Login with invalid email', () => {
        cy.visit(urls.login, {timeout: 100000});
        loginact.fillFields(params.nonValidEmail, params.validPswd);
        submit(true);
        checkModalError(titles.invalidError);
    });
    it('Login with valid email and pswd', () => {
        //click on repeat:
        loginact.repeat(urls.login);
        loginact.fillFields(params.user.validEmail, params.validPswd);
        submit(true);
    });
});