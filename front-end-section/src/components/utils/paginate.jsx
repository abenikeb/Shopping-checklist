import _ from "lodash";

export function paginate(items, pageNumber, pageSize) {
  const startIndex = (pageNumber - 1) * pageSize;
  return _(items).slice(startIndex).take(pageSize).value();

  // first take items array into lodash
  // then slice usin strta index
  //take page size
  // change in to normal array
}
