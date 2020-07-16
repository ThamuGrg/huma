Feature: Register user

 As a user
 I want to register

 Scenario: Successful registeration with defined email
  Given I send a request to register endpoint with "eve.holt@reqres.in" and "1234"
  When I get the response as "resp"
  Then The response code status is 200
  And I can see the id and token generated


 Scenario: Unsuccessful registeration with undefined email
  Given I send a request to register endpoint with "undefined@users.com" and "1234"
  When I get the response as "resp"
  Then The response code status is 400
  And I can see the error message

 Scenario Outline: Invalid Registeration
  Given I send a request to register endpoint with "<email>" and "<password>"
  When I get the response as "resp"
  Then The response code status is 400
  And The error message is "<errorMessage>"

  Examples:
   | email        | password | errorMessage              |
   | sydeney@fife |          | Missing password          |
   |              | abcd12   | Missing email or username |
   |              |          | Missing email or username |

