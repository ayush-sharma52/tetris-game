    const grid=document.querySelector('.main-grid')                        //to refer the grid element whenever we use this grid variable
    let squares=Array.from(document.querySelectorAll('.main-grid div'))    //to form an array of all 200 grids
    const width=10

    const scoreDisplay=document.querySelector('#score');
    const button=document.querySelector('#start-button');   
    let timerId  
    let score=0                                                //no.of divs in a horizontal line in the grid
    const colors =['orange','red','purple','blue','green']
    const lTetrimno = [
    [1,width+1,2*width+1,2],                                //making an array to save the indices no. of dovs used in ltetrimino formation
    [1,width+1,2*width+1,2*width],
    [width,width+1,width+2,2*width+2],
    [width,2*width,2*width+1,2*width+2]   ]

    
    const iTetrimno = [
        [1,width,width+1,width+2], 
        [1,width+1,2*width+1,width+2],
        [width,width+1,width+2,2*width+1],
        [width,width+1,1,2*width+1]                      //making an array to save the indices no. of dovs used in ltetrimino formation
        ]

    const oTetrimno = [
        [0,1,width,width+1],
        [0,1,width,width+1],
        [0,1,width,width+1],
        [0,1,width,width+1]
    ]

    const zTetrimno = [
    [width+1,width+2,2*width,2*width+1 ],
    [0,width,width+1,2*width+1],
    [width+1,width+2,2*width,2*width+1 ],
    [0,width,width+1,2*width+1]
    ]

    const ITetrimno =[
        [1,width+1,2*width+1,3*width+1],
        [width,width+1,width+2,width+3],
        [1,width+1,2*width+1,3*width+1],
        [width,width+1,width+2,width+3] ]
    
    let currentPos=4;
    let currentRotation=0;
    const theTetrimno=[lTetrimno,iTetrimno,ITetrimno,oTetrimno,zTetrimno]
    
    let random=Math.floor(Math.random()*theTetrimno.length)   //any tetrimno
    let current=theTetrimno[random][currentRotation];          //tetrimno with a particular rotation
    let newRandom=0
    
    function draw()
    {
        current.forEach(index => {
            squares[currentPos + index].style.backgroundColor=colors[random]
        }
        )
    }
  
    function undraw()
    {
        current.forEach(index => {
         squares[currentPos + index].style.backgroundColor=''
        })
    } 

    function control(e)
    {
        if(e.keyCode ===37)
        moveleft()
        else if(e.keyCode ===38)
        rotate()
        else if(e.keyCode ===39)
        moveright()
        else if(e.keyCode ===40)
        movedown()
    }
   document.addEventListener('keyup', control) 
   
   function movedown()
    {
     undraw()
    currentPos += width
      draw()      
      freeze() 
    } 

    function freeze()
    {
      if(current.some(index =>
           squares[currentPos + index + width].classList.contains('taken') ))
       {  current.forEach(index=>{
           squares[currentPos+index].classList.add('taken')
       })
    
     random=newRandom
     newRandom = Math.floor(Math.random()*theTetrimno.length)
     current=theTetrimno[random][currentRotation]
     currentPos=4
     display()
     draw()
     addscore()
     gameOver()
    }
  }

  function moveleft()
  {
      undraw()
      let isAtLeftEdge=current.some(index => (currentPos + index)%width===0  )
      if(!isAtLeftEdge) currentPos-=1;
      if(current.some(index => squares[currentPos + index ].classList.contains('taken')))
    currentPos+=1
        draw()
     }

    function moveright()
    {
        undraw()
        let isAtRightEdge=current.some(index => (currentPos + index) % width === width-1  )
        
        if(!isAtRightEdge) currentPos+=1;
  
        if(current.some(index=>{squares[currentPos + index ].classList.contains('taken') }))
        currentPos-=1
    
        draw()
    
    }

      function rotate()
      {
          undraw()
          
          currentRotation++

          if(currentRotation===current.length) 
          currentRotation=0

          current=theTetrimno[random][currentRotation]
          draw()
      }

      let newSquares=Array.from(document.querySelectorAll('.mini-grid div'))
      const newWidth=4
     const displayIndex=0
      const LTetrimino=[1,newWidth+1,2*newWidth+1,2]
      const OTetrimno =[0,1,newWidth,newWidth+1]
      const itetrimno =[1,newWidth,newWidth+1,newWidth+2]
      const Ztetrimno =[newWidth+1,newWidth+2,2*newWidth,2*newWidth+1 ]
      const Itetrimno = [1,newWidth+1,2*newWidth+1,3*newWidth+1]

      const upNextTetrimnos =[LTetrimino,itetrimno,Itetrimno,OTetrimno,Ztetrimno]
      
      function display()
      { 
            newSquares.forEach(index => {
              
                index.style.backgroundColor=''
            })

          upNextTetrimnos[newRandom].forEach(index => {
         
          newSquares[displayIndex + index].style.backgroundColor=colors[newRandom]
          })
      }

      button.addEventListener('click',() => {
          if(timerId)
          {
              clearInterval(timerId)
              timerId=null
          }
          else{
        draw()
         timerId=setInterval(movedown, 500);
        newRandom= newRandom = Math.floor(Math.random()*theTetrimno.length)
     display()   
    }
      })

      
      function addscore()
      {
       for(let i=0;i<199;i+=width)
       {
        const row=[i,i+1,i+2,i+3,i+4,i+5,i+6,i+7,i+8,i+9]  

        if( row.every(index => squares[index].classList.contains('taken') ) )  //or classList.contains('tetrimino')          
        {
            score+=10
            scoreDisplay.innerHTML=score
            
           row.forEach( index => {squares[index].classList.remove('taken')
            squares[index].style.backgroundColor=''
            })

            const removedboxes=squares.splice(i,width)
            squares=removedboxes.concat(squares)
            squares.forEach( box => {grid.appendChild(box) }) 
        } } }
      
        function gameOver()
      {
         if(current.some(index => squares[currentPos+index].classList.contains('taken')))
          {
            scoreDisplay.innerHTML='end'
            clearInterval(timerId)
          }
      }