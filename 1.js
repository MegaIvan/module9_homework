const parser = new DOMParser();

const xmlString = `
<list>
<student>
  <name lang="en">
    <first>Ivan</first>
    <second>Ivanov</second>
  </name>
  <age>35</age>
  <prof>teacher</prof>
</student>
<student>
  <name lang="ru">
    <first>Петр</first>
    <second>Петров</second>
  </name>
  <age>58</age>
  <prof>driver</prof>
</student>
</list>
`;

const xmlDom = parser.parseFromString(xmlString, "text/xml");

let studentsArray = new Array();
let studentElements = xmlDom.getElementsByTagName("student");

for(let i = 0; i < studentElements.length; i++){
    const nameNode = studentElements[i].querySelector("name");
    const firstNameNode = nameNode.querySelector("first");
    const secondNameNode = nameNode.querySelector("second");
    const ageNode =  studentElements[i].querySelector("age");
    const profNode =  studentElements[i].querySelector("prof");

    const langAttr = nameNode.getAttribute("lang");

    const result = { 
        name: firstNameNode.textContent + " " + secondNameNode.textContent,
        age: ageNode.textContent,
        prof: profNode.textContent,
        lang: langAttr,
    };

    studentsArray.push(result);
}
console.log(studentsArray, "list");