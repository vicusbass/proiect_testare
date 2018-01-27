const faker = require('faker')

// Suita de teste va verifica functionalitati specifice userilor

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

describe('User scenarios', function () {
    context('Login page', function () {
        beforeEach(function () {
            //open initial page
            cy.visit(LOGIN_URL)
            //validate page title
            cy.title().should('be', 'Login')
            cy.contains('Sign up now')
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

    })

    context('Registration page', function () {
        beforeEach(function () {
            //open registration page
            cy.visit(LOGIN_URL)
            cy.contains('Sign up now').click()
        })

        it('should validate input fields', function () {
            //validate url and page title
            cy.title().should('be', 'My Library')
            cy.url(REGISTER_URL)
            cy.contains('Please fill in your new account details')
            cy.get(INPUT_SUBMIT).click()
            cy.contains('Please enter an email.')
            cy.contains('Please add first name.')
            cy.contains('Please add last name.')
            cy.contains('Please enter a password.')
            cy.contains('Please confirm password.')
        })

        it('should reset form fields', function () {
            //validate url
            cy.url(REGISTER_URL)
            //type values in every input fields
            cy.get(INPUT_EMAIL).type("fake")
            cy.get(INPUT_FIRST_NAME).type("fake")
            cy.get(INPUT_LAST_NAME).type("fake")
            cy.get(INPUT_PASSWORD).type("fake")
            cy.get(INPUT_PASSWORD).type("fake")
            //click Reset
            cy.get(INPUT_RESET).click()
            //all input fields should be empty
            cy.get(INPUT_EMAIL).should('have.value', '')
            cy.get(INPUT_FIRST_NAME).should('have.value', '')
            cy.get(INPUT_LAST_NAME).should('have.value', '')
            cy.get(INPUT_PASSWORD).should('have.value', '')
            cy.get(INPUT_PASSWORD).should('have.value', '')
        })

        it('should create account', function () {
            //validate url
            cy.url(REGISTER_URL)
            //generate user details
            const firstname = faker.name.firstName()
            const lastname = faker.name.lastName()
            const email = firstname + '.' + lastname + faker.random.number() + '@my.library'
            //type values in every input fields
            cy.get(INPUT_EMAIL).type(email)
            cy.get(INPUT_FIRST_NAME).type(firstname)
            cy.get(INPUT_LAST_NAME).type(lastname)
            cy.get(INPUT_PASSWORD).type("secret")
            cy.get(INPUT_CONFIRM_PASSWORD).type("secret")
            //click Submit
            cy.get(INPUT_SUBMIT).click()
            //should be redirected to login page
            cy.url(LOGIN_URL)
        })

    })

    context('User dashboard', function () {
        const firstname = faker.name.firstName()
        const lastname = faker.name.lastName()
        const email = firstname + '.' + lastname + faker.random.number() + '@my.library'

        before(function () {
            //open registration page
            cy.visit(REGISTER_URL)

            //type values in every input fields
            cy.get(INPUT_EMAIL).type(email)
            cy.get(INPUT_FIRST_NAME).type(firstname)
            cy.get(INPUT_LAST_NAME).type(lastname)
            cy.get(INPUT_PASSWORD).type('secret')
            cy.get(INPUT_CONFIRM_PASSWORD).type('secret')
            //click Submit
            cy.get(INPUT_SUBMIT).click()
            //should be redirected to login page
            cy.url(LOGIN_URL)
        })

        beforeEach(function () {
            cy.visit(LOGIN_URL)
            cy.get(INPUT_EMAIL).type(email)
            cy.get(INPUT_PASSWORD).type('secret')
            cy.get(INPUT_SUBMIT).click()
            cy.url(ROOT_URL + '/index.php')
            cy.get('h1').contains('Hi, ' + firstname + ' ' + lastname)
        })

        it('should find book by partial title', function () {
            cy.contains('Search book').click()
            cy.url(ROOT_URL + '/searchbook.php')
            cy.get(INPUT_TITLE).type('Middle')
            cy.get('button[name="searchBook"]').click()
            //should clean search terms
            cy.get(INPUT_TITLE).should('have.value', '')
            //should see only one book in the table
            cy.get('tbody > tr').should('have.length', 1)
            cy.get('tbody > tr > td').first().contains('Middlesex')
            cy.get('tbody > tr > td').eq(1).contains('Jeffrey Eugenides')
            cy.get('tbody > tr > td').eq(2).contains('2002')
            cy.get('tbody > tr > td').eq(3).contains('0312422156')
        })

        it('should find book by partial name of author', function () {
            cy.contains('Search book').click()
            cy.url(ROOT_URL + '/searchbook.php')
            cy.get('input#authors').type('Eugenides')
            cy.get('button[name="searchBook"]').click()
            //should clean search terms
            cy.get('input#authors').should('have.value', '')
            //should see only one book in the table
            cy.get('tbody > tr').should('have.length', 1)
            cy.get('tbody > tr > td').first().contains('Middlesex')
            cy.get('tbody > tr > td').eq(1).contains('Jeffrey Eugenides')
            cy.get('tbody > tr > td').eq(2).contains('2002')
            cy.get('tbody > tr > td').eq(3).contains('0312422156')
        })

        it('should find book by ISBN', function () {
            cy.contains('Search book').click()
            cy.url(ROOT_URL + '/searchbook.php')
            cy.get('input#isbn').type('0312422156')
            cy.get('button[name="searchBook"]').click()
            //should clean search terms
            cy.get('input#isbn').should('have.value', '')
            //should see only one book in the table
            cy.get('tbody > tr').should('have.length', 1)
            cy.get('tbody > tr > td').first().contains('Middlesex')
            cy.get('tbody > tr > td').eq(1).contains('Jeffrey Eugenides')
            cy.get('tbody > tr > td').eq(2).contains('2002')
            cy.get('tbody > tr > td').eq(3).contains('0312422156')
        })

    })
})