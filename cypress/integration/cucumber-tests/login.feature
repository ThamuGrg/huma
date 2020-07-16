Feature: Login to Application

 As a user
 I want to login in to the application

 Scenario: Valid login
  Given I send a request to login endpoint with "eve.holt@reqres.in" and "cityslicka"
  When I get the response as "resp"
  Then The response code status is 200
  And In response I can see the token code generated

 Scenario Outline: Invalid login
  Given I send a request to login endpoint with "<email>" and "<password>"
  When I get the response as "resp"
  Then The response code status is 400
  And In response I can see the error message "<error>"

  Examples:
   | email              | password         | error                     |
   | invalid email      | invalid password | user not found            |
   |                    | cityslicka       | Missing email or username |
   |                    |                  | Missing email or username |
   | eve.holt@reqres.in |                  | Missing password          |

