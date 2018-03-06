import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
class Parent extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      sizeofboard:3
    }
  }

  onincrease=()=>{
    console.log('increase clicked');
    this.setState({
      sizeofboard: this.state.sizeofboard+1
    });
   // console.log(this.state.sizeofboard);
  }
  render() {
    return(
      <div className="size">

      <Game sizeofboard={this.state.sizeofboard} />
      <button className="button2 " onClick={() => this.onincrease()}>Size++</button>
      </div>
    );
  }
}

class  Game extends React.Component {
   constructor(props){
      super(props);

      this.state={
         size:props.sizeofboard,
         rows:props.sizeofboard,
         columns:props.sizeofboard,
         arr:this.initilaizefun(props.sizeofboard)
    }
      console.log(this.state.sizeofboard);
   }
   componentWillReceiveProps(nextProps){
      if(nextProps.sizeofboard != this.state.size){
        this.setState({
         size:nextProps.sizeofboard,
         rows:nextProps.sizeofboard,
         columns:nextProps.sizeofboard,
         arr:this.initilaizefun(nextProps.sizeofboard)
        })
      }
    }
    shuffle =(array)=>{
       for(var  i=0;i<array.length;i++){
         var randomindex= Math.floor(Math.random() * array.length);
         var temp=array[i];
         array[i]=array[randomindex];
         array[randomindex]=temp;
       }
       return array;
       //console.log(array);
    }
   //now we fill values from o to 8 in board
   initilaizefun=(size)=>{
        var values=[];
        for(var x=0;x<size*size;x++){
          values.push(x);
        }
        // shuffle them after initialising
   var shuffledarr=this.shuffle(values);
   var grid = []
   for (var i = 0; i < size; i++) {
     var row = []
     for (var j = 0; j < size; j++) {
       row.push({
         'value':shuffledarr[i*size+j],

       });
     }
       console.log(row.length);
       grid.push(row);
   }
   return grid;
  }
  clickfun=(value,xcordinate,ycordinate)=>{
    //console.log(value);
     var dx=[-1,0,1,0];
     var dy=[0,1,0,-1];
     let x=xcordinate;let y=ycordinate;
     for(var i=0;i<4;i++){
       var newx=x+dx[i];
       var newy=y+dy[i];

       var flag=false;
       //console.log('this.state.size is :'+this.state.rows);
       //let arrclone=this.state.arr;
       if(newx>=0 && newx<=this.state.rows-1 && newy>=0 && newy<=this.state.columns-1 && flag===false){
       //  console.log('in');
         //console.log('newx is '+newx);
         //console.log('newy is '+newy);
             if(this.state.arr[newx][newy].value===0 && flag===false){
               console.log('change to happen');
                console.log(newx);
                console.log(newy);
                 var clonedarry= this.state.arr.slice();
                 var temp=clonedarry[newx][newy];
                 clonedarry[newx][newy]=clonedarry[x][y];
                 clonedarry[x][y]=temp;
                 this.setState({
                   arr : clonedarry
                 });

                flag=true;
             }
       }
     }

  }

  rendergrid = () => {
    let arr1 = Array(this.state.rows).fill(0);
    let arr2=Array(this.state.columns).fill(0);
    //console.log(arr1);
    return arr1.map((val, index1) => {
      return (
        <div className="board">
          {arr2.map((val, index2) => {
            let val2 = this.state.arr[index1][index2].value;
            return <button className="button" onClick={()=>this.clickfun(val2,index1,index2)}>{val2}</button>;
          })}
        </div>
      );
    });
  };
   increase=()=>{


   }
   render() {
     return (
     <div className="game">
      <h1>PUZZLE</h1>
       <div className="render">
        {this.rendergrid()}
      </div>

      </div>
     );
   }
}
ReactDOM.render(<Parent />, document.getElementById('root'));
