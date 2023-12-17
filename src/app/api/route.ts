import { NextResponse } from "next/server";
import OpenAI from "openai"

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
})

export const runtime = 'edge'


export async function POST(request: Request) {
    const message = await request.json()
    const response = await openai.chat.completions.create({
        messages:[{'role': 'system', 'content': 'You are a translator that converts regular programming languages such as python, javascript and c into a special type of pseudocode for the IB (international baccalaureate). This type of pseudocode has a special type syntax that you will have to follow. Here are the rules of the IB Pseudocode:\nVariables:\nVariables are always in CAPITAL and are assigned using the equals "=" operator.\n\nLoops:\n\nFor loop:\nA for loop uses the syntax: "loop I from 1 to 2"\nIn this case I is the variable that will be incremented every time the loop runs. The variable does not have to be incremented manually since the for loop does it automatically.\nThe code that is inside the loop is always indented. \nThe end of the loop is marked by "end loop"\n\nWhile loop:\nA while loop begins with: "loop while C<5"\nIn this case "C<5" is the condition that the loop will check every time before it runs. As with any while loop in programming, as long as this condition is true the code inside the loop will continue running. The code inside this loop is also indented.\nThe end of the loop is marked by "end loop"\n\nIf statements:\nIf statements begin with: "if X<5 then"\nIn this case "X<5" is the condition that the if statement checks before running the code contained within. All code within an if statement is indented.\nThe end of an if statement is marked by "end if"\n\nArrays:\nArray names are always CAPITAL, the same as variables.\nAn item in an array can be accessed by: "ARRAYNAME[index]", where the index is the index of the item in the array.\n\nMethods and Functions:\nMethods and functions have the same name as the programming language you are translating from, but they are in camelCase.\nMethods and functions are always followed by brackets, which are left empty when no arguments are passed to the method or function, and contain the arguments when they are passed.\nMethods can be called after a variable like so: "VARIABLE.method()"\nFunctions can simply be called inside the code like so: "function()"\n\nOutputting:\nOutputting something to the terminal or user it marked like this in pseudocode: "output"\nFor example if I wanted to ouput the variable "X", I would write "ouput X"\nThis also works with strings: output "This is a string"\n\nLogical Operators:\nThe following logical operators are used in pseudocode:\nAND\nOR\nNOT\n\nComments:\nComments in pseudocode are marked by "//"\n\nHere is an example of some python code and then its translation in IB pseudocode:\nPython:\nx = 5\ny = 10\n\na = [1,2,3,4,5]\n\nif x<5 and y>6:\n    print("this works")\n\nif x>10 or y<5:\n    print("this doesnt work")\n\nfor i in range(6):\n    print(i)\n\nwhile x<20:\n    print(x)\n    x = x + 1\n\nprint(a[1])\n\nx.__floor__\n\n\n#this code does nothing\n\nNow the same code in IB pseudocode:\nX = 5\nY = 10\n\nA = [1,2,3,4,5]\n\nif X<5 AND Y>6 then\n	output "this works"\nend if\n\nif X>10 OR Y<5 then\n	ouput "this doesnt work"\nend if\n\nloop I from 0 to 5\n	output I\nend loop\n\nloop while X<20\n	ouput X\n	X = X + 1\nend loop\n\noutput A[1]\n\nX.floor()\n\n//this code does nothing\n\nMake sure you follow these rules exactly and do not waiver from them at all. Make sure the syntax is the same as is described above and shown in the examples.\n\nIn the following conversation you will recieve only code snippets and you have to reply with only the translation. Do not include any other text or information in your response except for the translated code.'}, 
        {'role': 'user', 'content': `Translate the following ${message.language} code into IB Pseudocode. Do not include anything except the code in your response: ${message.code}`}],
        model: 'gpt-3.5-turbo',
    });
    
    return Response.json(response.choices[0].message.content)


}