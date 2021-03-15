(() => {
  const canvas = document.getElementById('painting');
  //set ขนาดของ canvas ให้กว้างและสูงเท่ากับขนาดของ window
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const context = canvas.getContext('2d');
//
  let previousPoint = { x: 0, y: 0 };

// ทำให้ลายเส้นมีน้ำหนักหนัก-เบาเหมือนพู่กัน โดยใช้สูตรทางคณิตศาสตร์
  function getDistance(previousPoint, currentPoint) {
    return Math.sqrt((previousPoint.x - currentPoint.x) ** 2 + (previousPoint.y - currentPoint.y) ** 2);

  }
//
  function onMouseMove({ pageX, pageY }) {
    const currentPoint = { x: pageX, y: pageY };

    context.beginPath();

    context.lineCap = 'round';
    context.lineJoin = 'round';

    // ทำให้สีเข้ม-อ่อนเหมือนพู่กัน โดยกำหนดระยะในการวาด
    const distance = getDistance(previousPoint, currentPoint);
    context.lineWidth = Math.random() / distance * 40;

    const opacity = Math.min(0.5, 1 / distance); //เพื่อไม่ให้สีเข้มเกินไป 
    context.strokeStyle = `rgba(225, 59, 225, ${opacity})`;

    context.moveTo(previousPoint.x, previousPoint.y);
    context.lineTo(currentPoint.x, currentPoint.y);

    context.stroke();
    context.closePath();

    previousPoint = currentPoint;

  }

  function onMouseEnter({ pageX, pageY }) {
    previousPoint.x = pageX;
    previousPoint.y = pageY;

  }



  function run() {
    canvas.addEventListener('mousemove', onMouseMove);
    canvas.addEventListener('mouseenter', onMouseEnter);

  }
  run();
  // เริ่มเขียนโค้ด

})();
