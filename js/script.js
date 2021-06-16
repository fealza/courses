class course
{
  id=0;
  current=false;
  state = 1;
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
   var dest = '';
   if (this.state == 1)
   { 
    dest = '<div><p>'+this.description+'</p></div>';
   }
   var st='class="init_item';
   if (this.current)
   {
     st+=' init_current';
   }
   st+='"';
   $("#panel").append('<div '+st+' ><div><a href=# onclick=course_collect.go('+this.id+') >'+this.name+'</a></div>'+dest+'</div>');


 }

 set_state(state)
 {
   this.state=state;
 }

}

class course_collection{
 constructor()
 {
  this.data = Array()
 }

 set_state(state)
 {
   this.data.forEach(element => {
     element.set_state(state)
   })
 }


 add(cs)
 {
  this.count++;   
  this.data.push(cs)
  cs.id=this.data.length
 }
 
  print()
  {
   this.data.forEach(element => {
       element.print();
   });
  }

  go(id)
  {
    $('#panel').empty();
    this.set_state(2);
    this.data.forEach(element => {
      element.current = false;
    })
    this.data[(id-1)].current=true;

    $('#panel').animate({width:"30%"},700,"swing",function()
    {
     course_collect.print();

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
cs3.add_description('Курс по изучению остров Cisco')

course_collect.add(cs3);



console.log(course_collect)



function onload()
{
    course_collect.print();   
}