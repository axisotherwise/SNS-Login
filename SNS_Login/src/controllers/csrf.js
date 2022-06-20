const result = async (req, res, next) => {
  console.log("here");
  return res.json({
    name: "윤승근",
    age: 29,
  })
}

export {
  result,
}