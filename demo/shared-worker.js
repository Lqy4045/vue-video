// let a = 666;

// console.log("shared-worker");
// onconnect = function (e) {
//   var port = e.ports[0];

//   port.onmessage = function () {
//     port.postMessage(a++);
//   };
// };

let arr = [1, 2, 3, 4, 5];

console.log("1", arr.splice(0, 1));
console.log("arr", arr);
