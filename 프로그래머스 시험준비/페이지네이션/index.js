const $table = document.querySelector("#table").querySelector("table");
const $pagination = document.querySelector("#pagination");
const $dropdownSelect = document.querySelector("#dropdown").querySelector("select");
let dropdownVal = 5;
let currentPage = 1;

window.onload = async () => {
  const response = await fetch("/web/src/data.json");
  const data = await response.json();

  makeTable(data, dropdownVal, currentPage);
  makePagination(data, dropdownVal);

  $dropdownSelect.addEventListener("change", e => switchDropdown(e, data));
  $pagination.querySelectorAll("button")[1].classList.add("selected");
};

function makeTable(data, dropdownVal, currentPage) {
  const html = Array(dropdownVal)
    .fill(0)
    .map((el, ind) => {
      return data[dropdownVal * (currentPage - 1) + ind]
        ? `
            <tr>
                <td>${data[dropdownVal * (currentPage - 1) + ind]?.name}</td>
                <td>${data[dropdownVal * (currentPage - 1) + ind]?.title}</td>
                <td>${data[dropdownVal * (currentPage - 1) + ind]?.email}</td>
                <td>${data[dropdownVal * (currentPage - 1) + ind]?.role}</td>
            </tr>
        `
        : null;
    })
    .join("")
    .replaceAll(",", "");

  $table.innerHTML = `
        <th>name</th>
        <th>title</th>
        <th>email</th>
        <th>role</th>
        ${html}
    `;
}

function makePagination(data, dropdownVal) {
  const html = Array(Math.ceil(data.length / dropdownVal))
    .fill(0)
    .map((el, ind) => {
      return `
            <button>${ind + 1}</button>
        `;
    })
    .join("")
    .replaceAll(",", "");

  $pagination.innerHTML = `
        <button class="arrow"><<</button>
        ${html}
        <button class="arrow">>></button>
    `;

  $pagination.querySelectorAll("button").forEach(el => {
    el.addEventListener("click", e => movePage(e, data));
  });
}

function movePage(e, data) {
  const clicked = e.target.innerText;
  const $buttons = $pagination.querySelectorAll("button");
  $buttons.forEach(el => el.classList.remove("selected"));

  switch (clicked) {
    case "<<":
      currentPage = 1;
      makeTable(data, dropdownVal, currentPage);
      $buttons[1].classList.add("selected");
      break;

    case ">>":
      const $lastBtn = $buttons[$buttons.length - 2];
      currentPage = $lastBtn.innerText * 1;
      makeTable(data, dropdownVal, currentPage);
      $lastBtn.classList.add("selected");
      break;

    default:
      currentPage = clicked * 1;
      makeTable(data, dropdownVal, currentPage);
      e.target.classList.add("selected");
      break;
  }
}

function switchDropdown(e, data) {
  dropdownVal = e.target.value * 1;
  currentPage = 1;
  makeTable(data, dropdownVal, currentPage);
  makePagination(data, dropdownVal);
  $pagination.querySelectorAll("button")[1].classList.add("selected");
}
