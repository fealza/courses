class scheme_course
{
 

}

class course
{
 
 constructor(name)
 {
  this.name=name
 } 

 add_description(name)
 {
     this.description=name
 }

 print()
 {
   $("#container").append('<div class=init_item><a href=#>'+this.name+'</a></div>');
 }

}

class course_collection{
 constructor()
 {
  this.data = Array()
 }

 add(cs)
 {
  this.count++;   
  this.data.push(cs)
 }
 
  print()
  {
   this.data.forEach(element => {
       element.print();
   });
  }
 
}


course_collect = new course_collection();
cs1 = new course('Course 1: Windows ');
cs1.add_description('Курс по изучению остров Windows')
course_collect.add(cs1);

cs2 = new course('Course 2: Linux');
cs2.add_description('Курс по изучению остров Linux')

course_collect.add(cs2);

cs3 = new course('Course 3: Cisco');
cs2.add_description('Курс по изучению остров Cisco')

course_collect.add(cs3);



console.log(course_collect)



function onload()
{
    course_collect.print();   
}