function solution(subway, start, end) {
  const subObj = {};
  subway.forEach((el, ind) => {
    subObj[ind + 1] = el.split(" ");
  });
  // console.log(subObj)

  let startLine;
  let endLine;
  for (key in subObj) {
    if (subObj[key].includes(start + "")) startLine = key;
    if (subObj[key].includes(end + "")) endLine = key;
  }

  if (startLine === endLine) return 0;
  // console.log(counter(0,[startLine],endLine,subObj))
  else return counter(0, [startLine], endLine, subObj);
}

function isTransfable(fromLine, toLine, list = {}) {
  let transfableList = [];
  // console.log(list)
  // console.log(fromLine)
  for (key in list) {
    if (key !== fromLine) {
      if (list[fromLine]?.filter(el => list[key].includes(el)).length >= 1)
        transfableList.push(key);
    }
  }
  return [transfableList.includes(toLine), transfableList];
}

function counter(count = 0, startLineList, endLine, list) {
  count++;
  const tempRes = [];
  let tempTransfalbeList = [];
  startLineList.forEach(el => {
    const [res, tempLi] = isTransfable(el, endLine, list);
    tempRes.push(res);
    tempTransfalbeList = tempTransfalbeList.concat(tempLi);
  });

  if (tempRes.includes(true)) return Number(count);

  newStartList = [...new Set(tempTransfalbeList)];
  return counter(count, newStartList, endLine, list);
}

// ["0 4 8 23", "11 1 2 3 ", "3 20", "4 11 20", "22 4 8 9", "20 65"], 0, 65

// ["0 4 8 23", "11 1 2 3 ", "3 20", "4 11", "22 4 8 9", "20 65"], 0, 65
