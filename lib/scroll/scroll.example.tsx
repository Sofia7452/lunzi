import Scroll from './scroll';
import * as React from 'react';

const ScrollExample: React.FunctionComponent = () => {
  return (
    <div>
      <div>
        <h2>第一个例子</h2>
        <Scroll style={{height:300,border:'1px solid red'}}>
          <p>1</p>
          <p>2</p>
          <p>3</p>
          <p>4</p>
          <p>5</p>
          <p>6</p>
          <p>1</p>
          <p>2</p>
          <p>3</p>
          <p>4</p>
          <p>5</p>
          <p>6</p>
          <p>1</p>
          <p>2</p>
          <p>3</p>
          <p>4</p>
          <p>5</p>
          <p>6</p>
          <p>1</p>
          <p>2</p>
          <p>3</p>
          <p>4</p>
          <p>5</p>
          <p>6</p>
        </Scroll>
      </div>
    </div>

  );
};
export default ScrollExample;