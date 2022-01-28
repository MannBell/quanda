import { isEmpty } from "react-redux-firebase";

export default function cleanEmpty(arr) {
  return arr.filter((arrEl) => !isEmpty(arrEl))
}