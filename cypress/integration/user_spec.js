// Suita de teste va verifica functionalitati specifice userilor

//SELECTORS
const INPUT_EMAIL = 'input[name="email"]'
const INPUT_PASSWORD = 'input[name="password"]'
const INPUT_SUBMIT = 'input[type="submit"]'
const ROOT_URL = 'http://mylibrary.test/src'
const LOGIN_URL = ROOT_URL + 'login.php'
const REGISTER_URL = ROOT_URL + 'register.php'

describe('Authentication scenarios', function () {
    context('Login page', function () {
        beforeEach(function () {
            //open initial page
            cy.visit(LOGIN_URL)
            //validate page title
            cy.title().should('be', 'Login')
        })

        it('should reject missing entries in login form', function () {
            cy.get(INPUT_SUBMIT).click()
            //validate error message on email field
            cy.get('.form-group').first().contains('Please enter your email.')
            //validate error message on password field
            cy.get('.form-group').first().next().contains('Please enter your password.')
            //url should not be changed
            cy.url(LOGIN_URL)
        })

        it('should register new user', function () {
            cy.contains('Sign up now').click()
            cy.url(REGISTER_URL)
        })

    })
})