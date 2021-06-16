class device
{
  id = 0;
  canva = null;
  x = 0;
  y = 0;
  imgs_id='img_'+this.id;
  constructor(name,image,x,y)
  {
   this.name = name;
   this.image = image;
   this.x = x;
   this.y = y;
   var img = new Image();
   img.src = image;
   img.id = 'img_'+this.id;
   img.onload = function()
    {
      context.drawImage(img,this.x,this.y);
    }
  }

  
  destroy()
  {
    var elem=document.getElementById(this.imgs_id);
    elem.remove();
  }

  print()
  {    
  }

}


class device_collection
{
  data=[]
  canva = null;
  constructor(canva)
  {
    this.canva = canva;
  }

  add(dv)
  {
    this.data.push(dv);
    dv.id = this.data.length;
  }

  print()
  {
    var result='';
    this.data.forEach(element => {
      result+=element.print();
    })
    return result;
  }
}

class course
{
  id = 0;
  current = false;
  state = 1;
  devices = null;
  canva = null;

 constructor(name,canva)
 {
  this.name = name;
  this.canva = canva;
 } 

 load_course()
 {
  this.devices = new device_collection(this.canva);
   this.devices.add(new device('tmp','images/Firewall.png',10,10));
 }

 add_description(name)
 {
     this.description=name
 }

 destroy()
 {
  this.devices.forEach(element => {
     element.destroy();
  })

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

class course_collection
{
  
 old_id = null;
 constructor(cn)
 {
  this.data = Array()
  this.canvas_context=cn;
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
      if (element.id == this.old_id) {element.destroy();}
    })
    this.data[(id-1)].current=true;
    this.data[(id-1)].load_course();
    this.old_id = (id -1);
    $('#panel').animate({width:"30%"},700,"swing",function()
    {
     course_collect.print();
 
     });
  }
 
}

var canvas = document.getElementById("canvas");
if (canvas != null) 
{
 var context = canvas.getContext("2d");
} else { alert('не удалась иницилизация Canvas ')}

 

course_collect = new course_collection(context);
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