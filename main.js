
var canvas = document.querySelector('canvas'); //Html deki Canvası - Canvas adlı değişene atadık
var ctx = canvas.getContext('2d');
//((getContext() metodunu çağırmak için "2d" string ifadesini yazmak zorundasınız):

var width = canvas.width = window.innerWidth;  // Canvasımıza Genislik Atadık
var height = canvas.height = window.innerHeight;   //Canvasımıza yukseklik atadık

// function to generate random number

function random(min,max) {      // Rastgele sayı aldık
  var num = Math.floor(Math.random()*(max-min)) + min;
  return num;   
}

//Topumuzu modelleyelim
function Kare(x,y,velX,velY,color,size){
    this.x=x;     //Topun Hangi Dogruda baslayacagını
    this.y=y;       //Topun Hangi Boylamda baslayacagını
    this.velX=velX; //Yatay Hızı
    this.velY=velY; //Dikey Hızı
    this.color=color; //Rengi
    this.size=size; //Piksel cinsinden boyutu
}

Kare.prototype.draw = function(){
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.size, 80);
    ctx.fill();
    
  }

  var testKare = new Kare(100, 100, 4, 4, 'blue', 30);

  Kare.prototype.update = function() {
    if ((this.x + this.size) >= width) {  //Basladığı nokta ile boyutunu topla eğer widthten büyük eşitse ters yönde hareket ettir
      this.velX = -(this.velX);
    }
  
    if ((this.x - this.size) <= -70) {   //Basladığı nokta ile boyutunu topla eğer windowda -70den büyük eşitse ters yönde hareket ettir
      this.velX = -(this.velX);           //Sol
    }
  
    if ((this.y + this.size) >= height) {  //Basladığı nokta ile boyutunu topla eğer height büyük eşitse ters yönde hareket ettir
      this.velY = -(this.velY);
    }
  
    if ((this.y - this.size) <= 0) {    //Cerceveden cıkmaması ıcın alt ust
      this.velY = -(this.velY);         //Basladığı nokta ile boyutunu topla eğer windowda -70den büyük eşitse ters yönde hareket ettir
    }
  
    this.x += this.velX;    //Yatay yonde hareket ekle
    this.y += this.velY;    //Dikey yonde hareket ekle
  }



  Kare.prototype.collisionDetect = function() {
    for (var j = 0; j < kareler.length; j++) {
      if (!(this === kareler[j])) {
        var dx = this.x - kareler[j].x;
        var dy = this.y - kareler[j].y;
        var distance = Math.sqrt(dx * dx + dy * dy);
  
        if (distance < this.size + kareler[j].size) {
          kareler[j].color = this.color = 'rgb(' + random(0, 255) + ',' + random(0, 255) + ',' + random(0, 255) +')';
        }
      }
    }
  };
 




  var kareler = [];     //Karelerimizin buluncağı bir array olusturalım.

  function loop() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';  // Red Green Blue methodu kullanımı(CSS3) , (Red,Green,Blue,Blur)  
    ctx.fillRect(0, 0, width, height);      //fillRect(x,y,width,height) metodu, o anki fillStyle ile bir dikdörtgen çizer.
  
    while (kareler.length < 20) {       
      var size = random(100,80);
      var kare = new Kare(
        random(0 + size,width - size),
        random(0 + size,height - size),
        random(-7,20),  // velX
        random(-7,25),  // velY
        'rgb(' + random(0,255) + ',' + random(0,255) + ',' + random(0,255) +')',
        size
      );
      kareler.push(kare);
    }
  
    for (var i = 0; i < kareler.length; i++) {
      kareler[i].draw();
      kareler[i].update();
      kareler[i].collisionDetect();

    }
  
    requestAnimationFrame(loop);
  }


  loop();
