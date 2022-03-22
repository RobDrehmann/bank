export const pageswitch = (pageto) => {
  return{
    type: "changepage",
    pageto: pageto
  }
}
export const userswitch = (User_Name) => {
  return{
  type: "changeuser",
  User_Name: User_Name
}
}
export const accountswitch = (Account) => {
  return{
  type: "changeaccount",
  Account: Account
}
}
export const bankswitch = (Bank) => {
  return{
  type: "changebank",
  Bank: Bank
}
}
export const ratebtnswitch = (Ratebtn) => {
  return{
  type: "changeratebtn",
  Ratebtn: Ratebtn
}
}
export const postbtnswitch = (Postbtn) => {
  return{
  type: "changepostbtn",
  Postbtn: Postbtn
}
}
export const anonswitch = (Anon) => {
  return{
  type: "changeanon",
  Anon: Anon
}
}
export const ratingadd = (nr) => {
  return{
  type: `ADD`,
  number: nr
}
}
export const ratingdivid = (nr) => {
  return{
  type: `DIVID`,
  number: nr
}
}
export const ratingreset = (nr) => {
  return{
  type: `Reset`,
  number: nr
}
}
export const countadd = (nr) => {
  return{
  type: `ADD`,
  number: nr
}
}
export const countreset = (nr) => {
  return{
  type: `Reset`,
  number: nr
}
}
