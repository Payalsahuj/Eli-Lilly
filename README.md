# JS-Students-Database-Mock-Server

## Submission Instructions [Please note]

## Maximum Marks - 15

- The Submission should not contain spaces, for example,/js-101 folder/eval will not work
- Do not push node_modules and package_lock.json to GitHub

```
 ✅ Able to submit the app - 1 mark (default score )
 ✅ Should make a GET request  and display UI with initial data - 2 marks
 ✅ Should make POST request on submitting the student details and update UI - 2 marks
 ✅ Should make a PATCH request and Update the score on clicking th update score button - 2 marks
 ✅ Should make DELETE request on clicking remove student button and update UI - 2 marks
 ✅ should sort the students details by score in ascending and descending order (GET request and pass query  params) -  2 marks
 ✅ should filter the score <= 5 marks and  should filter the score >= 5 - 4 marks

```

## Installation

- Use node version(LTS) should be `v16.16.0`
- Don't change/override package.json
- run `npm install --engine-strict` to install the node modules
- please make sure you do not push package-lock.json
- Download and unzip the boilerplate
- Navigate to the correct path

## Folder structure

- index.html
- src
  - scripts
    - index.js
- styles
  - index.css
- README.md
- package.json
- cypress (ignore the files under cypress)

### You haven't taught cypress to run the test cases locally, you can see the passed/ failed test cases and test errors on CP itself.

## Description

- Create an admin dashboard for masai, where user will be adding student data to the database, and can perform basic crud operations.

- All the operations will be performed using json-server.
- You can refer this Documentation: https://www.npmjs.com/package/json-server https://github.com/typicode/json-server
    - how to pass query params for sorting
    - refer this example https://www.npmjs.com/package/json-server#sort
    - how to pass query params for filter
    - example https://www.npmjs.com/package/json-server#operators
- Create an index.html page where user will be able to add the student data and can see and update in real time.

- Provide a `remove` and `update score` button on every student card.
- Remove will remove the student from dom and your json server database as well.
- Update will enable the update input box which will update the score of any student.

- For updating score:-

```
- Provide an input box which will be disabled by default
- Once the user clicks on `update score` button of any user
- The input box will be enabled and the current marks will be present
- Once the user updates the mark and hits `Enter`, the marks should be updated
- Finally, the input box will again be disabled
```

- Provide two buttons for sorting both from high to low and vice versa (based on score).
- Also provide two buttons 'score >= 5" and 'score <= 5" for filtering accordingly.

#### Note:-

- Always store the score as a number not as string. Otherwise, you may face difficulty while sorting and filtering.
- Sorting and filtering will be done using Json-Server only.
- Display score value only, no extra text should be there.
- Please refrain from adding images, as the image links are expired, and this could lead to unexpected behavior if used.

## Requirements

- You should use a JSON server(you need to install npm package by your self)
- Use your **deployed mock-server** link only. and endpoint should be `/masai`; (deploy the data given in the db.json. Note:-only 3 students' data is there.)
- By default when the user loads the page, the user should be shown all students initial data

  ![](https://i.imgur.com/3GAafZq.png)


#### Things to follow :-

```
 1. For adding student details create input boxes will have IDs as "name", "batch", "section", "eval_score" & "image" respectively.   
 2. Create a button with text content "Add Student"  ID :- "add_student".
    - `id` doesn't require any field json-server by default will create id for each entry
    - After entering the details of students if the user clicks on the "Add Student" button then you should make a "POST" request to end point `/masai`. After a successful `POST` request make an appropriate `GET` request to the endpoint `/masai` so that data will be updated on the `DOM`
 3. create a button "Sort Low to High" with ID :- "sort-low-to-high"  ==> On Click it should sort based on `score` in ascending order
 4. create a button "Sort High to Low" ID :- "sort-high-to-low"  ==> On Click it should sort based on `score` in descending order.
 5. create a button "Score > = 5" with ID :-  "greater-than" ==> it should filter results whose score is greater than and equal to 5.
 6. create a button Score < = 5 with ID :- "less-than" ==> it should filter results whose score is less than and equal 5.
 7. The update input box will have ID :- "new_score". (functionality of this is mentioned in 9e)
 8. All the students will be appended inside div with ID :- "container".
 9. Every student card will have class :- "student",
    a. Display the name of the student in the h3 tag.
    b. The score in every card will have class :- "student_score" and use p tag,
         NOTE:- Show only score value in number, no extra text should be there.
    c. Display the batch as `Batch: {batch}` in `p` tag.
    d. Display section in `p` tag
    e. create remove button will have class:- "remove_student", => On clicking this button the student should get removed from the dom. After a successful `DELETE` request make an appropriate `GET` request to update the data in real time.
    f. create update button will have class:- "update_score"==> On clicking this button the update input box(which you need to create) should get updated with the score of the user. Where user can type the correct score and should get updated when clicks enter by making a `PATCH` request and an appropriate `GET` request

```

- you can add styling under the `styles` folder

**Note:- Do not use any other names for the IDs or classes other than those mentioned.**

####

#### General guidelines

- The system on cp.masaischool.com may take between 1-20 minutes to respond,
- so we request you to read the problem carefully and debug it before itself
- we also request you not submit it last minute
- try to keep one submission at a time
