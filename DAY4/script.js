/***********************
 Section 1 — Variables & Assignment
************************/

// 1 & 2
let name = "Alex";
let age = 22;
let isStudent = true;

console.log(name, age, isStudent);

// 3 — Swap without third variable
let a = 5;
let b = 10;

[a, b] = [b, a];
console.log(a, b);

// 4 — Output & why
let x = 10;
let y = x;
y = 20;
console.log(x); // 10 (primitive values are copied)

// 5 — Use const
const pi = 3.14;
const radius = 5;
const area = pi * radius * radius;
console.log(area);


/***********************
 Section 2 — Operators
************************/

// 6
let num1 = 20;
let num2 = 6;

console.log("Sum:", num1 + num2);
console.log("Difference:", num1 - num2);
console.log("Product:", num1 * num2);
console.log("Quotient:", num1 / num2);
console.log("Remainder:", num1 % num2);

// 7 — Predict output
console.log(5 + "5");   // "55"
console.log(5 - "2");   // 3
console.log(true + 1);  // 2

// 8
let n = 100;

if (n > 100) console.log("Greater than 100");
else if (n === 100) console.log("Equal to 100");
else console.log("Less than 100");

// 9
console.log(5 == "5");   // true (loose equality)
console.log(5 === "5");  // false (strict equality)

// 10
let personAge = 30;

if (personAge >= 18 && personAge <= 60) {
  console.log("Eligible");
} else {
  console.log("Not eligible");
}


/***********************
 Section 3 — Control Statements
************************/

// 11 — Even or odd
let number = 7;

if (number % 2 === 0) console.log("Even");
else console.log("Odd");

// 12 — FizzBuzz
if (number % 3 === 0 && number % 5 === 0) console.log("FizzBuzz");
else if (number % 3 === 0) console.log("Fizz");
else if (number % 5 === 0) console.log("Buzz");

// 13 — Switch weekday
let day = 3;

switch (day) {
  case 1: console.log("Monday"); break;
  case 2: console.log("Tuesday"); break;
  case 3: console.log("Wednesday"); break;
  case 4: console.log("Thursday"); break;
  case 5: console.log("Friday"); break;
  case 6: console.log("Saturday"); break;
  case 7: console.log("Sunday"); break;
  default: console.log("Invalid day");
}

// 14 — For loop
for (let i = 1; i <= 20; i++) {
  console.log(i);
}

for (let i = 1; i <= 20; i++) {
  if (i % 2 === 0) console.log(i);
}

// 15 — While loop sum
let N = 5;
let sum = 0;
let i = 1;

while (i <= N) {
  sum += i;
  i++;
}
console.log("Sum:", sum);

// 16 — break & continue
for (let i = 1; i <= 10; i++) {
  if (i === 5) continue;
  if (i === 8) break;
  console.log(i);
}


/***********************
 Section 4 — Functions
************************/

// 17
function add(a, b) {
  return a + b;
}
console.log(add(3, 4));

// 18 — Arrow function
const addArrow = (a, b) => a + b;
console.log(addArrow(5, 6));

// 19 — Prime check
function isPrime(num) {
  if (num <= 1) return false;
  for (let i = 2; i <= Math.sqrt(num); i++) {
    if (num % i === 0) return false;
  }
  return true;
}
console.log(isPrime(11));

// 20 — Reverse string
function reverseString(str) {
  return str.split("").reverse().join("");
}
console.log(reverseString("hello"));

// 21 — Output
function test() {
  return;
  console.log("Hello");
}
test(); // nothing printed

// 22 — Largest number in array
function largestNumber(arr) {
  return Math.max(...arr);
}
console.log(largestNumber([3, 7, 2, 9, 5]));


/***********************
 Section 5 — Integrated Challenge
************************/

function calculateGrade(marks) {
  if (marks >= 90) return "A";
  else if (marks >= 75) return "B";
  else if (marks >= 50) return "C";
  else return "Fail";
}

let studentMarks = 82;
let grade = calculateGrade(studentMarks);

console.log("Marks:", studentMarks);
console.log("Grade:", grade);