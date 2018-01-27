// Suita de teste va verifica functionalitati specifice administratorilor

//SELECTORS
const INPUT_EMAIL = 'input[name="email"]'
const INPUT_PASSWORD = 'input[name="password"]'
const INPUT_CONFIRM_PASSWORD = 'input[name="confirm_password"]'
const INPUT_FIRST_NAME = 'input[name="first_name"]'
const INPUT_LAST_NAME = 'input[name="last_name"]'
const INPUT_SUBMIT = 'input[type="submit"]'
const INPUT_RESET = 'input[type="reset"]'
const INPUT_TITLE = 'input[name="title"]'
//URLs
const ROOT_URL = 'http://mylibrary.test/src'
const LOGIN_URL = ROOT_URL + '/login.php'
const REGISTER_URL = ROOT_URL + '/register.php'
//credentials
const ADMIN_EMAIL = 'admin@my.library'
const ADMIN_PASSWORD = 'secret'

describe('Administrator scenarios', function () {
    context('Login page', function () {
        beforeEach(function () {
            //open initial page
            cy.visit(LOGIN_URL)
            //validate page title
            cy.title().should('be', 'Login')
            cy.contains('Sign up now')
        })

        it('should redirect to Admin dashboard', function () {
            cy.get(INPUT_EMAIL).type(ADMIN_EMAIL)
            cy.get(INPUT_PASSWORD).type(ADMIN_PASSWORD)
            cy.get(INPUT_SUBMIT).click()
            //should redirect to Admin dashboard
            cy.url(ROOT_URL + '/admin/index.php')
        })

    })

    context('Administrator dashboard', function () {

        beforeEach(function () {
            cy.visit(LOGIN_URL)
            cy.get(INPUT_EMAIL).type(ADMIN_EMAIL)
            cy.get(INPUT_PASSWORD).type(ADMIN_PASSWORD)
            cy.get(INPUT_SUBMIT).click()
            cy.url(ROOT_URL + '/admin/index.php')
        })

        it('should add new rental', function () {
            cy.get('a[href="duebooks.php"]').click()
            cy.url(ROOT_URL + '/duebooks.php')
            cy.contains('Add book').click()

            //form should be visible
            cy.get('input#title').should('be.visible')
        })

    })
})