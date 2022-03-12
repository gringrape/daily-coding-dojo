module.exports = {
  setJSONBody: setJSONBody,
}

function setJSONBody(requestParams, context, ee, next) {
  requestParams.json = {
    solution: `
      class Solution {
        public int solution(int a, int b) {
          return a + b;
        }
      }
    `
  }
  return next(); // MUST be called for the scenario to continue
}
