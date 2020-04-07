import React from 'react';

import classes from './Ability.css';


const ability = (props) => {
    let abilityScoreOnFocus = (event) => {
        event.target.value = props.score;
      }
    let abilityScoreOnBlur = (event) => {
        event.target.value = '';
      }
    return(
        <div className={[classes.AbilityScore].join(' ')}>
            <p>{props.children}</p>
            <input onBlur={abilityScoreOnBlur} onFocus={abilityScoreOnFocus} onChange={props.changed} placeholder={props.score ? props.score : 0}/>
            <p>{props.modifier}</p>
        </div>
    );
}


export default ability;