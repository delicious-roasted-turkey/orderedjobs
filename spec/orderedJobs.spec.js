const orderJobs = require("../lib/orderedJobs.js").orderJobs;

describe("orderJobs", function(){

  it("exists", function(){
    expect(orderJobs).toBeDefined();
  });

  it("is a function", function(){
    expect(typeof orderJobs).toEqual("function");
  });

  describe("the output", function(){

    it("is a string", function(){
      forAllValidInputs(function(input, output){
        return ((typeof output) === "string");
      });
    });

    it("contains all the letters in the input", function(){
      forAllValidInputs(function(input, output){
        const letters = input.split("").filter(function(ch){
          return isALetter(ch);
        });
        return letters.every(function(letter){
          return (output.indexOf(letter) !== -1);
        });
      });
    });

  });

  function forAllValidInputs(predicate){
    const predicateHolds = allValidInputs().every(function(input){
      const output = orderJobs(input);
      return predicate(input, output);
    });
    expect(predicateHolds).toBe(true);
  }

  function allValidInputs(){
    return [

      "",

      "a =>",

      "a =>\n" +
      "b =>\n" +
      "c =>",

      "a =>\n" +
      "b => c\n" +
      "c =>",

      "a =>\n" +
      "b => c\n" +
      "c => f\n" +
      "d => a\n" +
      "e => b\n" +
      "f =>"

    ]
  }

  function isALetter(ch){
    return ch.charCodeAt(0) >= "a".charCodeAt(0)
          && ch.charCodeAt(0) <= "z".charCodeAt(0);
  }

});


