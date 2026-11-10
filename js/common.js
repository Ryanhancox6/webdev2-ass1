let today = new Date();

document.querySelector("#footerYear").textContent = today.getFullYear();

document.querySelector("#footerDate").textContent = today.toDateString();
