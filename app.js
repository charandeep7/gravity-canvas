function getName()
{
    document.onreadystatechange = function(){
        if(document.readyState=='loaded' || document.readyState=='complete'){
            if(localStorage['name'] && localStorage['name'].length != 0 && localStorage['name'] !== 'Stranger'){
                document.getElementById('username').innerHTML = localStorage.getItem('name');
            }
            else{
                let name = prompt("Enter your name: ","Kitish");
                if(name.length == 0) name = 'Stranger'
                document.getElementById('username').innerHTML = name;
                localStorage.setItem('name',name)
            }
        }
    }
}
getName()

const input = document.querySelector('input')
const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');
const gravity = 1;
const friction = 0.8999;
const colors = ['#2185C5','#7ECEFD','#FFF6E5','#FF7F66'];
const cats = ['😺','😸','😹','😻','😼','😽','🙀','😿','😾','🐱']

canvas.height = innerHeight;
canvas.width = innerWidth;

function randomIntFromRange(min,max)
{
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function randomColor(colors,flag=false)
{
    if(flag)
        return `rgb(${Math.floor(Math.random() * 256)},${Math.floor(Math.random() * 256)},${Math.floor(Math.random() * 256)})`;
    return colors[Math.floor(Math.random() * colors.length)];
}

class Ball{
    constructor(x,y,r,dx,dy,startangle,endangle,direction,color){
        this.x = x;
        this.y = y;
        this.r = r;
        this.dx = dx;
        this.dy = dy;
        this.startangle = startangle;
        this.endangle = endangle;
        this.direction = direction;
        this.color = color;
    }
    draw(){
        c.beginPath()
        c.arc(this.x,this.y,this.r,this.startangle,this.endangle,this.direction);
        c.fillStyle = this.color;
        c.strokeStyle = this.color;
        c.stroke()
        c.fill()
        c.closePath()
    }
    update(){
        if(this.y + this.r + this.dy > innerHeight)
            this.dy = -this.dy * friction;
        else
           this.dy += gravity;
        
        if(this.x + this.r > innerWidth || this.x - this.r  < 0)
            this.dx = -this.dx;

        this.x += this.dx;
        this.y += this.dy;
        this.draw()
    }
}

function createBalls(n)
{
    const balls = [];
    const directions = [true,false];
    function getXYR(){
        let R = randomIntFromRange(0,100);
        let X = randomIntFromRange(0,canvas.width-2*R)+R;
        let Y = randomIntFromRange(0,canvas.height-R);
        let DX = (Math.random() - 0.5) * 5;
        let DY = (Math.random() - 0.5) * 5;
        let STARTANGLE = 0;
        let ENDANGLE = Math.PI * 2;
        let COLOR = randomColor(colors,true);
        let DIRECTION = directions[Math.floor(Math.random() * directions.length)];
        return {
            x: X,
            y: Y,
            r: R,
            dx: DX,
            dy: DY,
            startangle: STARTANGLE,
            endangle: ENDANGLE,
            color: COLOR,
            direction: DIRECTION
        }
    }
    for(let i=0; i<n; ++i){
        const val = getXYR();
        balls.push(new Ball(val.x,val.y,val.r,val.dx,val.dy,val.startangle,val.endangle,val.direction,val.color));
    }
    return balls;
}


function init(n=1)
{
    const balls = createBalls(n);
    function animate()
    {
        requestAnimationFrame(animate);
        c.clearRect(0,0,innerWidth,innerHeight)
        balls.forEach(ball=>ball.update())
    }
    animate()
}

addEventListener('resize',()=>{
    canvas.height = innerHeight;
    canvas.width = innerWidth;
    init()
})
addEventListener('load',()=>init())

addEventListener('keypress',(e)=>{
    if(e.key === "Enter"){
        if(input.value <= 2000 && input.value >= 0){
            init(input.value)
            document.querySelector('p').style.color = randomColor(null,true);
            document.getElementById('cat').textContent = cats[Math.floor(Math.random() * cats.length)]
        }
        input.value = ""
    }
})