Feature: Create , update, delete and list users

  As an admin
  I want to create , update, delete  and list users

  Scenario: Create user successfully
    Given I send a request to create users endpoint with "John" and "QA"
    When I get the response as "resp"
    Then The response code status is 201
    And In response I can see the name as "John" and job as "QA"
    And Id and createdAt timestamp has been generated

  Scenario: Update user successfully
    Given I send a request to update users endpoint with "John" and "BA"
    When I get the response as "resp"
    Then The response code status is 200
    And In response I can see the name as "John" and job as "BA"
    And The updatedAt timestamp has been generated

  Scenario: Delete user successfully
    Given I send a request to delete users endpoint
    When I get the response as "resp"
    Then The response code status is 204

  Scenario Outline: List all the users in a given page
    Given I send a request to list all the users in <page>
    When I get the response as "resp"
    Then The response code status is 200
    And I can see correct <page_number> in response
    And I can see list of users
    And I can see page details
    And I can see ad details in page

    Examples:
      | page | page_number |
      | 1    | 1           |
      | 2    | 2           |

  Scenario Outline: : List a single user
    Given I send a request to view a user with <userId>
    When I get the response as "resp"
    Then The response code status is 200
    And I can see correct userId <id> in response
    And I can see user details
    And I can see ad details in page

    Examples:
      | userId | id |
      | 1      | 1  |
      | 2      | 2  |