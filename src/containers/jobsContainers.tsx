import React from 'react';
import { useSelector } from 'react-redux';
import { actions } from 'modules/jobListReducer';

const CounterContainer = () => {
  // TODO: any 타입 개선.
  const counter: any = useSelector((state: any) => {
    return state.jobs;
  });

  console.log(counter);

  // const [onIncrease, onDecrease] = useActions([increment, decrement], []);

  return (<div>

    </div>
);
};

export default CounterContainer;
