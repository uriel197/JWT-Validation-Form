class CustomAPIError extends Error {
    constructor(message) {
      super(message)
    }
  }
  
  module.exports = CustomAPIError;

    /******** Comments *********

*** 1: In JavaScript, Error is a built-in object that represents an error that occurs during the execution of a program. It is used to signal that an exceptional condition has occurred, causing the normal flow of the program to be disrupted. The Error object can be extended to create custom error types, as shown in our code.
properties and methods provided by the Error object:

message: A human-readable description of the error.
name: A string representing the name of the error (e.g., "Error", "SyntaxError", "TypeError").
stack: A stack trace that indicates the sequence of function calls that led to the error.

In our code, the CustomAPIError class extends the built-in Error class. It doesn't add any new properties or methods, but it allows you to create instances of errors with a specific name (CustomAPIError) for better identification and handling in our code. We can use this custom error class to throw and catch errors in a way that is more meaningful to our application.

   */