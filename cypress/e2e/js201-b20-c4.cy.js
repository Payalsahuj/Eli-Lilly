import data from "../../submissionData.json"; // do not create this file
// let data = [{ submission_link: "http://localhost:8080", id: 67890 }];
import sortAscData from "../fixtures/sortDataLowToHigh.json";
import sortDescData from "../fixtures/sortDataHighToLow.json";
import aboveFiveData from "../fixtures/greaterThanEqualFive.json";
import lessThanEqualFive from "../fixtures/lestThanEqualFive.json";

let mock = [
  {
    id: "1",
    name: "Saini",
    batch: "Phoenix",
    section: "C",
    score: 8,
    image:
      "https://allworldpm.com/wp-content/uploads/2016/10/230x230-avatar-dummy-profile-pic.jpg",
  },
  {
    id: "2",
    name: "Pavan",
    batch: "Ninja",
    section: "A",
    score: 3,
    image:
      "https://allworldpm.com/wp-content/uploads/2016/10/230x230-avatar-dummy-profile-pic.jpg",
  },
  {
    id: "3",
    name: "Praveen",
    batch: "Samurai",
    section: "B",
    score: 5,
    image:
      "https://allworldpm.com/wp-content/uploads/2016/10/230x230-avatar-dummy-profile-pic.jpg",
  },
];

