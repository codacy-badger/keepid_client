// import Validations from '../../lib/Validations/Validations';
import {isValidAddress, isValidBirthDate, isValidCity, isValidEmail, isValidOrgWebsite,
    isValidPhoneNumber, isValidUSState, isValidZipCode} from '../../lib/Validations/Validations';

// // const isValidOrgWebsite = require('../../lib/Validations/Validations');
// // const isValidEmail = require('../../lib/Validations/Validations');
// // const isValidPhoneNumber = require('../../lib/Validations/Validations');
// // const isValidZipCode = require('../../lib/Validations/Validations');
// // const isValidUSState = require('../../lib/Validations/Validations');
// // const isValidCity = require('../../lib/Validations/Validations');
// // const isValidAddress = require('../../lib/Validations/Validations');
// // const isValidBirthDate = require('../../lib/Validations/Validations');


test('valid website test',() => {
    expect(isValidOrgWebsite("https://example.com")).toBe(true);
    expect(isValidOrgWebsite("https://www.example.com")).toBe(true);
    expect(isValidOrgWebsite("https://www.example.org/somethinghere")).toBe(true);
    expect(isValidOrgWebsite("")).toBe(false);
    expect(isValidOrgWebsite("not_localhost")).toBe(false);
    expect(isValidOrgWebsite("not a website")).toBe(false);
    expect(isValidOrgWebsite("111.22.1.2")).toBe(false);
    expect(isValidOrgWebsite("    ")).toBe(false);
    expect(isValidOrgWebsite(null)).toBe(false);
})
 
// test('valid email test', () => {
//     expect(isValidEmail("myemail@email.com")).toBe(true);
//     expect(isValidEmail("anotherExample@gmail.com")).toBe(true);
//     expect(isValidEmail("12345@email.org")).toBe(true);
//     expect(isValidEmail("<script>")).toBe(false);
//     expect(isValidEmail("notValidEmail.org")).toBe(false);
//     expect(isValidEmail("email@")).toBe(false);
//     expect(isValidEmail("    ")).toBe(false);
//     expect(isValidEmail("")).toBe(false);
//     expect(isValidEmail(null)).toBe(false);
// })
 
// test('valid phone number test', () => {
//     expect(isValidPhoneNumber("6305264087")).toBe(true);
//     expect(isValidPhoneNumber("(630)111-1111")).toBe(true);
//     expect(isValidPhoneNumber("123-456-7890")).toBe(true);
//     expect(isValidPhoneNumber("1-630-526-4047")).toBe(true);
//     expect(isValidPhoneNumber("(1)-(410)-302-2342")).toBe(true);
//     expect(isValidPhoneNumber("(267)-234-2342")).toBe(true);
//     expect(isValidPhoneNumber("(123)456-7890")).toBe(true);
//     expect(isValidPhoneNumber("(123)4567890")).toBe(true);
//     expect(isValidPhoneNumber("notValidPhoneNumber")).toBe(false);
//     expect(isValidPhoneNumber("222222222222222222")).toBe(false);
//     expect(isValidPhoneNumber("222")).toBe(false);
//     expect(isValidPhoneNumber("    ")).toBe(false);
//     expect(isValidPhoneNumber("")).toBe(false);
//     expect(isValidPhoneNumber(null)).toBe(false);

// })
 
// test('valid zip code test', () => {
//     expect(isValidZipCode("60563")).toBe(true);
//     expect(isValidZipCode("19104")).toBe(true);
//     expect(isValidZipCode("12345-6789")).toBe(true);
//     expect(isValidZipCode("1-6789")).toBe(false);
//     expect(isValidZipCode("hello")).toBe(false);
//     expect(isValidZipCode("<script>")).toBe(false);
//     expect(isValidZipCode("    ")).toBe(false);
//     expect(isValidZipCode("")).toBe(false);
//     expect(isValidZipCode(null)).toBe(false);
// })
 
// test('valid us state test', () => {
//     expect(isValidUSState("IL")).toBe(true);
//     expect(isValidUSState("PA")).toBe(true);
//     expect(isValidUSState("MO")).toBe(true);
//     expect(isValidUSState("OR")).toBe(true);
//     expect(isValidUSState("WA")).toBe(true);
//     expect(isValidUSState("1-6789")).toBe(false);
//     expect(isValidUSState("XJ")).toBe(false);
//     expect(isValidUSState("<script>")).toBe(false);
//     expect(isValidUSState("    ")).toBe(false);
//     expect(isValidUSState("")).toBe(false);
//     expect(isValidUSState(null)).toBe(false);

// })
 
// test('valid city test', () => {
//     expect(isValidCity("Philadelphia")).toBe(true);
//     expect(isValidCity("Chicago")).toBe(true);
//     expect(isValidCity("St. Paul - Minneapolis")).toBe(true);
//     expect(isValidCity("Bird - in - hand")).toBe(true);
//     expect(isValidCity("Cøpenhagen")).toBe(true);
//     expect(isValidCity("High.")).toBe(true);
//     expect(isValidCity("123 street")).toBe(false);
//     expect(isValidCity(" ")).toBe(false);
//     expect(isValidCity(null)).toBe(false);
// })

// test('valid street address test', () => {
//     expect(isValidAddress("Here")).toBe(true);
//     expect(isValidAddress("Baptist Church")).toBe(true);
//     expect(isValidAddress("123 Market, Apt. S3")).toBe(true);
//     expect(isValidAddress("#")).toBe(false);
//     expect(isValidAddress("Text #")).toBe(false);
//     expect(isValidAddress("123,   {")).toBe(false);
//     expect(isValidAddress("hullo#")).toBe(false);
//     expect(isValidAddress(" ")).toBe(false);
//     expect(isValidAddress(null)).toBe(false);
// })

// test('valid birthdate test', () => {
//     expect(isValidBirthDate("12-23-1234")).toBe(true);
//     expect(isValidBirthDate("03-23-2000")).toBe(true);
//     expect(isValidBirthDate("10-01-2019")).toBe(true);
//     expect(isValidBirthDate("10-01-2029")).toBe(false);
//     expect(isValidBirthDate("123-10-1010")).toBe(false);
//     expect(isValidBirthDate("12-123-1233")).toBe(false);
//     expect(isValidBirthDate("12-01-2012as")).toBe(false);
//     expect(isValidBirthDate("hullo")).toBe(false);
//     expect(isValidBirthDate(" ")).toBe(false);
//     expect(isValidBirthDate(null)).toBe(false);
// })