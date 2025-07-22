import platformImageSrc from './assets/platform.jpg'
import backgroundImageSrc from './assets/background.jpg'
import icebergImageSrc from './assets/iceberg4.jpg'
import icebergImageSrc2 from './assets/icebergMiddle2.jpg'


const platformImage=new Image()
platformImage.src=platformImageSrc

const backgroundImage=new Image()
backgroundImage.src=backgroundImageSrc

const icebergImage=new Image()
icebergImage.src=icebergImageSrc
const icebergImage2=new Image()
icebergImage2.src=icebergImageSrc2


const canvas=document.querySelector('canvas')
/* canvas.width=window.innerWidth
canvas.height=window.innerHeight */
canvas.width=1795
canvas.height=876
const c=canvas.getContext('2d')




const gravity=1
var progressValue=0
class Player{
    constructor(){
        this.position={
            x:100,
            y:100
        },
        this.width=30,
        this.height=30,
        this.velocity={
            x:0,
            y:1
        }
    }   
   
     draw(){
        c.fillStyle='yellow'
        c.fillRect(this.position.x,this.position.y,this.width,this.height)
        c.strokeRect(this.position.x,this.position.y,this.width,this.height)//border
    }

    update(){
        
        this.draw()
        this.position.y+=this.velocity.y//fallll slow no accelaration  [cant be inside condition bcs even if gravity stops,need to move forard litle bit to not appear as floating above ground]
        this.position.x+=this.velocity.x //[linking velocity to position fr VISBLE MOVEMNT!]
           if(this.position.y+this.height+this.velocity.y<=canvas.height){//untill  you reach ground
            
            
        this.velocity.y+=gravity  // +=0.5 after evry frame-------OR-------incrase velocity after very frame[gradualy like gravity irl....]
        ///cz garvity stos whn u hit ground

    }else{
        this.velocity.y=0//stop faling
    }

//MOVEMENTS OFP LAYER 
     if(keys.right.pressed && player.position.x<600){
        player.velocity.x=5
    }else if(keys.left.pressed &&player.position.x>100){
        player.velocity.x=-5
    }else if(keys.up.pressed){
        player.velocity.y=-10

    }else{
        player.velocity.x=0
        //i.e dont move player instaed move platform
        //when u reach restricted line:600 ||100, move platform
     if(keys.right.pressed){
        platforms.forEach(platform=>{
            platform.position.x -= 5
           
        })
         progressValue+=10

         iceberg.position.x-=3
         iceberg2.position.x-=3
         bgImage.position.x-=3
         bgImage2.position.x-=3

        console.log(progressValue)
     }else if(keys.left.pressed){
       platforms.forEach(platform=>{
         platform.position.x+=5
          
       })
       progressValue-=10
       
          iceberg.position.x+=3
         iceberg2.position.x+=3
         bgImage.position.x+=3
         bgImage2.position.x+=3
     }

    }
    
         }
      

}

class Platform{
    constructor({x,y,image}){
        this.position={
            x:x,
            y:y
        }
        this.height=image.height,
        this.width=image.width,
        this.image=image
    }
    draw(){
        c.fillStyle='red'
      /*   c.fillRect(this.position.x,this.position.y,this.width,this.height) */
      c.drawImage(this.image,this.position.x,this.position.y)
    }
}

class BackgroundImage{
    constructor({x,y,image}){
        this.position={
            x:x,
            y:y
        }
        this.height=740,
        this.width=1795,
        this.image=image
    }
    draw(){
        c.fillStyle='red'
      /*   c.fillRect(this.position.x,this.position.y,this.width,this.height) */
      c.drawImage(this.image,this.position.x,this.position.y,this.width,this.height)
    }
}
class IceBerg{
    constructor({x,y,image}){
        this.position={
            x:x,
            y:y
        }
        this.height=image.height,
        this.width=image.width,
        this.image=image
    }
    draw(){
        c.fillStyle='red'
      /*   c.fillRect(this.position.x,this.position.y,this.width,this.height) */
      c.drawImage(this.image,this.position.x,this.position.y,this.width,this.height)
    }
}
const bgImage=new BackgroundImage({x:0,y:0,image:backgroundImage})
const bgImage2=new BackgroundImage({x:1795,y:0,image:backgroundImage})


const iceberg=new IceBerg( {x:0,y:0,image:icebergImage})
const iceberg2=new IceBerg( {x:800,y:0,image:icebergImage2})

const keys={
    right:{
        pressed:false
    },
    left:{
        pressed:false
    },
    up:{
        pressed:false
    }

}

function animate(){
    requestAnimationFrame(animate)
    c.fillStyle='white'
    c.fillRect(0,0,canvas.width,canvas.height)

   
   bgImage.draw()
   bgImage2.draw()
 

   iceberg.draw()
  iceberg2.draw()

  platforms.forEach(platform=>{
      platform.draw()
  })
  

 player.update()
    //collision detection:when to NOTTTTT fall
   platforms.forEach(platform=>{

     if(
        /* VERTCIAL: ❝Is the player's bottom currently above the platform, but in the next frame, it will go through or land on the platform?THEN NO FALL */
    player.position.y+player.height<=platform.position.y//detects if feet is  CURRENTLYYYYtouching platofrm ---cant writ only = bcs might skip exct value due to velocity!
    && player.position.y+player.height+player.velocity.y>=platform.position.y //IN NEXTTTTTTT FRAME wil it go belowww?
    /* HORIZONATL:OPTIOAL:AVOID HALF HANGING rigth or leftard 
    WHEN TO *****NOTTTT**** FALL */
    &&player.position.x+player.width>platform.position.x   //wil fal if u whole body go leftward of platform completly
    &&player.position.x<platform.position.x+platform.width //will fall if whole body goes rigtward ofp latfomr 
    ){
        player.velocity.y=0
    }

   })
    
if(progressValue>3720){
    console.log('You Win')
}


}

const player=new Player()
const platforms=[
    new Platform({x:0,y:740,image:platformImage}),
    new Platform({x:360,y:740,image:platformImage}),
    new Platform({x:720,y:740,image:platformImage}),
    new Platform({x:1080,y:740,image:platformImage}),
    new Platform({x:1440,y:740,image:platformImage}),
    new Platform({x:1800,y:740,image:platformImage}),


    new Platform({x:720,y:370,image:platformImage}),
    

    
]

animate()


window.addEventListener('keydown',(event)=>{  //event or ({key})
    console.log(event.key)

    switch(event.key){
        case 'ArrowRight':
            keys.right.pressed=true
            break;
        case 'ArrowLeft':
            keys.left.pressed=true
            break;
        case 'ArrowUp':
            keys.up.pressed=true
            break
        
    }
})
window.addEventListener('keyup',(event)=>{  //event or ({key})
    console.log(event.key)

    switch(event.key){
        case 'ArrowRight':
            keys.right.pressed=false
            break;
        case 'ArrowLeft':
            keys.left.pressed=false
            break;
        case 'ArrowUp':
            keys.up.pressed=false
            break
            
        
    }
})

