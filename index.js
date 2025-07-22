const canvas=document.querySelector('canvas')
canvas.width=window.innerWidth
canvas.height=window.innerHeight
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
            progressValue+=10
        })
        console.log(progressValue)
     }else if(keys.left.pressed){
       platforms.forEach(platform=>{
         platform.position.x+=5
         progressValue-=10
       })
     }

    }
    
         }
      

}

class Platform{
    constructor({x,y}){
        this.position={
            x:x,
            y:y
        }
        this.height=20,
        this.width=200
    }
    draw(){
        c.fillStyle='red'
        c.fillRect(this.position.x,this.position.y,this.width,this.height)
    }
}
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
    c.clearRect(0,0,canvas.width,canvas.height)

   
    player.update()
  platforms.forEach(platform=>{
      platform.draw()
  })

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
    new Platform({x:200,y:300}),
    new Platform({x:370,y:400}),
     new Platform({x:800,y:250}),
     new Platform({x:1200,y:450}),
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

