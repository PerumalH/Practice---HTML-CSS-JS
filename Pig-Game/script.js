const secureBooking = function () {
  let passCount = 0;

  return function () {
    passCount++;
    console.log(passCount);
  };
};

const booker = secureBooking();
booker();

(function () {
  const header = document.querySelector("h1");
  header.style.color = "blue";
  let i = 0;
  document.body.addEventListener("click", function () {
    if (i % 2 == 0) header.style.color = "red";
    else header.style.color = "blue";
    i++;
  });
})();
