import jwt from "jsonwebtoken";

const id = jwt.verify(
     'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ODAsImlhdCI6MTY1ODc2NDgzOSwiZXhwIjoxNjU4ODUxMjM5fQ.wK8yAtuCOCshqJCzfpqKhsAiRgSysM8HQeed5mqAPGU',
     '12345678945867325478597642389563'
   )

   console.log(id)