describe("Test", () => {
  let acc_score = 1;
  beforeEach(() => {
    Cypress.on("uncaught:exception", (err, runnable) => {
      return false;
    });
  });

  data.map(({ submission_link: url, id }) => {
    if (url.charAt(url.length - 1) != "/") {
      url = url + "/";
    }

    it(`Should make GET request  and display initial data
            1.The initial number of students should be 3
            2. Each student card should have classname as "student" and display name score batch and section`, () => {
      cy.visit(url);
      cy.intercept("GET", "**/masai", mock);

      cy.wait(2000);
      cy.get("#container").children().should("have.length", 3);
      cy.get("#container")
        .children()
        .each((ele, index) => {
          expect(ele).to.have.class("student");
          expect(ele.text()).includes(mock[index].name);
          expect(ele.text()).includes(mock[index].score);
          expect(ele.text()).includes(mock[index].batch);
          expect(ele.text()).includes(mock[index].section);
        });
      cy.then(() => {
        acc_score += 2;
      });
    });
    it(`Should make POST request on submitting the student details
            1.should be able to post the following data 
            {
              "name": "Amal",
              "batch": "Samurai",
              "section": "C",
              "score": 7,
              "image": "https://allworldpm.com/wp-content/uploads/2016/10/230x230-avatar-dummy-profile-pic.jpg"
            }
            2.After succesful post request the no of student records should be 4
            `, () => {
      cy.intercept("GET", "**/masai", { fixture: "postStudents.json" }).as(
        "getStudents"
      );

      cy.intercept("POST", "**/masai", (req) => {
        console.log(req);
        req.reply({ fixture: "postOneStudent.json", delay: 500 });
      }).as("postStudents");
      cy.visit(url);
      cy.get("#name").type("Amal");
      cy.get("#batch").type("Samurai");
      cy.get("#section").type("C");
      cy.get("#eval_score").type(7);
      cy.get("#image").type(
        "https://allworldpm.com/wp-content/uploads/2016/10/230x230-avatar-dummy-profile-pic.jpg"
      );
      cy.get("#add_student").click();
      cy.wait("@postStudents");
      cy.wait("@getStudents").then(() => {
        cy.get("#container").children().should("have.length", 4);
      });
      cy.then(() => {
        acc_score += 2;
      });
    });

    it(`Should make A PATCH request to update the score
            1. onclicking the update score button  of first student the update score input should be enabled and update the  score on enter
            2. the new score should be updated on UI `, () => {
      cy.intercept("GET", "**/masai", { fixture: "updateScore.json" }).as(
        "getStudents"
      );
      let prevData = {
        id: "1",
        name: "Saini",
        batch: "Phoenix",
        section: "C",
        score: 6,
        image:
          "https://allworldpm.com/wp-content/uploads/2016/10/230x230-avatar-dummy-profile-pic.jpg",
      };
      cy.intercept("PATCH", "**/masai/**", (req) => {
        expect(req.method).to.equal("PATCH");
        req.reply({ ...prevData, score: 6 });
      }).as("patchStudentScore");
      cy.visit(url);
      cy.get(".update_score").eq(0).click();
      cy.get;
      cy.get("#new_score").clear().type("6{enter}");
      cy.wait("@patchStudentScore");
      cy.wait("@getStudents").then((interception) => {
        let body = interception.response.body;
        cy.get("#container")
          .children()
          .each((ele, index) => {
            expect(ele.text()).includes(body[index].name);
            expect(ele.text()).includes(body[index].score);
          });
      });
      cy.then(() => {
        acc_score += 2;
      });
    });

    it(`Should delete a student record (DELETE)
          1.Onclicking the remove student button DELETE request should be sent and the  student should be removed from the UI  `, () => {
      cy.intercept("GET", "**/masai", { fixture: "afterDeleteData.json" }).as(
        "getStudents"
      );

      cy.intercept("DELETE", "**/masai/**", (req) => {
        expect(req.method).to.equal("DELETE");
        req.reply({}, { status: 200 });
      }).as("deleteStudent");
      cy.visit(url);
      cy.get(".remove_student").eq(0).click();
      cy.wait("@deleteStudent");
      cy.get("@getStudents").then((interception) => {
        console.log(interception);
        let body = interception.response.body;
        console.log(body);
        cy.get("#container").children().should("have.length", body.length);
      });
      cy.then(() => {
        acc_score += 2;
      });
    });

    it("Should sort the students score by ascending and descinding order", () => {
      cy.intercept("GET", "**/masai?**", (req) => {
        req.reply(sortAscData);
      }).as("getAscStudents");
      cy.get("#sort-low-to-high").click();
      cy.wait("@getAscStudents").then((interception) => {
        let body = interception.response.body;
        console.log(body, "body");
        cy.get("#container").children().should("have.length", 3);
        cy.get("#container")
          .children()
          .each((ele, index) => {
            expect(ele.text()).includes(body[index].name);
            expect(ele.text()).includes(body[index].score);
            expect(ele.text()).includes(body[index].section);
            expect(ele.text()).includes(body[index].batch);
          });
      });
      cy.intercept("GET", "**/masai?**", (req) => {
        req.reply(sortDescData);
      }).as("getDescStudents");
      cy.get("#sort-high-to-low").click();
      cy.wait("@getDescStudents").then((interception) => {
        let body = interception.response.body;
        console.log(body, "body");
        cy.get("#container").children().should("have.length", 3);
        cy.get("#container")
          .children()
          .each((ele, index) => {
            expect(ele.text()).includes(body[index].name);
            expect(ele.text()).includes(body[index].score);
            expect(ele.text()).includes(body[index].section);
            expect(ele.text()).includes(body[index].batch);
          });
        cy.get("#sort-high-to-low").click();
      });
      cy.then(() => {
        acc_score += 2;
      });
    });
    it("Should filter the students score <=5 and >=5 ", () => {
      cy.intercept("GET", "**/masai?**", (req) => {
        req.reply(aboveFiveData);
      }).as("getStudentsGreaterThanEqual5");
      cy.get("#greater-than").click();
      cy.wait("@getStudentsGreaterThanEqual5").then((interception) => {
        let body = interception.response.body;
        console.log(body, "body");
        cy.get("#container").children().should("have.length", 2);
      });
      cy.then(() => {
        acc_score += 2;
      });
      cy.intercept("GET", "**/masai?**", (req) => {
        req.reply(lessThanEqualFive);
      }).as("getLessThanEqual5");
      cy.get("#less-than").click();
      cy.wait("@getLessThanEqual5").then((interception) => {
        let body = interception.response.body;
        console.log(body, "body");
        cy.get("#container").children().should("have.length", 2);
      });
      cy.then(() => {
        acc_score += 2;
      });
    });
    it(`generate score`, () => {
      //////////////
      console.log(acc_score);
      let result = {
        id,
        marks: Math.floor(acc_score),
      };
      result = JSON.stringify(result);
      cy.writeFile("results.json", `\n${result},`, { flag: "a+" }, (err) => {
        if (err) {
          console.error(err);
        }
      });
      //////////////////
    });
  });
});
